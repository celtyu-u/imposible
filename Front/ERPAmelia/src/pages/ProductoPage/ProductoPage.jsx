import "./ProductoPage.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { useState, useEffect, useRef } from "react";

import databaseService from "../../services/databaseService";
import ModelsUtils from "../../utils/ModelsUtils";
import ColumnData from "../../models/System/columnData";
import TableData from "../../components/General/TableData";
import Producto from "../../models/Producto";
import { Dialog } from "primereact/dialog";


const ProductoPage = () => {
  const items = [{ label: "Ventas" }, { label: "Productos" }];
  const home = { icon: "pi pi-home", url: "/main" };
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(new Producto());
  const [newDialogVisible, setNewDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);


  const columnsProductos = [
    new ColumnData("CodigoBarras", "Código de Barras"),
    new ColumnData("Descripcion", "Descripción"),
    new ColumnData("Precio", "Precio"),
    new ColumnData("InventarioInicial", "Inventario Inicial"),
    new ColumnData("TipoProducto", "Tipo de Producto"),
  ];

  const openNewDialog = (producto = new Producto()) => {
    setSelectedProducto(producto);
    setNewDialogVisible(true);
  };

  const openEditDialog = () => {};
  const openDeleteDialog = () => {};

  useEffect(() => {
    databaseService.getAll("Producto").then((result) => {
      if (result.status == 1) {
        let localProductos = [];
        localProductos = ModelsUtils.GenericToModel(result.datas);
        setProductos(localProductos);
        console.log("New Array:", localProductos);
      } else {
      }
    });
  }, []);

  const hideDialog = () => {
    setEditDialogVisible(false);
    setNewDialogVisible(false);
  };


  return (
    <>
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
        header='Nuevo Producto'
        visible={newDialogVisible}
        style={{ width: "100%", maxWidth: "600px" }}
        onHide={hideDialog}
      >


      </Dialog>
    </>
  );
};

export default ProductoPage;
