import "./ProveedoresPage.css";
import { BreadCrumb } from "primereact/breadcrumb";

const ProveedoresPage = () => {
  const items = [{ label: "Compras" }, { label: "Proveedores" }];
  const home = { icon: "pi pi-home", url: "/main" };

  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Catálogo de Proveedores</h1>
      </div>
    </>
  );
};

export default ProveedoresPage;
