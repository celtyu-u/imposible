import "./SalidasPage.css";
import { BreadCrumb } from "primereact/breadcrumb";


const SalidasPage = () => {
  const items = [{ label: "Almacen" }, { label: "Salidas de Inventario" }];
  const home = { icon: "pi pi-home", url: "/main" };
  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Salidas de Inventario</h1>
      </div>
    </>
  );
};

export default SalidasPage;
