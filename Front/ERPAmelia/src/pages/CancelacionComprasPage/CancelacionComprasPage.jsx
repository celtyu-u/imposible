import "./CancelacionComprasPage.css";
import { BreadCrumb } from "primereact/breadcrumb";


const CancelacionComprasPage = () => {
  const items = [{ label: "Compras" }, { label: "Cancelación de Compras" }];
  const home = { icon: "pi pi-home", url: "/main" };

  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Cancelación de Compras</h1>
      </div>
    </>
  );
};

export default CancelacionComprasPage;
