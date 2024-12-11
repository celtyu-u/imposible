import "./QuejaPage.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { useState, useEffect, useRef } from "react";
import databaseService from "../../services/databaseService";
import ModelsUtils from "../../utils/ModelsUtils";
import ColumnData from "../../models/System/columnData";
import TableData from "../../components/General/TableData";
import Queja from "../../models/Queja";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { prioridades, estatus } from "../../models/const/dataSystem";
import { Toast } from "primereact/toast";
import ValidationUtils from "../../utils/ValidationUtils";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const QuejaPage = ({ blockedScreen, setBblockedScreen }) => {
    const toast = useRef(null);
    const items = [{ label: "Atención Clientes" }, { label: "Quejas y Sugerencias" }];
    const home = { icon: "pi pi-home", url: "/main" };
    let idDelete = 0;

    const [clientes, setClientes] = useState([{id:1,descripcion:'Prueba'}]);
    const [quejas, setQuejas] = useState([]);
    const [selectedQueja, setSelectedQueja] = useState(new Queja());
    const [newDialogVisible, setNewDialogVisible] = useState(false);
    const [editDialogVisible, setEditDialogVisible] = useState(false);

    const table = "Queja";

    const columnsQuejas = [
        new ColumnData("Proceso", "Proceso"),
        new ColumnData("Queja", "Queja"),
        new ColumnData("Solucion", "Solución"),
        new ColumnData("Cliente", "Cliente"),
        new ColumnData("Prioridad", "Prioridad"),
        new ColumnData("Estatus", "Estatus")
    ];


    const handleInputChange = (value, name) => {
        setSelectedQueja({
            ...selectedQueja,
            [name]: value,
        });
    };


    const handleSave = () => {
        let isValid = true;

        if (selectedQueja.Proceso.trim() === "") {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "El proceso no puede estar vacío.",
                life: 3000,
            });
            isValid = false;
        }
        if (selectedQueja.Queja.trim() === "") {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "La queja no puede estar vacía.",
                life: 3000,
            });
            isValid = false;
        }
        if (selectedQueja.Solucion.trim() === "") {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "La solución no puede estar vacía.",
                life: 3000,
            });
            isValid = false;
        }
        if (selectedQueja.IdCliente <= 0) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Debes seleccionar un cliente.",
          });
          isValid = false;
        }
        if (selectedQueja.IdPrioridad <= 0) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Debes seleccionar una prioridad.",
          });
          isValid = false;
        }
        if (selectedQueja.IdEstatus <= 0) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Debes seleccionar un estatus.",
          });
          isValid = false;
        }


        if (isValid) {
            let queja = new Queja();
            ModelsUtils.fromObject(selectedQueja, queja);
            onSave(queja);
        }
    };


    const onSave = (queja) => {
        setBblockedScreen(true);
        let datas = new ModelsUtils().ModelToGeneric([queja]);

        if (queja.IdQueja === 0) {
            databaseService.insert(table, datas).then((result) => {
                hideDialog();
                toast.current.show({
                    severity: "success",
                    summary: "Nuevo Registro",
                    detail: "La queja se creó correctamente.",
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
                    detail: "La queja se modificó correctamente.",
                });
                refreshData();
                setBblockedScreen(false);
            });
        }
    };

    const handleCancel = () => {
        hideDialog();
    };


    const openNewDialog = (queja = new Queja()) => {
        setSelectedQueja(queja);
        setNewDialogVisible(true);
    };


    const openEditDialog = (queja) => {
        const newQueja = { ...queja };
        setSelectedQueja(newQueja);
        setNewDialogVisible(true);
    };

    const openDeleteDialog = (queja) => {
        idDelete = queja.IdQueja;
        confirmDialog({
            message: `¿Está seguro de eliminar la queja con proceso: ${queja.Proceso}?`,
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


    const reject = () => { };

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        setBblockedScreen(true);
        let tableLocal='Cliente';
        console.log('Clientes:',clientes);

        databaseService.getAll(tableLocal).then((result)=>{
          if(result.status==1){
            const clientesData = new ModelsUtils().GenericToModel(result.datas,tableLocal);
            let clientesLocal=clientesData.map(cliente=>{
              return {id:cliente.IdCliente,descripcion:cliente.Nombre};
            });

            setClientes(clientesLocal);

            console.log('Clientes:',clientes);
            console.log('Prioridades:',prioridades);

            databaseService.getAll(table).then((result) => {
              if (result.status === 1) {
                  const localQuejas = new ModelsUtils().GenericToModel(result.datas,table,clientesLocal);
                  setQuejas(localQuejas);
                  setBblockedScreen(false);
              } else {
                  console.log("Fallo La carga:", result.message);
              }
          });
          }else{
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
                <h1>Quejas y Sugerencias</h1>
            </div>

            <TableData
                arrayObjects={quejas}
                columns={columnsQuejas}
                openNewDialog={openNewDialog}
                openEditDialog={openEditDialog}
                openDeleteDialog={openDeleteDialog}
                isMobile={true}
                msgNew={"Nueva Queja"}
            />

            <Dialog
                header={
                    selectedQueja.IdQueja === 0
                        ? "Nueva Queja"
                        : "Modificar Queja"
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
                        <label htmlFor="proceso">Proceso</label>
                        <InputText
                            id="proceso"
                            value={selectedQueja.Proceso}
                            onChange={(e) =>
                                handleInputChange(e.target.value, "Proceso")
                            }
                              onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="queja">Queja</label>
                        <InputTextarea
                            id="queja"
                            value={selectedQueja.Queja}
                            onChange={(e) => handleInputChange(e.target.value, "Queja")}
                             onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
                            rows={5}
                        />
                    </div>
                     <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="solucion">Solución</label>
                        <InputTextarea
                            id="solucion"
                            value={selectedQueja.Solucion}
                            onChange={(e) => handleInputChange(e.target.value, "Solucion")}
                             onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
                            rows={5}
                        />
                    </div>
                   
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="idCliente">Cliente</label>
                        <Dropdown
                            id="idCliente"
                            value={selectedQueja.IdCliente}
                            options={clientes}
                            optionLabel="descripcion"
                            optionValue="id"
                            onChange={(e) =>
                                handleInputChange(e.target.value, "IdCliente")
                            }
                            filter
                            placeholder="Selecciona un cliente"
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="idPrioridad">Prioridad</label>
                        <Dropdown
                            id="idPrioridad"
                            value={selectedQueja.IdPrioridad}
                            options={prioridades}
                            optionLabel="descripcion"
                            optionValue="id"
                            onChange={(e) =>
                                handleInputChange(e.target.value, "IdPrioridad")
                            }
                            placeholder="Selecciona una prioridad"
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="idEstatus">Estatus</label>
                        <Dropdown
                            id="idEstatus"
                            value={selectedQueja.IdEstatus}
                            options={estatus}
                            optionLabel="descripcion"
                            optionValue="id"
                            onChange={(e) =>
                                handleInputChange(e.target.value, "IdEstatus")
                            }
                            placeholder="Selecciona un estatus"
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default QuejaPage;