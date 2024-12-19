// Componente EntradaPage.jsx
import "./EntradaPage.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { useState, useEffect, useRef } from "react";

import databaseService from "../../services/databaseService";
import ModelsUtils from "../../utils/ModelsUtils";
import ColumnData from "../../models/System/columnData";
import TableData from "../../components/General/TableData";
import Entrada from "../../models/Entrada";
import { Dialog } from "primereact/dialog";

import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";

import { Toast } from "primereact/toast";
import ValidationUtils from "../../utils/ValidationUtils";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import FormatUtils from "../../utils/FormatUtils";
import {
  messageGeneral,
  messageTableData,
} from "../../models/const/messageSystem";
import { Button } from "primereact/button";
import apiClient from "../../services/apiClient";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EntradaDetalle from "../../models/EntradaDetalle";

const EntradaPage = ({ blockedScreen, setBblockedScreen }) => {
  const toast = useRef(null);
  const items = [{ label: "Almacen" }, { label: "Entradas de Inventario" }];
  const home = { icon: "pi pi-home", url: "/main" };
  let idDelete = 0;

  const [entradas, setEntradas] = useState([]);
  const [detalleEntradas, setDetalleEntradas] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedEntrada, setSelectedEntrada] = useState(new Entrada());
  const [selectedCodigoBarras, setSelectedCodigoBarras] = useState("");
  const [newDialogVisible, setNewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  const table = "Entrada";
  const tableDetail = "EntradaDetalle";

  const columnsEntradas = [
    new ColumnData("Fecha", "Fecha"),
    new ColumnData("Empleado", "Empleado"),
    new ColumnData("Comentario", "Comentario"),
    new ColumnData("Total", "Total"),
  ];

  // Función para renderizar el editor de campos numéricos
    const numberEditor = (options) => {
        console.log("numberEditor:", options);
        return (
            <InputText
                type="number"
                value={options.value}
                onChange={(e) => options.editorCallback(parseFloat(e.target.value))}
            />
        );
    };

    const numberEditorDecimal = (options) => {
        console.log("numberEditor:", options);
        return (
            <InputText
                type="number"
                value={options.value || ""}
                onChange={(e) => {
                    const value = e.target.value ? parseFloat(e.target.value) : null;
                    options.editorCallback(value);
                }}
            />
        );
    };

  const agregarProducto = () => {
    if (selectedCodigoBarras.trim().length == 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El código de barras no puede estar vacío.",
      });
      return;
    }

    if (
      productos.filter((f) => f.CodigoBarras == selectedCodigoBarras).length ==
      0
    ) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El código de barras no existe en el sistema.",
      });
      setSelectedCodigoBarras("");
      return;
    }

    let index = detalleEntradas.findIndex(
      (f) => f.CodigoBarras == selectedCodigoBarras
    );

    const updatedData = [...detalleEntradas];
    if (index == -1) {
      let prods = productos.filter(
        (f) => f.CodigoBarras == selectedCodigoBarras
      );
      updatedData.push({
        IdEntrada: selectedEntrada.IdEntrada,
        IdEntradaDetalle: 0,
        IdProducto: prods[0].IdProducto,
        Cantidad: 1,
        CodigoBarras: prods[0].CodigoBarras,
        Costo: prods[0].Precio,
        Producto: prods[0].Descripcion,
        TotalDet: prods[0].Precio,
      });
    } else {
      updatedData[index].Cantidad = updatedData[index].Cantidad + 1;
      updatedData[index].TotalDet =
        updatedData[index].Cantidad * updatedData[index].Costo;
      calculaTotal(updatedData);
    }
    setDetalleEntradas(updatedData);
  };

    const deleteRegis = (rowData) => {
        let detalle = detalleEntradas.filter(
            (f) => f.CodigoBarras != rowData.CodigoBarras
        );
        setDetalleEntradas(detalle);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    severity="info"
                    icon={messageGeneral.iconDeleted}
                    className="p-button-rounded p-button-text"
                    tooltip={messageTableData.msgToolDeleted}
                    tooltipOptions={{ position: "bottom" }}
                    onClick={() => deleteRegis(rowData)}
                />
            </>
        );
    };

  const handleInputChange = (value, name) => {
    setSelectedEntrada({
      ...selectedEntrada,
      [name]: value,
    });
  };

  const handleCodigoBarras = (value) => {
    setSelectedCodigoBarras(value);
  };

  const handleSave = () => {
    let isValid = true;
    if (!selectedEntrada.FechaR) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "La fecha no puede estar vacía.",
      });
      isValid = false;
    }


    if (selectedEntrada.IdEmpleado <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Debes seleccionar un empleado.",
      });
      isValid = false;
    }

    if (selectedEntrada.Comentario.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El comentario no puede estar vacío.",
      });
      isValid = false;
    }
      if (parseFloat(selectedEntrada.Total) <= 0) {
          toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "El total debe ser mayor que cero.",
          });
          isValid = false;
      }
    if (isValid) {
      let entrada = new Entrada();
      ModelsUtils.fromObject(selectedEntrada, entrada);
      entrada.Fecha = selectedEntrada.FechaR.toLocaleDateString(
        "en-GB"
      ).replaceAll("/", "-");
      onSave(entrada);
    }
  };

  const onSave = (entrada) => {
    setBblockedScreen(true);
    let datas = new ModelsUtils().ModelToGeneric([entrada]);

    if (entrada.IdEntrada === 0) {
      databaseService.insert(table, datas).then((result) => {
        hideDialog();
        if (result.status == 1) {
          let detalle = detalleEntradas.map((m) => {
            let det = new EntradaDetalle();
            det = ModelsUtils.fromObject(m, det);
            det.IdEntrada = result.lastPk;
            return det;
          });

          let datasDetail = new ModelsUtils().ModelToGeneric(detalle);
          databaseService.insert(tableDetail, datasDetail).then((result2) => {
            if (result2.status == 1) {
              toast.current.show({
                severity: "success",
                summary: "Nuevo Registro",
                detail: "La entrada se creó correctamente.",
              });
            }
            setBblockedScreen(false);
            refreshData();
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Nuevo Registro",
            detail: result.message,
          });
        }
      });
    } else {
      databaseService.update(table, datas).then((result) => {
        if (result.status == 1) {
          databaseService
            .deleteDetalleId(tableDetail, selectedEntrada.IdEntrada)
            .then((result2) => {
              if (result2.status == 1) {
                let detalle = detalleEntradas.map((m) => {
                  let det = new EntradaDetalle();
                  det = ModelsUtils.fromObject(m, det);
                  return det;
                });

                let datasDetail = new ModelsUtils().ModelToGeneric(detalle);
                databaseService
                  .insert(tableDetail, datasDetail)
                  .then((result2) => {
                    if (result2.status == 1) {
                      hideDialog();
                      toast.current.show({
                        severity: "success",
                        summary: "Modificación Registro",
                        detail: "La entrada se modificó correctamente.",
                      });
                    }
                    setBblockedScreen(false);
                    refreshData();
                  });
              }
            });
        }
      });
    }
  };

  const handleCancel = () => {
    hideDialog();
  };

  const openNewDialog = (entrada = new Entrada()) => {
    setSelectedEntrada(entrada);
    setDetalleEntradas([]);
    setSelectedCodigoBarras("");
    setNewDialogVisible(true);
  };

  const openEditDialog = (entrada) => {
    const newEntrada = { ...entrada };
    setSelectedEntrada(newEntrada);
    setBblockedScreen(true);

      databaseService
          .getByDetalleId(tableDetail, entrada.IdEntrada)
          .then((result) => {
              if (result.status === 1) {
                  let detalleC = new ModelsUtils()
                      .GenericToModel(result.datas, tableDetail)
                      .map((m) => {
                          let prods = productos.filter((f) => f.IdProducto == m.IdProducto);
                          if (prods.length > 0) {
                              m["Producto"] = prods[0].Descripcion;
                              m["CodigoBarras"] = prods[0].CodigoBarras;
                          } else {
                              m["Producto"] = "";
                              m["CodigoBarras"] = "";
                          }
                          return m;
                      });
                  console.log("detalleC", detalleC);
                  setDetalleEntradas(detalleC);
              } else {
                  toast.current.show({
                      severity: "error",
                      summary: "Carga de Detalle",
                      detail: result.message,
                  });
              }
              setBblockedScreen(false);
          });
    setSelectedCodigoBarras("");
    setNewDialogVisible(true);
  };

  const openDeleteDialog = (entrada) => {
    idDelete = entrada.IdEntrada;
    confirmDialog({
      message: `¿Está seguro de eliminar la entrada con fecha ${entrada.Fecha}?`,
      header: "Eliminar",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept,
      reject,
    });
  };

  const accept = () => {
    databaseService.delete(table, idDelete).then((result) => {
      if (result.status === 1) {
        toast.current.show({
          severity: "success",
          summary: "Eliminación",
          detail: "Se ha eliminado correctamente.",
        });
        refreshData();
      } else {
        toast.current.show({
          severity: "error",
          summary: "Eliminación",
          detail: result.message,
        });
      }
    });
  };

  const reject = () => {};

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setBblockedScreen(true);
      let localEmpleados = await new ModelsUtils().GenericToDropDown(
          "Empleado",
          "IdEmpleado",
          "Nombre",
          setEmpleados
      );

    databaseService.getAll(table).then((result) => {
      if (result.status === 1) {
        const localEntradas = new ModelsUtils()
          .GenericToModel(result.datas, table)
          .map((m) => {
             let empleadosLocal = localEmpleados.filter(
              (f) => f.id == m.IdEmpleado
            );
            if (empleadosLocal.length > 0) {
              m["Empleado"] = empleadosLocal[0].descripcion;
            } else {
              m["Empleado"] = "No existe";
            }

            return m;
          });

        setEntradas(localEntradas);
        setBblockedScreen(false);
      } else {
        console.log("Fallo La carga:", result.message);
      }
    });
      let tableProducto = "Producto";
      databaseService.getAll(tableProducto).then((result) => {
          if (result.status === 1) {
              let prods = new ModelsUtils().GenericToModel(
                  result.datas,
                  tableProducto
              );
              setProductos(prods);
          }
      });
  };

  const hideDialog = () => {
    setEditDialogVisible(false);
    setNewDialogVisible(false);
  };
    const onCellEditComplete = (e) => {
        const { rowIndex, field, newValue } = e;

        console.log("onCellEditComplete", e);
        if (
            (field === "Cantidad" || field === "Costo") &&
            (isNaN(newValue) || newValue < 0)
        ) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Por favor ingresa un número válido.",
            });
            return;
        }

        const updatedData = [...detalleEntradas];
        updatedData[rowIndex][field] = parseFloat(newValue) || 0;

        if (field === "Cantidad" || field === "Costo") {
            updatedData[rowIndex].TotalDet =
                updatedData[rowIndex].Cantidad * updatedData[rowIndex].Costo;
        }
        setDetalleEntradas(updatedData);
        calculaTotal(updatedData);
    };
      const calculaTotal = (updatedData) => {
          let total = 0;
          detalleEntradas.forEach((f) => {
              total = total + f.TotalDet;
          });
          selectedEntrada.Total = total;
          setSelectedEntrada(selectedEntrada);
      };

    const onRowEditComplete = (e) => {
        console.log("onRowEditComplete:", e);
        const { newData, index } = e;

        if (!newData.Cantidad || newData.Cantidad < 0 || isNaN(newData.Cantidad)) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "La cantidad debe ser un número válido.",
            });
            return;
        }

        if (!newData.Costo || newData.Costo < 0 || isNaN(newData.Costo)) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "El costo debe ser un número válido.",
            });
            return;
        }

        const updatedData = [...detalleEntradas];
        updatedData[index] = {
            ...newData,
            TotalDet: newData.Cantidad * newData.Costo,
        };

        setDetalleEntradas(updatedData);
    };
  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />

      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Entradas de Inventario</h1>
      </div>

      <TableData
        arrayObjects={entradas}
        columns={columnsEntradas}
        openNewDialog={openNewDialog}
        openEditDialog={openEditDialog}
        openDeleteDialog={openDeleteDialog}
        isMobile={true}
        msgNew={"Nueva Entrada"}
      />

      <Dialog
        header={
          selectedEntrada.IdEntrada === 0 ? "Nueva Entrada" : "Modificar Entrada"
        }
        visible={newDialogVisible}
        style={{ width: "100%", maxWidth: "1100px" }}
        onHide={hideDialog}
        footer={
          <div className="flex justify-content-end">
            <button
              className="p-button p-button-secondary p-mr-2"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button className="p-button p-button-primary" onClick={handleSave}>
              Guardar
            </button>
          </div>
        }
      >
          <div className="grid">
              <div className="col-4">
                  <div>
                      <label htmlFor="fecha">Fecha</label>
                  </div>

                  <Calendar
                      id="fecha"
                      value={selectedEntrada.FechaR}
                      onChange={(e) => handleInputChange(e.value, "FechaR")}
                      dateFormat="dd-mm-yy"
                  />
              </div>
              <div className="col-4">
                  <div>
                      <label htmlFor="idEmpleado">Empleado</label>
                  </div>
                  <Dropdown
                      id="idEmpleado"
                      value={selectedEntrada.IdEmpleado}
                      options={empleados}
                      optionLabel="descripcion"
                      optionValue="id"
                      onChange={(e) => handleInputChange(e.target.value, "IdEmpleado")}
                      placeholder="Selecciona un empleado"
                  />
              </div>
              <div className="col-12">
                  <DataTable
                      //    onCellEditComplete={onCellEditComplete}
                      //   onRowEditComplete={onRowEditComplete}
                      value={detalleEntradas}
                      editMode="cell"
                      scrollable
                      scrollHeight="250px"
                  >
                      <Column field="CodigoBarras" header="Codigo de Barras"></Column>
                      <Column field="Producto" header="Descripción Producto"></Column>
                      <Column
                          field="Cantidad"
                          header="Cantidad"
                          editor={(options) => numberEditor(options)}
                          onCellEditComplete={onCellEditComplete}
                      ></Column>
                      <Column
                          field="Costo"
                          header="Costo"
                          editor={(options) => numberEditorDecimal(options)}
                          onCellEditComplete={onCellEditComplete}
                      ></Column>
                      <Column field="TotalDet" header="Total"></Column>
                      <Column header="Acción" body={actionBodyTemplate}></Column>
                  </DataTable>
              </div>
              <div className="col-6">
                  <InputText
                      id="codigoBarras"
                      value={selectedCodigoBarras}
                      onChange={(e) => handleCodigoBarras(e.target.value)}
                      onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
                  ></InputText>
              </div>
              <div className="col-6">
                  <Button
                      label="Agregar"
                      icon="pi pi-plus"
                      className="p-button-success p-button-rounded"
                      onClick={agregarProducto}
                  />
              </div>
            <div className="col-8">
                <div>
              <label htmlFor="comentario">Comentario</label>
                </div>
              <InputTextarea
                id="comentario"
                value={selectedEntrada.Comentario}
                onChange={(e) => handleInputChange(e.target.value, "Comentario")}
                onKeyDown={(e) => ValidationUtils.validateNumberLetter(e,true)}
              />
          </div>
            <div className="col-4">
                <div>
                    <label htmlFor="total">Total</label>
                </div>
                <InputText
                    id="total"
                    value={FormatUtils.formatCurrency(selectedEntrada.Total)}
                    readOnly={true}
                    onChange={(e) => handleInputChange(e.target.value, "Total")}
                    onKeyDown={(e) =>
                        ValidationUtils.validateNumberWithDecimals(e, 2)
                    }
                />
            </div>
          </div>
      </Dialog>
    </>
  );
};

export default EntradaPage;