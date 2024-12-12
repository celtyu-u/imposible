import "./ClientePage.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { useState, useEffect, useRef } from "react";

import databaseService from "../../services/databaseService";
import ModelsUtils from "../../utils/ModelsUtils";
import ColumnData from "../../models/System/columnData";
import TableData from "../../components/General/TableData";
import Cliente from "../../models/Cliente";
import { Dialog } from "primereact/dialog";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

import { tiposClientes } from "../../models/const/dataSystem";
import { Toast } from "primereact/toast";
import ValidationUtils from "../../utils/ValidationUtils";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const ClientePage = ({ blockedScreen, setBblockedScreen }) => {
  const toast = useRef(null);
  const items = [{ label: "Ventas" }, { label: "Clientes" }];
  const home = { icon: "pi pi-home", url: "/main" };
  let idDelete = 0;

  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(new Cliente());
  const [newDialogVisible, setNewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedTipoCliente, setTipoCliente] = useState(null);

  const table = "Cliente";

  const columnsClientes = [
    new ColumnData("Nombre", "Nombre"),
    new ColumnData("Celular", "Celular"),
    new ColumnData("CorreoElectronico", "Correo Electrónico"),
    new ColumnData("Domicilio", "Domicilio"),
    new ColumnData("RFC", "RFC"),
    new ColumnData("TipoCliente", "Tipo de Cliente"),
  ];

  const handleInputChange = (value, name) => {
    setSelectedCliente({
      ...selectedCliente,
      [name]: value,
    });
  };

  const handleSave = () => {
    let isValid = true;

    if (selectedCliente.Nombre.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El nombre no puede estar vacío.",
        life: 3000,
      });
      isValid = false;
    }
    if (selectedCliente.Celular.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El celular no puede estar vacío.",
        life: 3000,
      });
      isValid = false;
    }
    if (selectedCliente.CorreoElectronico.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El correo electrónico no puede estar vacío.",
        life: 3000,
      });
      isValid = false;
    }
     if (selectedCliente.Domicilio.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "El domicilio no puede estar vacío.",
        life: 3000,
      });
      isValid = false;
    }
    if (selectedCliente.RFC.trim() === "") {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "El RFC no puede estar vacío.",
          life: 3000,
        });
        isValid = false;
      }
    if (selectedCliente.IdTipoCliente<=0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Debes seleccionar un tipo de cliente.",
      });
      isValid = false;
    }


    if (isValid) {
      let cliente = new Cliente();
      ModelsUtils.fromObject(selectedCliente, cliente);
      onSave(cliente);
    }
  };

  const onSave = (cliente) => {
    setBblockedScreen(true);
    let datas = new ModelsUtils().ModelToGeneric([cliente]);

    if (cliente.IdCliente === 0) {
      databaseService.insert(table, datas).then((result) => {
        hideDialog();
        toast.current.show({
          severity: "success",
          summary: "Nuevo Registro",
          detail: "El cliente se creó correctamente.",
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
          detail: "El cliente se modificó correctamente.",
        });
        refreshData();
        setBblockedScreen(false);
      });
    }
  };

  const handleCancel = () => {
    hideDialog();
  };

    const openNewDialog = (cliente = new Cliente()) => {
        setSelectedCliente(cliente);
        setNewDialogVisible(true);
    };

    const openEditDialog = (cliente) => {
        const newCliente = { ...cliente };
        setSelectedCliente(newCliente);
        setNewDialogVisible(true);
    };

    const openDeleteDialog = (cliente) => {
        idDelete = cliente.IdCliente;
        confirmDialog({
          message: `¿Está seguro de eliminar el cliente ${cliente.Nombre}?`,
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
        const localClientes = new ModelsUtils().GenericToModel(result.datas,table);
          setClientes(localClientes);
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
        <h1>Gestión de Clientes</h1>
      </div>

      <TableData
        arrayObjects={clientes}
        columns={columnsClientes}
        openNewDialog={openNewDialog}
        openEditDialog={openEditDialog}
        openDeleteDialog={openDeleteDialog}
        isMobile={true}
        msgNew={"Nuevo Cliente"}
      />

      <Dialog
        header={
          selectedCliente.IdCliente === 0 ? "Nuevo Cliente" : "Modificar Cliente"
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
            <InputText
              id="nombre"
              value={selectedCliente.Nombre}
              onChange={(e) => handleInputChange(e.target.value, "Nombre")}
                onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="celular">Celular</label>
            <InputText
              id="celular"
              value={selectedCliente.Celular}
              onChange={(e) => handleInputChange(e.target.value, "Celular")}
                 onKeyDown={(e) => ValidationUtils.validateNumber(e)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="correoElectronico">Correo Electrónico</label>
            <InputText
              id="correoElectronico"
              value={selectedCliente.CorreoElectronico}
              onChange={(e) =>
                handleInputChange(e.target.value, "CorreoElectronico")
              }
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="domicilio">Domicilio</label>
            <InputTextarea
              id="domicilio"
              value={selectedCliente.Domicilio}
              onChange={(e) => handleInputChange(e.target.value, "Domicilio")}
                onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
            <div className="p-field p-col-12 p-md-6">
            <label htmlFor="rfc">RFC</label>
            <InputText
              id="rfc"
              value={selectedCliente.RFC}
              onChange={(e) => handleInputChange(e.target.value, "RFC")}
                onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="idTipoCliente">Tipo de Cliente</label>
            <Dropdown
              id="idTipoCliente"
              value={selectedCliente.IdTipoCliente}
              options={tiposClientes}
              optionLabel="descripcion"
              optionValue="id"
              onChange={(e) =>
                handleInputChange(e.target.value, "IdTipoCliente")
              }
              placeholder="Selecciona un tipo de cliente"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ClientePage;