import "./EmpleadoPage.css"; //Es el nombre del componente pero con extensión css
import { BreadCrumb } from "primereact/breadcrumb"; //Este se usa en todos los módelos
import { useState, useEffect, useRef } from "react"; //Este se usa en todos los módelos

import databaseService from "../../services/databaseService"; //Este se usa en todos los módelos
import ModelsUtils from "../../utils/ModelsUtils"; //Este se usa en todos los módelos
import ColumnData from "../../models/System/columnData"; //Este se usa en todos los módelos
import TableData from "../../components/General/TableData"; //Este se usa en todos los módelos
import Empleado from "../../models/Empleado"; //Este es el Modelo del que se esta generando el CRUD
import { Dialog } from "primereact/dialog"; //Este se usa en todos los módelos

import { InputText } from "primereact/inputtext"; //Este se usa en todos los módelos
import { InputTextarea } from "primereact/inputtextarea"; //Este se usa en todos los módelos
import { Dropdown } from "primereact/dropdown"; //Este se usa en todos los módelos

import { areas } from "../../models/const/dataSystem"; //Este solo se usa si el módelo contien el campo IdArea
import { Toast } from "primereact/toast"; //Este se usa en todos los módelos
import ValidationUtils from "../../utils/ValidationUtils"; //Este se usa en todos los módelos
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"; //Este se usa en todos los módelos

/**
 * Componente principal para la gestión de empleados.
 * Permite crear, editar, eliminar y visualizar empleados dentro de una tabla interactiva.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.blockedScreen - Indica si la pantalla está bloqueada.
 * @param {Function} props.setBblockedScreen - Función para cambiar el estado de bloqueo de la pantalla.
 * @returns {JSX.Element} - Componente de gestión de empleados.
 */
const EmpleadoPage = ({ blockedScreen, setBblockedScreen }) => {
  const toast = useRef(null); // Referencia al componente de notificación.
  const items = [{ label: "Recursos Humanos" }, { label: "Catálogo de Empleados" }]; // Rutas para el breadcrumb.
  const home = { icon: "pi pi-home", url: "/main" }; // Enlace a la página principal.
  let idDelete = 0; // ID del empleado a eliminar.

  // Estados locales para manejar datos y visibilidad de diálogos.
  const [empleados, setEmpleados] = useState([]); //Este es el módelo del crud en array
  const [selectedEmpleado, setSelectedEmpleado] = useState(new Empleado()); //En el módelo seleccionado
  const [newDialogVisible, setNewDialogVisible] = useState(false); //Este se usa en todos los módelos
  const [editDialogVisible, setEditDialogVisible] = useState(false); //Este se usa en todos los módelos
  const [selectedArea, setSelectedArea] = useState(null); //Este se usa en todos los módelos

  const table = "Empleado"; // Nombre de la tabla en la base de datos.

  // Configuración de las columnas de la tabla de empleados, se agregan las columanas del módelo.
  const columnsEmpleados = [
    new ColumnData("Nombre", "Nombre"),
    new ColumnData("Telefono", "Teléfono"),
    new ColumnData("Correo", "Correo"),
    new ColumnData("Direccion", "Dirección"),
    new ColumnData("Area", "Area"),
  ];

  /**
   * Maneja los cambios en los campos de entrada del formulario.
   * @param {any} value - Nuevo valor del campo.
   * @param {string} name - Nombre del campo modificado.
   */
  const handleInputChange = (value, name) => {
    //Es el modelo que fue seleccionado.
    setSelectedEmpleado({
      ...selectedEmpleado,
      [name]: value,
    });
  };

  /**
   * Valida y guarda un empleado.
   */
  const handleSave = () => {
    let isValid = true;

    // Validaciones de campos específicos.
    //Esta validación solo aplica para Empleado
    if (selectedEmpleado.Nombre.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El nombre no puede estar vacío.",
        life: 3000,
      });
      isValid = false;
    }
    if (selectedEmpleado.Telefono.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El teléfono no puede estar vacío.",
        life: 3000,
      });
      isValid = false;
    }
    if (selectedEmpleado.Correo.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El correo no puede estar vacío.",
        life: 3000,
      });
      isValid = false;
    }
    if (selectedEmpleado.Direccion.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "La dirección no puede estar vacía.",
        life: 3000,
      });
      isValid = false;
    }
    if (selectedEmpleado.IdArea <= 0) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Debes seleccionar un área.",
        });
        isValid = false;
      }
    //hasta aqui son las validaciones de empleado

    if (isValid) {
      //Se crea un módelo del CRUD
      let empleado = new Empleado();
      ModelsUtils.fromObject(selectedEmpleado, empleado);
      //Se manda a guardar
      onSave(empleado);
    }
  };

  /**
   * Guarda el empleado en la base de datos.
   * @param {Empleado} empleado - Empleado a guardar.
   */
  const onSave = (empleado) => {
    //Bloqueamos la pantalla
    setBblockedScreen(true);
    //El módelo se pasa a datas
    let datas = new ModelsUtils().ModelToGeneric([empleado]);

    //el if se trabaja sobre el campo que es PK
    if (empleado.IdEmpleado === 0) {
      //Este insert aplica para todos los módelos.
      databaseService.insert(table, datas).then((result) => {
        hideDialog();
        toast.current.show({
          severity: "success",
          summary: "Nuevo Registro",
          detail: "El empleado se creó correctamente.",
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
          detail: "El empleado se modificó correctamente.",
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
   * Abre el diálogo para crear un nuevo empleado.
   * @param {Empleado} [empleado=new Empleado()] - Empleado inicial (opcional).
   */
  const openNewDialog = (empleado = new Empleado()) => {
    setSelectedEmpleado(empleado);
    setNewDialogVisible(true);
  };

  /**
   * Abre el diálogo para editar un empleado existente.
   * @param {Empleado} empleado - Empleado a editar, aqui va el módelo que se esta trabajando.
   */
  const openEditDialog = (empleado) => {
    const newEmpleado = { ...empleado };
    setSelectedEmpleado(newEmpleado);
    setNewDialogVisible(true);
  };

  /**
   * Abre el cuadro de diálogo de confirmación para eliminar un empleado.
   * @param {Empleado} empleado - Empleado a eliminar, Módelo que se esta trabajando.
   */
  const openDeleteDialog = (empleado) => {
    //Aqui se le asigna al idDelete el valor que es PK.
    idDelete = empleado.IdEmpleado;
    confirmDialog({
      message: `¿Está seguro de eliminar el empleado ${empleado.Nombre}?`,
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
   * Elimina un empleado tras la confirmación.
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
   * Acción al rechazar la eliminación de un empleado.
   */
  const reject = () => {};

  /**
   * Efecto que se ejecuta al montar el componente, cargando los datos iniciales.
   */
  useEffect(() => {
    refreshData();
  }, []);

  /**
   * Actualiza la lista de empleados desde la base de datos.
   */
  const refreshData = () => {
    setBblockedScreen(true);
    databaseService.getAll(table).then((result) => {
      if (result.status === 1) {
        const localEmpleados = new ModelsUtils().GenericToModel(result.datas,table);
        setEmpleados(localEmpleados);
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
        <h1>Catálogo de Empleados</h1>
      </div>

      <TableData
        arrayObjects={empleados}
        columns={columnsEmpleados}
        openNewDialog={openNewDialog}
        openEditDialog={openEditDialog}
        openDeleteDialog={openDeleteDialog}
        isMobile={true}
        msgNew={"Nuevo Empleado"}
      />

      {/* Dialog de nuevo y modificar el módelo, estos se tienen que adaptar al módelo que trabajemos.*/}
      <Dialog
        header={
          selectedEmpleado.IdEmpleado === 0
            ? "Nuevo Empleado"
            : "Modificar Empleado"
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
              value={selectedEmpleado.Nombre}
              onChange={(e) => handleInputChange(e.target.value, "Nombre")}
              onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="telefono">Teléfono</label>
            {/* El Keydown validar que solo reciba números */}
            <InputText
              id="telefono"
              value={selectedEmpleado.Telefono}
              onChange={(e) => handleInputChange(e.target.value, "Telefono")}
              onKeyDown={(e) => ValidationUtils.validateNumber(e)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="correo">Correo</label>
            <InputText
              id="correo"
              value={selectedEmpleado.Correo}
              onChange={(e) => handleInputChange(e.target.value, "Correo")}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="direccion">Dirección</label>
            <InputTextarea
              id="direccion"
              value={selectedEmpleado.Direccion}
              onChange={(e) => handleInputChange(e.target.value, "Direccion")}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="idArea">Área</label>
            <Dropdown
              id="idArea"
              value={selectedEmpleado.IdArea}
              options={areas}
              optionLabel="descripcion"
              optionValue="id"
              onChange={(e) => handleInputChange(e.target.value, "IdArea")}
              placeholder="Selecciona un área"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EmpleadoPage;
