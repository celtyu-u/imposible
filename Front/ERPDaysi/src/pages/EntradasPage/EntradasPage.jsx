import "./EntradasPage.css";
import { BreadCrumb } from "primereact/breadcrumb";

const EntradasPage = () => {
  const items = [{ label: "Almacen" }, { label: "Entradas de Invetario" }];
  const home = { icon: "pi pi-home", url: "/main" };
  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Entradas de Inventarios</h1>
      </div>
    </>
  );
};

export default EntradasPage;
