import "./ProveedorPage.css";//Es el nombre del componente pero con extensión css
import { BreadCrumb } from "primereact/breadcrumb"; //Este se usa en todos los módelos
import { useState, useEffect, useRef } from "react";//Este se usa en todos los módelos

import databaseService from "../../services/databaseService";//Este se usa en todos los módelos
import ModelsUtils from "../../utils/ModelsUtils";//Este se usa en todos los módelos
import ColumnData from "../../models/System/columnData";//Este se usa en todos los módelos
import TableData from "../../components/General/TableData";//Este se usa en todos los módelos
import Proveedor from "../../models/Proveedor";//Este es el Modelo del que se esta generando el CRUD
import { Dialog } from "primereact/dialog";//Este se usa en todos los módelos

import { InputText } from "primereact/inputtext";//Este se usa en todos los módelos
import { InputTextarea } from "primereact/inputtextarea";//Este se usa en todos los módelos

import { Toast } from "primereact/toast";//Este se usa en todos los módelos
import ValidationUtils from "../../utils/ValidationUtils";//Este se usa en todos los módelos
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";//Este se usa en todos los módelos


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
  const toast = useRef(null); // Referencia al componente de notificación.
  const items = [{ label: "Compras" }, { label: "Proveedores" }]; // Rutas para el breadcrumb.
  const home = { icon: "pi pi-home", url: "/main" }; // Enlace a la página principal.
  let idDelete = 0; // ID del proveedor a eliminar.

  // Estados locales para manejar datos y visibilidad de diálogos.
  const [proveedores, setProveedores] = useState([]);//Este es el módelo del crud en array
  const [selectedProveedor, setSelectedProveedor] = useState(new Proveedor());//En el módelo seleccionado
  const [newDialogVisible, setNewDialogVisible] = useState(false);//Este se usa en todos los módelos
  const [editDialogVisible, setEditDialogVisible] = useState(false);//Este se usa en todos los módelos

  const table = "Proveedor"; // Nombre de la tabla en la base de datos.

  // Configuración de las columnas de la tabla de proveedores, se agregan las columanas del módelo.
  const columnsProveedores = [
    new ColumnData("Nombre", "Nombre"),
    new ColumnData("Telefono", "Teléfono"),
    new ColumnData("CorreoElectronico", "Correo Electrónico"),
    new ColumnData("Domicilio", "Domicilio"),
      new ColumnData("RFC", "RFC")
  ];

  /**
   * Maneja los cambios en los campos de entrada del formulario.
   * @param {any} value - Nuevo valor del campo.
   * @param {string} name - Nombre del campo modificado.
   */
    const handleInputChange = (value, name) => {
        //Es el modelo que fue seleccionado.
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

    // Validaciones de campos específicos.
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
    if (selectedProveedor.CorreoElectronico.trim() === "") {
        toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "El correo electrónico no puede estar vacío.",
            life: 3000,
        });
        isValid = false;
      }
    if (selectedProveedor.Domicilio.trim() === "") {
        toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "El domicilio no puede estar vacío.",
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
        //Se crea un módelo del CRUD
        let proveedor = new Proveedor();
      ModelsUtils.fromObject(selectedProveedor, proveedor);
      //Se manda a guardar
      onSave(proveedor);
    }
  };

  /**
   * Guarda el proveedor en la base de datos.
   * @param {Proveedor} proveedor - Proveedor a guardar.
   */
  const onSave = (proveedor) => {
    //Bloqueamos la pantalla
    setBblockedScreen(true);
     //El módelo se pasa a datas
    let datas = new ModelsUtils().ModelToGeneric([proveedor]);

    //el if se trabaja sobre el campo que es PK
    if (proveedor.IdProveedor === 0) {
      //Este insert aplica para todos los módelos.
        databaseService.insert(table, datas).then((result) => {
        hideDialog();
        toast.current.show({
          severity: "success",
          summary: "Nuevo Registro",
          detail: "El proveedor se creó correctamente.",
        });
        //Se activa la pantalla
        setBblockedScreen(false);
        //Se actualizan los datos
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
   * @param {Proveedor} proveedor - Proveedor a editar, aqui va el módelo que se esta trabajando.
   */
  const openEditDialog = (proveedor) => {
      const newProveedor = { ...proveedor };
      setSelectedProveedor(newProveedor);
    setNewDialogVisible(true);
  };

  /**
   * Abre el cuadro de diálogo de confirmación para eliminar un proveedor.
   * @param {Proveedor} proveedor - Proveedor a eliminar, Módelo que se esta trabajando.
   */
  const openDeleteDialog = (proveedor) => {
      //Aqui se le asigna al idDelete el valor que es PK.
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
        const localProveedores = new ModelsUtils().GenericToModel(result.datas, table);
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
    {/* Este es para los mensajes */}
      <Toast ref={toast} />
    {/* Este es para el confirmDialog que se usa */}
      <ConfirmDialog />

    {/* Esta es el BredCrumb */}
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
    
    {/* Aqui adentro se agrega el titulo */}
      <div>
        <h1>Gestión de Proveedores</h1>
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

    {/* Dialog de nuevo y modificar el módelo, estos se tienen que adaptar al módelo que trabajemos.*/}
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
            {/* El Keydown validar que solo reciba números y letras */}
            <InputText
              id="nombre"
              value={selectedProveedor.Nombre}
              onChange={(e) =>
                handleInputChange(e.target.value, "Nombre")
              }
                onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="telefono">Teléfono</label>
              {/* El Keydown validar que solo reciba números */}
            <InputText
              id="telefono"
              value={selectedProveedor.Telefono}
                onChange={(e) => handleInputChange(e.target.value, "Telefono")}
                onKeyDown={(e) => ValidationUtils.validateNumber(e)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="correoElectronico">Correo Electrónico</label>
              {/* El Keydown validar que solo reciba números y letras */}
            <InputText
              id="correoElectronico"
                value={selectedProveedor.CorreoElectronico}
              onChange={(e) => handleInputChange(e.target.value, "CorreoElectronico")}
                 onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, false)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="domicilio">Domicilio</label>
              {/* El Keydown validar que solo reciba números y letras */}
              <InputTextarea
                id="domicilio"
                value={selectedProveedor.Domicilio}
                onChange={(e) =>
                    handleInputChange(e.target.value, "Domicilio")
                  }
                  onKeyDown={(e) => ValidationUtils.validateNumberLetter(e,true)}
              />
          </div>
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="rfc">RFC</label>
                {/* El Keydown validar que solo reciba números y letras */}
                <InputText
                    id="rfc"
                    value={selectedProveedor.RFC}
                    onChange={(e) =>
                        handleInputChange(e.target.value, "RFC")
                    }
                    onKeyDown={(e) => ValidationUtils.validateNumberLetter(e,false)}
                />
            </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProveedorPage;