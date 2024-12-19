// Componente VentaPage.jsx
import "./VentaPage.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { useState, useEffect, useRef } from "react";

import databaseService from "../../services/databaseService";
import ModelsUtils from "../../utils/ModelsUtils";
import ColumnData from "../../models/System/columnData";
import TableData from "../../components/General/TableData";
import Venta from "../../models/Venta";
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
import VentaDetalle from "../../models/VentaDetalle";

const VentaPage = ({ blockedScreen, setBblockedScreen }) => {
  const toast = useRef(null);
  const items = [{ label: "Ventas" }, { label: "Ventas de Producto" }];
  const home = { icon: "pi pi-home", url: "/main" };
  let idDelete = 0;

  const [ventas, setVentas] = useState([]);
  const [detalleVentas, setDetalleVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedVenta, setSelectedVenta] = useState(new Venta());
  const [selectedCodigoBarras, setSelectedCodigoBarras] = useState("");
  const [newDialogVisible, setNewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  const table = "Venta";
  const tableDetail = "VentaDetalle";

  const columnsVentas = [
    new ColumnData("Fecha", "Fecha"),
    new ColumnData("Cliente", "Cliente"),
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

    let index = detalleVentas.findIndex(
      (f) => f.CodigoBarras == selectedCodigoBarras
    );

    const updatedData = [...detalleVentas];
    if (index == -1) {
      let prods = productos.filter(
        (f) => f.CodigoBarras == selectedCodigoBarras
      );
      updatedData.push({
        IdVenta: selectedVenta.IdVenta,
        IdVentaDetalle: 0,
        IdProducto: prods[0].IdProducto,
        Cantidad: 1,
        CodigoBarras: prods[0].CodigoBarras,
        Precio: prods[0].Precio,
        Producto: prods[0].Descripcion,
        TotalDet: prods[0].Precio,
      });
    } else {
      updatedData[index].Cantidad = updatedData[index].Cantidad + 1;
      updatedData[index].TotalDet =
        updatedData[index].Cantidad * updatedData[index].Precio;
      calculaTotal(updatedData);
    }
    setDetalleVentas(updatedData);
  };

  const deleteRegis = (rowData) => {
    let detalle = detalleVentas.filter(
      (f) => f.CodigoBarras != rowData.CodigoBarras
    );
    setDetalleVentas(detalle);
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
    setSelectedVenta({
      ...selectedVenta,
      [name]: value,
    });
  };

  const handleCodigoBarras = (value) => {
    setSelectedCodigoBarras(value);
  };

  const handleSave = () => {
    let isValid = true;
    if (!selectedVenta.FechaR) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "La fecha no puede estar vacía.",
      });
      isValid = false;
    }

    if (selectedVenta.IdCliente <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Debes seleccionar un cliente.",
      });
      isValid = false;
    }
    if (selectedVenta.IdEmpleado <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Debes seleccionar un empleado.",
      });
      isValid = false;
    }

    if (selectedVenta.Comentario.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El comentario no puede estar vacío.",
      });
      isValid = false;
    }
    if (parseFloat(selectedVenta.Total) <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El total debe ser mayor que cero.",
      });
      isValid = false;
    }

    if (isValid) {
      let venta = new Venta();
      ModelsUtils.fromObject(selectedVenta, venta);
      venta.Fecha = selectedVenta.FechaR.toLocaleDateString(
        "en-GB"
      ).replaceAll("/", "-");
      onSave(venta);
    }
  };

  const onSave = (venta) => {
    setBblockedScreen(true);
    let datas = new ModelsUtils().ModelToGeneric([venta]);

    if (venta.IdVenta === 0) {
      databaseService.insert(table, datas).then((result) => {
        hideDialog();
        if (result.status == 1) {
          let detalle = detalleVentas.map((m) => {
            let det = new VentaDetalle();
            det = ModelsUtils.fromObject(m, det);
            det.IdVenta = result.lastPk;
            return det;
          });

          let datasDetail = new ModelsUtils().ModelToGeneric(detalle);
          databaseService.insert(tableDetail, datasDetail).then((result2) => {
            if (result2.status == 1) {
              toast.current.show({
                severity: "success",
                summary: "Nuevo Registro",
                detail: "La venta se creó correctamente.",
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
            .deleteDetalleId(tableDetail, selectedVenta.IdVenta)
            .then((result2) => {
              if (result2.status == 1) {
                let detalle = detalleVentas.map((m) => {
                  let det = new VentaDetalle();
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
                        detail: "La venta se modificó correctamente.",
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

  const openNewDialog = (venta = new Venta()) => {
    setSelectedVenta(venta);
    setDetalleVentas([]);
    setSelectedCodigoBarras("");
    setNewDialogVisible(true);
  };

  const openEditDialog = (venta) => {
    const newVenta = { ...venta };
    setSelectedVenta(newVenta);
    setBblockedScreen(true);

    databaseService
      .getByDetalleId(tableDetail, venta.IdVenta)
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
          setDetalleVentas(detalleC);
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

  const openDeleteDialog = (venta) => {
    idDelete = venta.IdVenta;
    confirmDialog({
      message: `¿Está seguro de eliminar la venta con fecha ${venta.Fecha}?`,
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
    let localClientes = await new ModelsUtils().GenericToDropDown(
      "Cliente",
      "IdCliente",
      "Nombre",
      setClientes
    );
    let localEmpleados = await new ModelsUtils().GenericToDropDown(
      "Empleado",
      "IdEmpleado",
      "Nombre",
      setEmpleados
    );

    databaseService.getAll(table).then((result) => {
      if (result.status === 1) {
        const localVentas = new ModelsUtils()
          .GenericToModel(result.datas, table)
          .map((m) => {
            let clientesLocal = localClientes.filter(
              (f) => f.id == m.IdCliente
            );
            if (clientesLocal.length > 0) {
              m["Cliente"] = clientesLocal[0].descripcion;
            } else {
              m["Cliente"] = "No existe";
            }

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

        setVentas(localVentas);
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
      (field === "Cantidad" || field === "Precio") &&
      (isNaN(newValue) || newValue < 0)
    ) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Por favor ingresa un número válido.",
      });
      return;
    }

    const updatedData = [...detalleVentas];
    updatedData[rowIndex][field] = parseFloat(newValue) || 0;

    if (field === "Cantidad" || field === "Precio") {
      updatedData[rowIndex].TotalDet =
        updatedData[rowIndex].Cantidad * updatedData[rowIndex].Precio;
    }
    setDetalleVentas(updatedData);
    calculaTotal(updatedData);
  };

  const calculaTotal = (updatedData) => {
    let total = 0;
    detalleVentas.forEach((f) => {
      total = total + f.TotalDet;
    });
    selectedVenta.Total = total;
    setSelectedVenta(selectedVenta);
  };


  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />

      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Ventas de producto</h1>
      </div>

      <TableData
        arrayObjects={ventas}
        columns={columnsVentas}
        openNewDialog={openNewDialog}
        openEditDialog={openEditDialog}
        openDeleteDialog={openDeleteDialog}
        isMobile={true}
        msgNew={"Nueva Venta"}
      />

      <Dialog
        header={
          selectedVenta.IdVenta === 0 ? "Nueva Venta" : "Modificar Venta"
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
              value={selectedVenta.FechaR}
              onChange={(e) => handleInputChange(e.value, "FechaR")}
              dateFormat="dd-mm-yy"
            />
          </div>
          <div className="col-4">
            <div>
              <label htmlFor="idCliente">Cliente</label>
            </div>
            <Dropdown
              id="idCliente"
              value={selectedVenta.IdCliente}
              options={clientes}
              optionLabel="descripcion"
              optionValue="id"
              onChange={(e) => handleInputChange(e.target.value, "IdCliente")}
              placeholder="Selecciona un cliente"
            />
          </div>
          <div className="col-4">
            <div>
              <label htmlFor="idEmpleado">Empleado</label>
            </div>
            <Dropdown
              id="idEmpleado"
              value={selectedVenta.IdEmpleado}
              options={empleados}
              optionLabel="descripcion"
              optionValue="id"
              onChange={(e) => handleInputChange(e.target.value, "IdEmpleado")}
              placeholder="Selecciona un empleado"
            />
          </div>
          <div className="col-12">
            <DataTable
              value={detalleVentas}
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
                    field="Precio"
                    header="Precio"
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
              value={selectedVenta.Comentario}
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
              value={FormatUtils.formatCurrency(selectedVenta.Total)}
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

export default VentaPage;