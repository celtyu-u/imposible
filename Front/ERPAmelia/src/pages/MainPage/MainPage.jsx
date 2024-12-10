import React from "react";
import { InputText } from "primereact/inputtext";
import "./MainPage.css";
import logoERP from "../../assets/LogoERP.png";
import { PanelMenu } from "primereact/panelmenu";
import iconoUser from "../../assets/user.png";
import { useNavigate } from "react-router-dom";

const MainPage = ({ children }) => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Ventas",
      icon: "pi pi-cart-plus",
      items: [
        {
          label: "Productos",
          command: () => {
            navigate("/productos");
          },
        },
        {
          label: "Ventas",
          command: () => {
            navigate("/ventas");
          },
        },
        {
          label: "Clientes",
          command: () => {
            navigate("/clientes");
          },
        },
      ],
    },
    {
      label: "Compras",
      icon: "pi pi-receipt",
      items: [
        {
          label: "Proveedores",
          command: () => {
            navigate("/proveedores");
          },
        },
        {
          label: "Compras",
          command: () => {
            navigate("/compras");
          },
        },
        {
          label: "Cancelación Compras",
          command: () => {
            navigate("/cancelacion-compras");
          },
        },
      ],
    },
    {
      label: "Recursos Humanos",
      icon: "pi pi-users",
      items: [
        {
          label: "Empleados",
          command: () => {
            navigate("/empleados");
          },
        },
      ],
    },
    {
      label: "Almacen",
      icon: "pi pi-server",
      items: [
        {
          label: "Inventario",
          command: () => {
            navigate("/inventarios");
          },
        },
        {
          label: "Salidas",
          command: () => {
            navigate("/salidas");
          },
        },
        {
          label: "Entradas",
          command: () => {
            navigate("/entradas");
          },
        },
      ],
    },
    {
      label: "Finanzas",
      icon: "pi pi-chart-bar",
      items: [
        {
          label: "Dashboard",
          command: () => {
            navigate("/dashboard");
          },
        },
      ],
    },
    {
      label: "Atención Clientes",
      icon: "pi pi-users",
      items: [{ 
        label: "Quejas y comentarios",
        command: () => {
          navigate("/quejas-comentarios");
        },
       }],
    },
    {
      label: "Sesión",
      icon: "pi pi-cog",
      items: [{ 
        label: "Cerrar Sesión",
        command: () => {
          navigate("/login");
        },
       }],
    },
  ];

  return (
    <>
      <div className="grid">
        <div className="col-2">
          <div>
            {/* <i className="pi pi-check" style={{ color: 'white' }}></i> */}
            <img src={logoERP} alt="" className="logo-erp" />
          </div>

          <h1>ERP AMELIA</h1>
          <div>
            <PanelMenu model={items} />
          </div>
        </div>
        <div className="col-9">
          <div>
            <div className="grid">
              <div className="col-9">
                <h1></h1>
              </div>
              <div className="col-3 d-flex">
                <div>
                  {/* <img src={iconoUser} alt="" className="icono-navbar" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="icon-user"
                  >
                    <path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z" />
                  </svg>
                </div>
                <div>
                  <div className="title-user">Amelia Gonzalez</div>
                  <div className="rol-user">Administrador</div>
                </div>
              </div>
            </div>
            <hr />
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
