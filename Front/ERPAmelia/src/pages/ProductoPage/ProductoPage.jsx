import "./ProductoPage.css";//Es el nombre del componente pero con extensión css
import { BreadCrumb } from "primereact/breadcrumb"; //Este se usa en todos los módelos
import { useState, useEffect, useRef } from "react";//Este se usa en todos los módelos

import databaseService from "../../services/databaseService";//Este se usa en todos los módelos
import ModelsUtils from "../../utils/ModelsUtils";//Este se usa en todos los módelos
import ColumnData from "../../models/System/columnData";//Este se usa en todos los módelos
import TableData from "../../components/General/TableData";//Este se usa en todos los módelos
import Producto from "../../models/Producto";//Este es el Modelo del que se esta generando el CRUD
import { Dialog } from "primereact/dialog";//Este se usa en todos los módelos

import { InputText } from "primereact/inputtext";//Este se usa en todos los módelos
import { Dropdown } from "primereact/dropdown";//Este se usa en todos los módelos

import { tiposBebidas } from "../../models/const/dataSystem";//Este solo se usa si el módelo contien el campo IdTipoProducto
import { Toast } from "primereact/toast";//Este se usa en todos los módelos
import ValidationUtils from "../../utils/ValidationUtils";//Este se usa en todos los módelos
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";//Este se usa en todos los módelos

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
  const toast = useRef(null); // Referencia al componente de notificación.
  const items = [{ label: "Ventas" }, { label: "Productos" }]; // Rutas para el breadcrumb.
  const home = { icon: "pi pi-home", url: "/main" }; // Enlace a la página principal.
  let idDelete = 0; // ID del producto a eliminar.

  // Estados locales para manejar datos y visibilidad de diálogos.
  const [productos, setProductos] = useState([]);//Este es el módelo del crud en array
  const [selectedProducto, setSelectedProducto] = useState(new Producto());//En el módelo seleccionado
  const [newDialogVisible, setNewDialogVisible] = useState(false);//Este se usa en todos los módelos
  const [editDialogVisible, setEditDialogVisible] = useState(false);//Este se usa en todos los módelos
  const [selectedTipoProducto, setTipoProducto] = useState(null);//Este se usa en todos los módelos

  const table = "Producto"; // Nombre de la tabla en la base de datos.

  // Configuración de las columnas de la tabla de productos, se agregan las columanas del módelo.
  const columnsProductos = [
    new ColumnData("CodigoBarras", "Código de Barras"),
    new ColumnData("Descripcion", "Descripción"),
    new ColumnData("Precio", "Precio"),
    new ColumnData("InventarioInicial", "Inventario Inicial"),
    new ColumnData("TipoProducto", "Tipo de Producto"),
  ];

  /**
   * Maneja los cambios en los campos de entrada del formulario.
   * @param {any} value - Nuevo valor del campo.
   * @param {string} name - Nombre del campo modificado.
   */
  const handleInputChange = (value, name) => {
    //Es el modelo que fue seleccionado.
    setSelectedProducto({
      ...selectedProducto,
      [name]: value,
    });
  };

  /**
   * Valida y guarda un producto.
   */
  const handleSave = () => {
    let isValid = true;

    // Validaciones de campos específicos.
    //Esta validación solo aplica para Productos
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

    if (selectedProducto.IdTipoProducto<=0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Debes seleccionar un tipo de producto.",
      });
      isValid = false;
    }
    //hasta aqui son las validaciones de producto

    if (isValid) {
      //Se crea un módelo del CRUD
      let producto = new Producto();
      ModelsUtils.fromObject(selectedProducto, producto);
      //Se manda a guardar
      onSave(producto);
    }
  };

  /**
   * Guarda el producto en la base de datos.
   * @param {Producto} producto - Producto a guardar.
   */
  const onSave = (producto) => {
    //Bloqueamos la pantalla
    setBblockedScreen(true);
    //El módelo se pasa a datas
    let datas = new ModelsUtils().ModelToGeneric([producto]);

    //el if se trabaja sobre el campo que es PK
    if (producto.IdProducto === 0) {
      //Este insert aplica para todos los módelos.
      databaseService.insert(table, datas).then((result) => {
        hideDialog();
        toast.current.show({
          severity: "success",
          summary: "Nuevo Registro",
          detail: "El producto se creó correctamente.",
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
          detail: "El producto se modificó correctamente.",
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
   * Abre el diálogo para crear un nuevo producto.
   * @param {Producto} [producto=new Producto()] - Producto inicial (opcional).
   */
  const openNewDialog = (producto = new Producto()) => {
    setSelectedProducto(producto);
    setNewDialogVisible(true);
  };

  /**
   * Abre el diálogo para editar un producto existente.
   * @param {Producto} producto - Producto a editar, aqui va el módelo que se esta trabajando.
   */
  const openEditDialog = (producto) => {
    const newProducto = { ...producto };
    setSelectedProducto(newProducto);
    setNewDialogVisible(true);
  };

  /**
   * Abre el cuadro de diálogo de confirmación para eliminar un producto.
   * @param {Producto} producto - Producto a eliminar, Módelo que se esta trabajando.
   */
  const openDeleteDialog = (producto) => {
    //Aqui se le asigna al idDelete el valor que es PK.
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

  /**
   * Elimina un producto tras la confirmación.
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
   * Acción al rechazar la eliminación de un producto.
   */
  const reject = () => {};

  /**
   * Efecto que se ejecuta al montar el componente, cargando los datos iniciales.
   */
  useEffect(() => {
    refreshData();
  }, []);

  /**
   * Actualiza la lista de productos desde la base de datos.
   */
  const refreshData = () => {
    setBblockedScreen(true);
    databaseService.getAll(table).then((result) => {
      if (result.status === 1) {
        const localProductos = new ModelsUtils().GenericToModel(result.datas,table);
        setProductos(localProductos);
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

    {/* Dialog de nuevo y modificar el módelo, estos se tienen que adaptar al módelo que trabajemos.*/}
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
            {/* El Keydown validar que solo reciba números */}
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
            {/* El Keydown validar que solo reciba numeros y letras */}
            <InputText
              id="descripcion"
              value={selectedProducto.Descripcion}
              onChange={(e) => handleInputChange(e.target.value, "Descripcion")}
              onKeyDown={(e) => ValidationUtils.validateNumberLetter(e, true)}
            />
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="precio">Precio</label>
            {/* El Keydown valida que solo reciba numeros con dos decimales */}
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
            {/* El Keydown valida que solo reciba numeros*/}
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