import "./EmpleadosPage.css";
import { BreadCrumb } from "primereact/breadcrumb";


const EmpleadosPage = () => {
  const items = [{ label: "Recursos Humanos" }, { label: "Catálogo de Empleados" }];
  const home = { icon: "pi pi-home", url: "/main" };
  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Catálogo de Empleados</h1>
      </div>
    </>
  );
};

export default EmpleadosPage;
