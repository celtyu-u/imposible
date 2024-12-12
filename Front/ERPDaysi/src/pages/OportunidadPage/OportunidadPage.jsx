// Componente OportunidadPage.jsx
import "./OportunidadPage.css"; // Es el nombre del componente pero con extensión css
import { BreadCrumb } from "primereact/breadcrumb"; // Este se usa en todos los módelos
import { useState, useEffect, useRef } from "react"; // Este se usa en todos los módelos
import databaseService from "../../services/databaseService"; // Este se usa en todos los módelos
import ModelsUtils from "../../utils/ModelsUtils"; // Este se usa en todos los módelos
import ColumnData from "../../models/System/columnData"; // Este se usa en todos los módelos
import TableData from "../../components/General/TableData"; // Este se usa en todos los módelos
import Oportunidad from "../../models/Oportunidad"; // Este es el Modelo del que se esta generando el CRUD
import { Dialog } from "primereact/dialog"; // Este se usa en todos los módelos
import { InputText } from "primereact/inputtext"; // Este se usa en todos los módelos
import { InputTextarea } from "primereact/inputtextarea"; // Este se usa en todos los módelos
import { Dropdown } from "primereact/dropdown"; // Este se usa en todos los módelos
import { procesos } from "../../models/const/dataSystem"; // Este solo se usa si el módelo contien el campo IdProceso
import { Toast } from "primereact/toast"; // Este se usa en todos los módelos
import ValidationUtils from "../../utils/ValidationUtils"; // Este se usa en todos los módelos
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"; // Este se usa en todos los módelos

/**
 * Componente principal para la gestión de oportunidades de negocio.
 * Permite crear, editar, eliminar y visualizar oportunidades dentro de una tabla interactiva.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.blockedScreen - Indica si la pantalla está bloqueada.
 * @param {Function} props.setBblockedScreen - Función para cambiar el estado de bloqueo de la pantalla.
 * @returns {JSX.Element} - Componente de gestión de oportunidades.
 */
const OportunidadPage = ({ blockedScreen, setBblockedScreen }) => {
  const toast = useRef(null); // Referencia al componente de notificación.
  const items = [
    { label: "Atención Clientes" },
    { label: "Oportunidades de negocio" },
  ]; // Rutas para el breadcrumb.
  const home = { icon: "pi pi-home", url: "/main" }; // Enlace a la página principal.
  let idDelete = 0; // ID de la oportunidad a eliminar.

  // Estados locales para manejar datos y visibilidad de diálogos.
  const [oportunidades, setOportunidades] = useState([]); // Este es el módelo del crud en array
  const [selectedOportunidad, setSelectedOportunidad] = useState(
    new Oportunidad()
  ); // En el módelo seleccionado
  const [newDialogVisible, setNewDialogVisible] = useState(false); // Este se usa en todos los módelos
  const [editDialogVisible, setEditDialogVisible] = useState(false); // Este se usa en todos los módelos
  const [selectedProceso, setProceso] = useState(null); // Este se usa en todos los módelos

  const table = "Oportunidad"; // Nombre de la tabla en la base de datos.

  // Configuración de las columnas de la tabla de oportunidades, se agregan las columanas del módelo.
  const columnsOportunidades = [
    new ColumnData("NombreContacto", "Nombre de Contacto"),
    new ColumnData("Empresa", "Empresa"),
    new ColumnData("Telefono", "Teléfono"),
    new ColumnData("CorreoElectronico", "Correo Electrónico"),
    new ColumnData("Domicilio", "Domicilio"),
    new ColumnData("Necesidad", "Necesidad"),
    new ColumnData("Proceso", "Proceso"),
  ];

  /**
   * Maneja los cambios en los campos de entrada del formulario.
   * @param {any} value - Nuevo valor del campo.
   * @param {string} name - Nombre del campo modificado.
   */
  const handleInputChange = (value, name) => {
    setSelectedOportunidad({
      ...selectedOportunidad,
      [name]: value,
    });
  };

  /**
   * Valida y guarda una oportunidad.
   */
  const handleSave = () => {
    let isValid = true;
      // Validaciones de campos específicos.
      //Esta validación solo aplica para Oportunidad
    if (selectedOportunidad.NombreContacto.trim() === "") {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "El nombre de contacto no puede estar vacío.",
          life: 3000,
        });
        isValid = false;
    }
    if (selectedOportunidad.Empresa.trim() === "") {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "La empresa no puede estar vacía.",
          life: 3000,
        });
        isValid = false;
    }
      if (selectedOportunidad.Telefono.trim() === "") {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "El teléfono no puede estar vacío.",
          life: 3000,
        });
        isValid = false;
      }
    if (selectedOportunidad.CorreoElectronico.trim() === "") {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "El correo electrónico no puede estar vacío.",
          life: 3000,
        });
        isValid = false;
      }
    if (selectedOportunidad.Domicilio.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El domicilio no puede estar vacío.",
        life: 3000,
      });
      isValid = false;
    }
    if (selectedOportunidad.Necesidad.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "La necesidad no puede estar vacía.",
        life: 3000,
      });
      isValid = false;
    }

      if (selectedOportunidad.IdProceso <= 0) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Debes seleccionar un proceso.",
        });
        isValid = false;
      }
      //hasta aqui son las validaciones de Oportunidad
    if (isValid) {
      let oportunidad = new Oportunidad();
      ModelsUtils.fromObject(selectedOportunidad, oportunidad);
      onSave(oportunidad);
    }
  };

  /**
   * Guarda la oportunidad en la base de datos.
   * @param {Oportunidad} oportunidad - Oportunidad a guardar.
   */
  const onSave = (oportunidad) => {
    setBblockedScreen(true);
    let datas = new ModelsUtils().ModelToGeneric([oportunidad]);

    if (oportunidad.IdOportunidad === 0) {
      databaseService.insert(table, datas).then((result) => {
        hideDialog();
        toast.current.show({
          severity: "success",
          summary: "Nuevo Registro",
          detail: "La oportunidad se creó correctamente.",
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
          detail: "La oportunidad se modificó correctamente.",
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
   * Abre el diálogo para crear una nueva oportunidad.
   * @param {Oportunidad} [oportunidad=new Oportunidad()] - Oportunidad inicial (opcional).
   */
  const openNewDialog = (oportunidad = new Oportunidad()) => {
    setSelectedOportunidad(oportunidad);
    setNewDialogVisible(true);
  };

  /**
   * Abre el diálogo para editar una oportunidad existente.
   * @param {Oportunidad} oportunidad - Oportunidad a editar, aqui va el módelo que se esta trabajando.
   */
  const openEditDialog = (oportunidad) => {
    const newOportunidad = { ...oportunidad };
    setSelectedOportunidad(newOportunidad);
    setNewDialogVisible(true);
  };

  /**
   * Abre el cuadro de diálogo de confirmación para eliminar una oportunidad.
   * @param {Oportunidad} oportunidad - Oportunidad a eliminar, Módelo que se esta trabajando.
   */
  const openDeleteDialog = (oportunidad) => {
    idDelete = oportunidad.IdOportunidad;
    confirmDialog({
      message: `¿Está seguro de eliminar la oportunidad de ${oportunidad.NombreContacto}?`,
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
   * Elimina una oportunidad tras la confirmación.
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
   * Acción al rechazar la eliminación de una oportunidad.
   */
  const reject = () => {};

  /**
   * Efecto que se ejecuta al montar el componente, cargando los datos iniciales.
   */
  useEffect(() => {
    refreshData();
  }, []);

  /**
   * Actualiza la lista de oportunidades desde la base de datos.
   */
  const refreshData = () => {
    setBblockedScreen(true);
    databaseService.getAll(table).then((result) => {
      if (result.status === 1) {
        const localOportunidades = new ModelsUtils().GenericToModel(
          result.datas,
          table
        );
        setOportunidades(localOportunidades);
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
        <h1>Oportunidades de negocios</h1>
      </div>

      <TableData
        arrayObjects={oportunidades}
        columns={columnsOportunidades}
        openNewDialog={openNewDialog}
        openEditDialog={openEditDialog}
        openDeleteDialog={openDeleteDialog}
        isMobile={true}
        msgNew={"Nueva Oportunidad"}
      />

      <Dialog
        header={
          selectedOportunidad.IdOportunidad === 0
            ? "Nueva Oportunidad"
            : "Modificar Oportunidad"
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
            <label htmlFor="nombreContacto">Nombre de Contacto</label>
            <InputText
              id="nombreContacto"
              value={selectedOportunidad.NombreContacto}
              onChange={(e) =>
                handleInputChange(e.target.value, "NombreContacto")
              }
              onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="empresa">Empresa</label>
            <InputText
              id="empresa"
              value={selectedOportunidad.Empresa}
              onChange={(e) => handleInputChange(e.target.value, "Empresa")}
              onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="telefono">Teléfono</label>
            <InputText
              id="telefono"
              value={selectedOportunidad.Telefono}
              onChange={(e) => handleInputChange(e.target.value, "Telefono")}
              onKeyDown={(e) => ValidationUtils.validateNumber(e)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="correoElectronico">Correo Electrónico</label>
            <InputText
              id="correoElectronico"
              value={selectedOportunidad.CorreoElectronico}
              onChange={(e) =>
                handleInputChange(e.target.value, "CorreoElectronico")
              }
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="domicilio">Domicilio</label>
            <InputTextarea
              id="domicilio"
              value={selectedOportunidad.Domicilio}
              onChange={(e) => handleInputChange(e.target.value, "Domicilio")}
              onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="necesidad">Necesidad</label>
            <InputTextarea
              id="necesidad"
              value={selectedOportunidad.Necesidad}
              onChange={(e) => handleInputChange(e.target.value, "Necesidad")}
              onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="idProceso">Proceso</label>
            <Dropdown
              id="idProceso"
              value={selectedOportunidad.IdProceso}
              options={procesos}
              optionLabel="descripcion"
              optionValue="id"
              onChange={(e) => handleInputChange(e.target.value, "IdProceso")}
              placeholder="Selecciona un proceso"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default OportunidadPage;