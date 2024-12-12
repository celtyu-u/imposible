// ProductoPage.jsx
import "./ProductoPage.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { useState, useEffect, useRef } from "react";

import databaseService from "../../services/databaseService";
import ModelsUtils from "../../utils/ModelsUtils";
import ColumnData from "../../models/System/columnData";
import TableData from "../../components/General/TableData";
import Producto from "../../models/Producto";
import { Dialog } from "primereact/dialog";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import { familias } from "../../models/const/dataSystem"; // Importa las familias
import { Toast } from "primereact/toast";
import ValidationUtils from "../../utils/ValidationUtils";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

/**
 * Componente principal para la gestión de productos.
 * Permite crear, editar, eliminar y visualizar productos dentro de una tabla interactiva.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.blockedScreen - Indica si la pantalla está bloqueada.
 * @param {Function} props.setBblockedScreen - Función para cambiar el estado de bloqueo de la pantalla.
 * @returns {JSX.Element} - Componente de gestión de productos.
 */
const ProductoPage = ({ blockedScreen, setBblockedScreen }) => {
  const toast = useRef(null);
  const items = [{ label: "Ventas" }, { label: "Productos" }];
  const home = { icon: "pi pi-home", url: "/main" };
  let idDelete = 0;

  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(new Producto());
  const [newDialogVisible, setNewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedFamilia, setSelectedFamilia] = useState(null); // Estado para el dropdown de familias

  const table = "Producto";

  const columnsProductos = [
    new ColumnData("CodigoBarras", "Código de Barras"),
    new ColumnData("Descripcion", "Descripción"),
    new ColumnData("Precio", "Precio"),
    new ColumnData("Costo", "Costo"),
    new ColumnData("InventarioBase", "Inventario Base"),
    new ColumnData("Familia", "Familia"), // Nueva columna para la familia
  ];

  const handleInputChange = (value, name) => {
    setSelectedProducto({
      ...selectedProducto,
      [name]: value,
    });
  };

  const handleSave = () => {
    let isValid = true;

    if (selectedProducto.CodigoBarras.length !== 13) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El código de barras debe tener 13 caracteres.",
        life: 3000,
      });
      isValid = false;
    }
    if (selectedProducto.Descripcion.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "La descripción no puede estar vacía.",
        life: 3000,
      });
      isValid = false;
    }
    if (parseFloat(selectedProducto.Precio) <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El precio debe ser mayor que cero.",
        life: 3000,
      });
      isValid = false;
    }

        if (parseFloat(selectedProducto.Costo) <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El costo debe ser mayor que cero.",
        life: 3000,
      });
      isValid = false;
    }
    if (parseInt(selectedProducto.InventarioBase) <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El inventario inicial debe ser mayor que cero.",
      });
      isValid = false;
    }
       if (selectedProducto.IdTipoFamilia <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Debes seleccionar una familia.",
      });
      isValid = false;
    }

    if (isValid) {
      let producto = new Producto();
      ModelsUtils.fromObject(selectedProducto, producto);
      onSave(producto);
    }
  };

  const onSave = (producto) => {
    setBblockedScreen(true);
    let datas = new ModelsUtils().ModelToGeneric([producto]);

    if (producto.IdProducto === 0) {
      databaseService.insert(table, datas).then((result) => {
        hideDialog();
        toast.current.show({
          severity: "success",
          summary: "Nuevo Registro",
          detail: "El producto se creó correctamente.",
        });
        setBblockedScreen(false);
        refreshData();
      });
    } else {
      databaseService.update(table, datas).then((result) => {
        hideDialog();
        toast.current.show({
          severity: "success",
          summary: "Modificación Registro",
          detail: "El producto se modificó correctamente.",
        });
        refreshData();
        setBblockedScreen(false);
      });
    }
  };

  const handleCancel = () => {
    hideDialog();
  };

    const openNewDialog = (producto = new Producto()) => {
        setSelectedProducto(producto);
    setNewDialogVisible(true);
  };

  const openEditDialog = (producto) => {
    const newProducto = { ...producto };
    setSelectedProducto(newProducto);
    setNewDialogVisible(true);
  };

  const openDeleteDialog = (producto) => {
    idDelete = producto.IdProducto;
    confirmDialog({
      message: `¿Está seguro de eliminar el producto ${producto.Descripcion}?`,
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

    const refreshData = () => {
    setBblockedScreen(true);
    databaseService.getAll(table).then((result) => {
      if (result.status === 1) {
        const localProductos = new ModelsUtils().GenericToModel(
          result.datas,
          table
        );
        setProductos(localProductos);
           setBblockedScreen(false);
      } else {
        console.log("Fallo La carga:", result.message);
      }
    });
  };
  const hideDialog = () => {
    setEditDialogVisible(false);
    setNewDialogVisible(false);
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Gestión de productos</h1>
      </div>

      <TableData
        arrayObjects={productos}
        columns={columnsProductos}
        openNewDialog={openNewDialog}
        openEditDialog={openEditDialog}
        openDeleteDialog={openDeleteDialog}
        isMobile={true}
        msgNew={"Nuevo Producto"}
      />

      <Dialog
        header={
          selectedProducto.IdProducto === 0
            ? "Nuevo Producto"
            : "Modificar Producto"
        }
        visible={newDialogVisible}
        style={{ width: "100%", maxWidth: "600px" }}
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
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="codigoBarras">Código de Barras</label>
            <InputText
              id="codigoBarras"
              value={selectedProducto.CodigoBarras}
              onChange={(e) =>
                handleInputChange(e.target.value, "CodigoBarras")
              }
              onKeyDown={(e) => ValidationUtils.validateNumber(e)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="descripcion">Descripción</label>
            <InputText
              id="descripcion"
              value={selectedProducto.Descripcion}
              onChange={(e) => handleInputChange(e.target.value, "Descripcion")}
              onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="precio">Precio</label>
            <InputText
              id="precio"
              value={selectedProducto.Precio}
              onChange={(e) => handleInputChange(e.target.value, "Precio")}
              onKeyDown={(e) =>
                ValidationUtils.validateNumberWithDecimals(e, 2)
              }
            />
          </div>
            <div className="p-field p-col-12 p-md-6">
            <label htmlFor="costo">Costo</label>
            <InputText
              id="costo"
              value={selectedProducto.Costo}
              onChange={(e) => handleInputChange(e.target.value, "Costo")}
               onKeyDown={(e) =>
                ValidationUtils.validateNumberWithDecimals(e, 2)
              }
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="inventarioInicial">Inventario Base</label>
            <InputText
              id="inventarioInicial"
              type="number"
              value={selectedProducto.InventarioBase}
              onChange={(e) =>
                handleInputChange(e.target.value, "InventarioBase")
              }
              onKeyDown={(e) => ValidationUtils.validateNumber(e)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="idTipoFamilia">Familia</label>
            <Dropdown
              id="idTipoFamilia"
              value={selectedProducto.IdTipoFamilia}
              options={familias}
              optionLabel="descripcion"
              optionValue="id"
              onChange={(e) =>
                handleInputChange(e.target.value, "IdTipoFamilia")
              }
              placeholder="Selecciona una familia"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductoPage;