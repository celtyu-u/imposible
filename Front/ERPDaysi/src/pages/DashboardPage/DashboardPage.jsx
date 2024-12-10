import "./DashboardPage.css";
import { BreadCrumb } from "primereact/breadcrumb";

const DashboardPage = () => {
  const items = [{ label: "Finanzas" }, { label: "Dashboard" }];
  const home = { icon: "pi pi-home", url: "/main" };
  return (
    <>
      <div>
        <BreadCrumb model={items} home={home} />
      </div>
      <div>
        <h1>Dashboard Sistema</h1>
      </div>
    </>
  );
};

export default DashboardPage;
