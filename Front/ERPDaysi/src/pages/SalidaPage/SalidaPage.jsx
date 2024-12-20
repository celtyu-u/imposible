// Componente SalidaPage.jsx
import "./SalidaPage.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { useState, useEffect, useRef } from "react";

import databaseService from "../../services/databaseService";
import ModelsUtils from "../../utils/ModelsUtils";
import ColumnData from "../../models/System/columnData";
import TableData from "../../components/General/TableData";
import Salida from "../../models/Salida";
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
import SalidaDetalle from "../../models/SalidaDetalle";

const SalidaPage = ({ blockedScreen, setBblockedScreen }) => {
  const toast = useRef(null);
  const items = [{ label: "Almacen" }, { label: "Salidas de Invetario" }];
  const home = { icon: "pi pi-home", url: "/main" };
  let idDelete = 0;

  const [salidas, setSalidas] = useState([]);
  const [detalleSalidas, setDetalleSalidas] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedSalida, setSelectedSalida] = useState(new Salida());
  const [selectedCodigoBarras, setSelectedCodigoBarras] = useState("");
  const [newDialogVisible, setNewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  const table = "Salida";
  const tableDetail = "SalidaDetalle";

  const columnsSalidas = [
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

    let index = detalleSalidas.findIndex(
      (f) => f.CodigoBarras == selectedCodigoBarras
    );

    const updatedData = [...detalleSalidas];
    if (index == -1) {
      let prods = productos.filter(
        (f) => f.CodigoBarras == selectedCodigoBarras
      );
      updatedData.push({
        IdSalida: selectedSalida.IdSalida,
        IdSalidaDetalle: 0,
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
    setDetalleSalidas(updatedData);
  };

  const deleteRegis = (rowData) => {
    let detalle = detalleSalidas.filter(
      (f) => f.CodigoBarras != rowData.CodigoBarras
    );
    setDetalleSalidas(detalle);
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
    setSelectedSalida({
      ...selectedSalida,
      [name]: value,
    });
  };

  const handleCodigoBarras = (value) => {
    setSelectedCodigoBarras(value);
  };

  const handleSave = () => {
    let isValid = true;
    if (!selectedSalida.FechaR) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "La fecha no puede estar vacía.",
      });
      isValid = false;
    }

    if (selectedSalida.IdEmpleado <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Debes seleccionar un empleado.",
      });
      isValid = false;
    }

    if (selectedSalida.Comentario.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El comentario no puede estar vacío.",
      });
      isValid = false;
    }
    if (parseFloat(selectedSalida.Total) <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El total debe ser mayor que cero.",
      });
      isValid = false;
    }

    if (isValid) {
      let salida = new Salida();
      ModelsUtils.fromObject(selectedSalida, salida);
      salida.Fecha = selectedSalida.FechaR.toLocaleDateString(
        "en-GB"
      ).replaceAll("/", "-");
      onSave(salida);
    }
  };

  const onSave = (salida) => {
    setBblockedScreen(true);
    let datas = new ModelsUtils().ModelToGeneric([salida]);

    if (salida.IdSalida === 0) {
      databaseService.insert(table, datas).then((result) => {
        hideDialog();
        if (result.status == 1) {
          let detalle = detalleSalidas.map((m) => {
            let det = new SalidaDetalle();
            det = ModelsUtils.fromObject(m, det);
            det.IdSalida = result.lastPk;
            return det;
          });

          let datasDetail = new ModelsUtils().ModelToGeneric(detalle);
          databaseService.insert(tableDetail, datasDetail).then((result2) => {
            if (result2.status == 1) {
              toast.current.show({
                severity: "success",
                summary: "Nuevo Registro",
                detail: "La salida se creó correctamente.",
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
            .deleteDetalleId(tableDetail, selectedSalida.IdSalida)
            .then((result2) => {
              if (result2.status == 1) {
                let detalle = detalleSalidas.map((m) => {
                  let det = new SalidaDetalle();
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
                        detail: "La salida se modificó correctamente.",
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

  const openNewDialog = (salida = new Salida()) => {
    setSelectedSalida(salida);
    setDetalleSalidas([]);
    setSelectedCodigoBarras("");
    setNewDialogVisible(true);
  };

  const openEditDialog = (salida) => {
    const newSalida = { ...salida };
    setSelectedSalida(newSalida);
    setBblockedScreen(true);

    databaseService
      .getByDetalleId(tableDetail, salida.IdSalida)
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
          setDetalleSalidas(detalleC);
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

  const openDeleteDialog = (salida) => {
    idDelete = salida.IdSalida;
    confirmDialog({
      message: `¿Está seguro de eliminar la salida con fecha ${salida.Fecha}?`,
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
        const localSalidas = new ModelsUtils()
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

        setSalidas(localSalidas);
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

    const updatedData = [...detalleSalidas];
    updatedData[rowIndex][field] = parseFloat(newValue) || 0;

    if (field === "Cantidad" || field === "Costo") {
      updatedData[rowIndex].TotalDet =
        updatedData[rowIndex].Cantidad * updatedData[rowIndex].Costo;
    }
    setDetalleSalidas(updatedData);
    calculaTotal(updatedData);
  };

  const calculaTotal = (updatedData) => {
    let total = 0;
    detalleSalidas.forEach((f) => {
      total = total + f.TotalDet;
    });
    selectedSalida.Total = total;
    setSelectedSalida(selectedSalida);
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />

      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Salidas de Producto</h1>
      </div>

      <TableData
        arrayObjects={salidas}
        columns={columnsSalidas}
        openNewDialog={openNewDialog}
        openEditDialog={openEditDialog}
        openDeleteDialog={openDeleteDialog}
        isMobile={true}
        msgNew={"Nueva Salida"}
      />

      <Dialog
        header={
          selectedSalida.IdSalida === 0 ? "Nueva Salida" : "Modificar Salida"
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
              value={selectedSalida.FechaR}
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
              value={selectedSalida.IdEmpleado}
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
              value={detalleSalidas}
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
              value={selectedSalida.Comentario}
              onChange={(e) => handleInputChange(e.target.value, "Comentario")}
              onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
           <div className="col-4">
            <div>
              <label htmlFor="total">Total</label>
            </div>
            <InputText
              id="total"
              value={FormatUtils.formatCurrency(selectedSalida.Total)}
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

export default SalidaPage;