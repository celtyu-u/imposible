import "./ClientesPage.css";
import { BreadCrumb } from "primereact/breadcrumb";

const ClientesPage = () => {
  const items = [{ label: "Ventas" }, { label: "Clientes" }];
  const home = { icon: "pi pi-home", url: "/main" };

  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>

      <div>
        <h1>Catálogo de Clientes</h1>
      </div>
    </>
  );
};

export default ClientesPage;
