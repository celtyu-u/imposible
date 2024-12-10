import React from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { classNames } from "primereact/utils";
import { MegaMenu } from "primereact/megamenu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = ({ children }) => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Ventas",
      icon: "pi pi-cart-plus",
      items: [
        [
          {
            label: "Módulos",
            items: [
              {
                label: "Productos",
                command: () => {
                  navigate("/productos");
                },
              },
              {
                label: "Ventas del Sistema",
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
        ],
      ],
    },
    {
      label: "Compras",
      icon: "pi pi-receipt",
      items: [
        [
          {
            label: "Módulos",
            items: [
              {
                label: "Proveedores",
                command: () => {
                  navigate("/proveedores");
                },
              },
              {
                label: "Compras de Producto",
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
        ],
      ],
    },
    {
      label: "Almacen",
      icon: "pi pi-server",
      items: [
        [
          {
            label: "Módulos",
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
        ],
      ],
    },
    {
      label: "Recursos Humanos",
      icon: "pi pi-users",
      items: [
        [
          {
            label: "Módulos",
            items: [
              {
                label: "Empleados",
                command: () => {
                  navigate("/empleados");
                },
              },
            ],
          },
        ],
      ],
    },
    {
      label: "Finanzas",
      icon: "pi pi-chart-bar",
      items: [
        [
          {
            label: "Módulos",
            items: [
              {
                label: "Dashboard",
                command: () => {
                  navigate("/dashboard");
                },
              },
            ],
          },
        ],
      ],
    },
    {
      label: "Atención Clientes",
      icon: "pi pi-users",
      items: [
        [
          {
            label: "Módulos",
            items: [
              {
                label: "Quejas y comentarios",
                command: () => {
                  navigate("/quejas-comentarios");
                },
              },
            ],
          },
        ],
      ],
    },
  ];

  const goLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="grid">
        <div className="col-2">
          <p className="title-main">ERP DAYSI</p>
        </div>
        <div className="col-8">
          <div className="card">
            <MegaMenu model={items} breakpoint="560px" />
          </div>
        </div>
        <div className="col-2">
          <Button
            icon="pi pi-sign-out"
            onClick={goLogin}
            tooltip="Cerrar Sesión"
            rounded
            text
            aria-label="Filter"
          />
        </div>
      </div>
      <hr className="hr-blue" />
      <div>{children}</div>
    </>
  );
};

export default MainPage;
