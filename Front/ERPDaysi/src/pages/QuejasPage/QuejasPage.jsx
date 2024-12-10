import "./QuejasPage.css";
import { BreadCrumb } from "primereact/breadcrumb";

const QuejasPage = () => {
  const items = [
    { label: "Atención Clientes" },
    { label: "Quejas y Sugerencias" },
  ];
  const home = { icon: "pi pi-home", url: "/main" };
  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Quejas y Sugerencias</h1>
      </div>
    </>
  );
};

export default QuejasPage;
