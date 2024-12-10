import "./VentasPage.css";
import { BreadCrumb } from "primereact/breadcrumb";


const VentasPage = () => {
  const items = [{ label: "Ventas" }, { label: "Ventas del Sistema" }];
  const home = { icon: "pi pi-home", url: "/main" };
  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>

      <div>
        <h1>Ventas del Sistema</h1>
      </div>
    </>
  );
};

export default VentasPage;
