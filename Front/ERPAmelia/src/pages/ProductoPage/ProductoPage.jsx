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

import { tiposBebidas } from "../../models/const/dataSystem";
import { Toast } from "primereact/toast";
import ValidationUtils from "../../utils/ValidationUtils";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";



const ProductoPage = ({ blockedScreen, setBblockedScreen }) => {
  const toast = useRef(null);
  const items = [{ label: "Ventas" }, { label: "Productos" }];
  const home = { icon: "pi pi-home", url: "/main" };
  let idDelete=0;
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(new Producto());
  const [newDialogVisible, setNewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedTipoProducto, setTipoProducto] = useState(null);

  const table = "Producto";

  const columnsProductos = [
    new ColumnData("CodigoBarras", "Código de Barras"),
    new ColumnData("Descripcion", "Descripción"),
    new ColumnData("Precio", "Precio"),
    new ColumnData("InventarioInicial", "Inventario Inicial"),
    new ColumnData("TipoProducto", "Tipo de Producto"),
  ];

  const handleInputChange = (value, name) => {
    if (name == "IdTipoProducto") {
      setSelectedProducto({
        ...selectedProducto,
        [name]: value,
      });
    } else {
      setSelectedProducto({
        ...selectedProducto,
        [name]: value,
      });
    }
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
    if (parseInt(selectedProducto.InventarioInicial) <= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El inventario inicial debe ser mayor que cero.",
      });
      isValid = false;
    }
    if (!idTipoProducto) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Debes seleccionar un tipo de producto.",
      });
      isValid = false;
    }

    if (isValid) {
      let producto=new Producto();
      ModelsUtils.fromObject(selectedProducto,producto);
      onSave(producto);
    }
  };

  const onSave = (producto) => {
    setBblockedScreen(true);
    let datas = new ModelsUtils().ModelToGeneric([producto]);

    if (producto.IdProducto == 0) {
      console.log("Insert:", producto);
      databaseService.insert(table, datas).then((result) => {
        console.log("Resultado:", result);
        hideDialog();
        toast.current.show({
          severity: "success",
          summary: "Nuevo Registros",
          detail: "El producto se creo correctamente.",
        });
        setBblockedScreen(false);
        refreshData();
      });
    } else {
      console.log("Update:", producto);
      databaseService.update(table,datas).then(result=>{
        console.log("Resultado:", result);
        hideDialog();
        toast.current.show({
          severity: "success",
          summary: "Modificación Registro",
          detail: "El producto se modifico correctamente.",
        });
        setBblockedScreen(false);
        refreshData();
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
    console.log("Producto:", producto);
    const newProducto = { ...producto }; // <-- Cambio aquí
    setSelectedProducto(newProducto);
    console.log("Selected:", selectedProducto);
    setNewDialogVisible(true);
  };

  //Método que se usa para dar de baja algun usuario
  const openDeleteDialog = (producto) => {
    debugger;
    idDelete = producto.IdProducto;
    confirmDialog({
      message: "¿ Esta seguro de eliminar el producto "+producto.Descripcion+" ?",
      header: "Eliminar",
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: "accept",
      acceptLabel: "SI",
      rejectLabel: "NO",
      accept,
      reject,
    });
  };

  //Si en la pregunta de eliminación  se acepta.
  const accept = () => {
    databaseService.delete(table,idDelete).then(result=>{
      if(result.status==1){
        toast.current.show({
          severity: 'success',
          summary: 'Eliminación',
          detail: 'Se ha elimiando correctamente',
        });
        refreshData();
      }else{
        toast.current.show({
          severity: 'error',
          summary: 'Eliminación',
          detail: result.message,
        });
      }
    });
  }

  //Si el eliminar se rechaza
  const reject = () => { };

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setBblockedScreen(true);
    databaseService.getAll(table).then((result) => {
      if (result.status == 1) {
        let localProductos = [];
        localProductos = new ModelsUtils().GenericToModel(result.datas);
        setProductos(localProductos);
        console.log("New Array:", localProductos);
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
        <h1>Catálogo de Productos</h1>
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
          selectedProducto.IdProducto == 0
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
            <label htmlFor="inventarioInicial">Inventario Inicial</label>
            <InputText
              id="inventarioInicial"
              type="number"
              value={selectedProducto.InventarioInicial}
              onChange={(e) =>
                handleInputChange(e.target.value, "InventarioInicial")
              }
              onKeyDown={(e) => ValidationUtils.validateNumber(e)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="idTipoProducto">Tipo de Producto</label>
            <Dropdown
              id="idTipoProducto"
              value={selectedProducto.IdTipoProducto}
              options={tiposBebidas}
              optionLabel="descripcion"
              optionValue="id"
              onChange={(e) =>
                handleInputChange(e.target.value, "IdTipoProducto")
              }
              placeholder="Selecciona un tipo de producto"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductoPage;
