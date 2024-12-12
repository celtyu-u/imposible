import "./EmpleadoPage.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { useState, useEffect, useRef } from "react";

import databaseService from "../../services/databaseService";
import ModelsUtils from "../../utils/ModelsUtils";
import ColumnData from "../../models/System/columnData";
import TableData from "../../components/General/TableData";
import Empleado from "../../models/Empleado";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import ValidationUtils from "../../utils/ValidationUtils";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { areas } from "../../models/const/dataSystem";


const EmpleadoPage = ({ blockedScreen, setBblockedScreen }) => {
    const toast = useRef(null);
    const items = [{ label: "Recursos Humanos" }, { label: "Catálogo de Empleados" }];
    const home = { icon: "pi pi-home", url: "/main" };
    let idDelete = 0;

    const [empleados, setEmpleados] = useState([]);
    const [selectedEmpleado, setSelectedEmpleado] = useState(new Empleado());
    const [newDialogVisible, setNewDialogVisible] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);
    const [selectedArea, setSelectedArea] = useState(null);

    const table = "Empleado";

    const columnsEmpleados = [
        new ColumnData("Nombre", "Nombre"),
        new ColumnData("Telefono", "Teléfono"),
        new ColumnData("Correo", "Correo"),
        new ColumnData("Direccion", "Dirección"),
         new ColumnData("Area", "Área"),
    ];

    const handleInputChange = (value, name) => {
        setSelectedEmpleado({
            ...selectedEmpleado,
            [name]: value,
        });
    };

    const handleSave = () => {
        let isValid = true;

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
         if (selectedEmpleado.IdArea <=0) {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "Debes seleccionar un área.",
            });
            isValid = false;
          }


        if (isValid) {
            let empleado = new Empleado();
            ModelsUtils.fromObject(selectedEmpleado, empleado);
            onSave(empleado);
        }
    };

    const onSave = (empleado) => {
        setBblockedScreen(true);
        let datas = new ModelsUtils().ModelToGeneric([empleado]);

        if (empleado.IdEmpleado === 0) {
            databaseService.insert(table, datas).then((result) => {
                hideDialog();
                toast.current.show({
                    severity: "success",
                    summary: "Nuevo Registro",
                    detail: "El empleado se creó correctamente.",
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
                    detail: "El empleado se modificó correctamente.",
                });
                refreshData();
                setBblockedScreen(false);
            });
        }
    };

    const handleCancel = () => {
        hideDialog();
    };

   const openNewDialog = (empleado = new Empleado()) => {
        setSelectedEmpleado(empleado);
        setNewDialogVisible(true);
    };

    const openEditDialog = (empleado) => {
      const newEmpleado = { ...empleado };
      setSelectedEmpleado(newEmpleado);
      setNewDialogVisible(true);
  };

    const openDeleteDialog = (empleado) => {
        idDelete = empleado.IdEmpleado;
        confirmDialog({
            message: `¿Está seguro de eliminar al empleado ${empleado.Nombre}?`,
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
                const localEmpleados = new ModelsUtils().GenericToModel(result.datas,table);
                setEmpleados(localEmpleados);
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
                <h1>Gestión de Empleados</h1>
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
                        <button
                            className="p-button p-button-primary"
                            onClick={handleSave}
                        >
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
                            value={selectedEmpleado.Nombre}
                            onChange={(e) =>
                                handleInputChange(e.target.value, "Nombre")
                            }
                             onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="telefono">Teléfono</label>
                        <InputText
                            id="telefono"
                            value={selectedEmpleado.Telefono}
                            onChange={(e) =>
                                handleInputChange(e.target.value, "Telefono")
                            }
                             onKeyDown={(e) => ValidationUtils.validateNumber(e)}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="correo">Correo</label>
                        <InputText
                            id="correo"
                            value={selectedEmpleado.Correo}
                            onChange={(e) =>
                                handleInputChange(e.target.value, "Correo")
                            }
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="direccion">Dirección</label>
                        <InputTextarea
                            id="direccion"
                            value={selectedEmpleado.Direccion}
                             rows={3}
                            onChange={(e) =>
                                handleInputChange(e.target.value, "Direccion")
                            }
                             onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
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
                            onChange={(e) =>
                                handleInputChange(e.target.value, "IdArea")
                            }
                            placeholder="Selecciona un área"
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default EmpleadoPage;