import "./InventariosPage.css";
import { BreadCrumb } from "primereact/breadcrumb";


const InventariosPage = () => {
  const items = [{ label: "Almacen" }, { label: "Inventario" }];
  const home = { icon: "pi pi-home", url: "/main" };
  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Inventarios</h1>
      </div>
    </>
  );
};

export default InventariosPage;
