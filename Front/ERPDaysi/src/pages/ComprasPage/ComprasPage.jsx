import "./ComprasPage.css";
import { BreadCrumb } from "primereact/breadcrumb";


const ComprasPage = () => {
  const items = [{ label: "Compras" }, { label: "Compras de Producto" }];
  const home = { icon: "pi pi-home", url: "/main" };
  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Compras de Producto</h1>
      </div>
    </>
  );
};

export default ComprasPage;
