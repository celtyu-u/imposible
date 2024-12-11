// Componente ProveedorPage.jsx
import "./ProveedorPage.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { useState, useEffect, useRef } from "react";

import databaseService from "../../services/databaseService";
import ModelsUtils from "../../utils/ModelsUtils";
import ColumnData from "../../models/System/columnData";
import TableData from "../../components/General/TableData";
import Proveedor from "../../models/Proveedor";
import { Dialog } from "primereact/dialog";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { Toast } from "primereact/toast";
import ValidationUtils from "../../utils/ValidationUtils";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

/**
 * Componente principal para la gestión de proveedores.
 * Permite crear, editar, eliminar y visualizar proveedores dentro de una tabla interactiva.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.blockedScreen - Indica si la pantalla está bloqueada.
 * @param {Function} props.setBblockedScreen - Función para cambiar el estado de bloqueo de la pantalla.
 * @returns {JSX.Element} - Componente de gestión de proveedores.
 */
const ProveedorPage = ({ blockedScreen, setBblockedScreen }) => {
  const toast = useRef(null);
  const items = [{ label: "Compras" }, { label: "Proveedores" }];
  const home = { icon: "pi pi-home", url: "/main" };
  let idDelete = 0;

  const [proveedores, setProveedores] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState(new Proveedor());
  const [newDialogVisible, setNewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  const table = "Proveedor";

  const columnsProveedores = [
    new ColumnData("Nombre", "Nombre"),
    new ColumnData("Telefono", "Teléfono"),
    new ColumnData("Correo", "Correo"),
    new ColumnData("Direccion", "Dirección"),
    new ColumnData("RFC", "RFC"),
  ];

  /**
   * Maneja los cambios en los campos de entrada del formulario.
   * @param {any} value - Nuevo valor del campo.
   * @param {string} name - Nombre del campo modificado.
   */
  const handleInputChange = (value, name) => {
    setSelectedProveedor({
      ...selectedProveedor,
      [name]: value,
    });
  };

  /**
   * Valida y guarda un proveedor.
   */
  const handleSave = () => {
    let isValid = true;

     //Validaciones para Proveedor
    if (selectedProveedor.Nombre.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El nombre no puede estar vacío.",
        life: 3000,
      });
      isValid = false;
    }
     if (selectedProveedor.Telefono.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El teléfono no puede estar vacío.",
        life: 3000,
      });
      isValid = false;
    }
    if (selectedProveedor.Correo.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El correo no puede estar vacío.",
        life: 3000,
      });
      isValid = false;
    }
    if (selectedProveedor.Direccion.trim() === "") {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "La dirección no puede estar vacía.",
          life: 3000,
        });
        isValid = false;
      }
    if (selectedProveedor.RFC.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El RFC no puede estar vacío.",
        life: 3000,
      });
      isValid = false;
    }

    if (isValid) {
      let proveedor = new Proveedor();
      ModelsUtils.fromObject(selectedProveedor, proveedor);
      onSave(proveedor);
    }
  };

    /**
   * Guarda el proveedor en la base de datos.
   * @param {Proveedor} proveedor - Proveedor a guardar.
   */
  const onSave = (proveedor) => {
    setBblockedScreen(true);
    let datas = new ModelsUtils().ModelToGeneric([proveedor]);
    if (proveedor.IdProveedor === 0) {
      databaseService.insert(table, datas).then((result) => {
        hideDialog();
        toast.current.show({
          severity: "success",
          summary: "Nuevo Registro",
          detail: "El proveedor se creó correctamente.",
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
          detail: "El proveedor se modificó correctamente.",
        });
        refreshData();
        setBblockedScreen(false);
      });
    }
  };

    /**
   * Cancela la operación actual y cierra los diálogos.
   */
  const handleCancel = () => {
    hideDialog();
  };

  /**
   * Abre el diálogo para crear un nuevo proveedor.
   * @param {Proveedor} [proveedor=new Proveedor()] - Proveedor inicial (opcional).
   */
  const openNewDialog = (proveedor = new Proveedor()) => {
    setSelectedProveedor(proveedor);
    setNewDialogVisible(true);
  };

   /**
   * Abre el diálogo para editar un proveedor existente.
   * @param {Proveedor} proveedor - Proveedor a editar.
   */
  const openEditDialog = (proveedor) => {
    const newProveedor = { ...proveedor };
    setSelectedProveedor(newProveedor);
    setNewDialogVisible(true);
  };

  /**
   * Abre el cuadro de diálogo de confirmación para eliminar un proveedor.
   * @param {Proveedor} proveedor - Proveedor a eliminar.
   */
  const openDeleteDialog = (proveedor) => {
     idDelete = proveedor.IdProveedor;
    confirmDialog({
      message: `¿Está seguro de eliminar el proveedor ${proveedor.Nombre}?`,
      header: "Eliminar",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept,
      reject,
    });
  };
  
  /**
   * Elimina un proveedor tras la confirmación.
   */
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

  /**
   * Acción al rechazar la eliminación de un proveedor.
   */
  const reject = () => {};

    /**
   * Efecto que se ejecuta al montar el componente, cargando los datos iniciales.
   */
  useEffect(() => {
    refreshData();
  }, []);

    /**
   * Actualiza la lista de proveedores desde la base de datos.
   */
  const refreshData = () => {
    setBblockedScreen(true);
    databaseService.getAll(table).then((result) => {
      if (result.status === 1) {
        const localProveedores = new ModelsUtils().GenericToModel(result.datas,table);
        setProveedores(localProveedores);
        setBblockedScreen(false);
      } else {
        console.log("Fallo La carga:", result.message);
      }
    });
  };

   /**
   * Oculta los diálogos de creación o edición.
   */
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
        <h1>Catálogo de Proveedores</h1>
      </div>

      <TableData
        arrayObjects={proveedores}
        columns={columnsProveedores}
        openNewDialog={openNewDialog}
        openEditDialog={openEditDialog}
        openDeleteDialog={openDeleteDialog}
        isMobile={true}
        msgNew={"Nuevo Proveedor"}
      />
      
      <Dialog
        header={
          selectedProveedor.IdProveedor === 0
            ? "Nuevo Proveedor"
            : "Modificar Proveedor"
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
            <label htmlFor="nombre">Nombre</label>
              {/* El Keydown validar que solo reciba numeros y letras */}
            <InputText
              id="nombre"
              value={selectedProveedor.Nombre}
              onChange={(e) => handleInputChange(e.target.value, "Nombre")}
              onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="telefono">Teléfono</label>
              {/* El Keydown validar que solo reciba numeros */}
            <InputText
              id="telefono"
              value={selectedProveedor.Telefono}
              onChange={(e) => handleInputChange(e.target.value, "Telefono")}
              onKeyDown={(e) => ValidationUtils.validateNumber(e)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="correo">Correo</label>
            <InputText
              id="correo"
              value={selectedProveedor.Correo}
              onChange={(e) => handleInputChange(e.target.value, "Correo")}
             
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="direccion">Dirección</label>
            <InputTextarea
              id="direccion"
              value={selectedProveedor.Direccion}
              onChange={(e) => handleInputChange(e.target.value, "Direccion")}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="rfc">RFC</label>
            {/* El Keydown validar que solo reciba numeros y letras */}
            <InputText
              id="rfc"
              value={selectedProveedor.RFC}
              onChange={(e) => handleInputChange(e.target.value, "RFC")}
              onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProveedorPage;