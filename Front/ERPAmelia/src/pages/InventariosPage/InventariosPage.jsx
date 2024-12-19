import "./InventariosPage.css";
import { BreadCrumb } from "primereact/breadcrumb";
import { useState, useEffect, useRef } from "react"; //Este se usa en todos los módelos
import ColumnData from "../../models/System/columnData";
import TableData from "../../components/General/TableData";
import databaseService from "../../services/databaseService";
import ModelsUtils from "../../utils/ModelsUtils";

const InventariosPage = ({ blockedScreen, setBblockedScreen }) => {
  const items = [{ label: "Almacen" }, { label: "Inventario" }];
  const home = { icon: "pi pi-home", url: "/main" };
  const table="Inventory";

  const [inventarios, setInventarios] = useState([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setBblockedScreen(true);
    databaseService.getAll(table).then((result) => {
      if (result.status === 1) {
        const localInventarios = new ModelsUtils().GenericToModel(result.datas,table);
        console.log(localInventarios);
        setInventarios(localInventarios);
        setBblockedScreen(false);
      } else {
        console.log("Fallo La carga:", result.message);
      }
    });
  };

  // Configuración de las columnas de la tabla de productos, se agregan las columanas del módelo.
  const columnsInventario = [
    new ColumnData("CodigoBarras", "Código de Barras"),
    new ColumnData("Descripcion", "Descripción"),
    new ColumnData("Inventario", "Inventario"),
  ];

  const openNewDialog=()=>{
  };

  const openEditDialog=()=>{
  };

  const openDeleteDialog=()=>{
  };

  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Inventarios</h1>
      </div>
      <div>
        <TableData
          arrayObjects={inventarios}
          columns={columnsInventario}
          openNewDialog={openNewDialog}
          openEditDialog={openEditDialog}
          openDeleteDialog={openDeleteDialog}
          isMobile={false}
          msgNew={"Nuevo Inventario"}
          acciones={false}
        />
      </div>
    </>
  );
};

export default InventariosPage;
