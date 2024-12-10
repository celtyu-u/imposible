import "./ProductoPage.css";
import { BreadCrumb } from "primereact/breadcrumb";

const ProductoPage = () => {
  const items = [{ label: "Ventas" }, { label: "Productos" }];
  const home = { icon: "pi pi-home", url: "/main" };

  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Catálogo de Productos</h1>
      </div>
    </>
  );
};

export default ProductoPage;
