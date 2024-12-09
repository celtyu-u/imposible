import React from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { classNames } from "primereact/utils";
import { MegaMenu } from "primereact/megamenu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import iconoVentas from "../../assets/ventas.jpg";
import iconoProductos from "../../assets/productos.jpg";
import iconoBorrar from "../../assets/borra.jpg";
import iconoProveedor from "../../assets/proveedores.jpg";
import iconoCompras from "../../assets/compras.jpg";
import iconoInventario from "../../assets/inventario.jpg";
import iconoSalidas from "../../assets/salidas.jpg";
import iconoEntradas from "../../assets/entradas.jpg";
import iconoEmpleados from "../../assets/empleados.jpg";
import iconoDashboard from "../../assets/dashboard.jpg";
import iconoQuejas from "../../assets/quejas.jpg";

const MainPage = () => {
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
              { label: "Productos" },
              { label: "Ventas" },
              { label: "Cancelación Ventas" },
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
              { label: "Proveedores" },
              { label: "Compras" },
              { label: "Cancelación Compras" },
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
              { label: "Inventario" },
              { label: "Salidas" },
              { label: "Entradas" },
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
            items: [{ label: "Empleados" }],
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
            items: [{ label: "Dashboard" }],
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
            items: [{ label: "Quejas y comentarios" }],
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

      <div className="grid">
        <div className="col-12">
          <h1>PANEL DE CONTROL</h1>
        </div>
      </div>

      <div className="grid">
        <div className="col-4">
          <div className="card-main">
            <div
              className="card-title shadow-2"
              style={{ "background-color": "#4A83F9" }}
            >
              <div className="grid">
                <div className="col-10">VENTAS</div>
                <div className="col-2">
                  <i
                    className="pi pi-cart-plus"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </div>
              </div>
            </div>
            <div className="card-data">
              <div className="grid">
                <div className="col-4 boton-icono">
                  <div>
                    <img src={iconoVentas} alt="" className="icono-imagen" />
                  </div>
                  <div className="title-icon">Ventas</div>
                </div>
                <div className="col-4">
                  <div>
                    <img src={iconoProductos} alt="" className="icono-imagen" />
                  </div>
                  <div className="title-icon">Productos</div>
                </div>
                <div className="col-4">
                  <div>
                    <img src={iconoBorrar} alt="" className="icono-imagen" />
                  </div>
                  <div className="title-icon">Cancelación Ventas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card-main">
            <div
              className="card-title shadow-2"
              style={{ "background-color": "#47C559" }}
            >
              <div className="grid">
                <div className="col-10">COMPRAS</div>
                <div className="col-2">
                  <i className="pi pi-receipt" style={{ fontSize: "2rem" }}></i>
                </div>
              </div>
            </div>
            <div className="card-data">
              <div className="grid">
                <div className="col-4 boton-icono">
                  <div>
                    <img src={iconoProveedor} alt="" className="icono-imagen" />
                  </div>
                  <div className="title-icon">Proveedores</div>
                </div>
                <div className="col-4">
                  <div>
                    <img src={iconoCompras} alt="" className="icono-imagen" />
                  </div>
                  <div className="title-icon">Compras</div>
                </div>
                <div className="col-4">
                  <div>
                    <img src={iconoBorrar} alt="" className="icono-imagen" />
                  </div>
                  <div className="title-icon">Cancelación Compras</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card-main">
            <div
              className="card-title shadow-2"
              style={{ "background-color": "#A456FB" }}
            >
              <div className="grid">
                <div className="col-10">ALMACEN</div>
                <div className="col-2">
                  <i className="pi pi-server" style={{ fontSize: "2rem" }}></i>
                </div>
              </div>
            </div>
            <div className="card-data">
              <div className="grid">
                <div className="col-4 boton-icono">
                  <div>
                    <img
                      src={iconoInventario}
                      alt=""
                      className="icono-imagen"
                    />
                  </div>
                  <div className="title-icon">Inventario</div>
                </div>
                <div className="col-4">
                  <div>
                    <img src={iconoSalidas} alt="" className="icono-imagen" />
                  </div>
                  <div className="title-icon">Salidas</div>
                </div>
                <div className="col-4">
                  <div>
                    <img src={iconoEntradas} alt="" className="icono-imagen" />
                  </div>
                  <div className="title-icon">Entradas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="col-4">
          <div className="card-main">
            <div
              className="card-title shadow-2"
              style={{ "background-color": "#E5B200" }}
            >
              <div className="grid">
                <div className="col-10">RECURSOS H.</div>
                <div className="col-2">
                  <i
                    className="pi pi-cart-plus"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </div>
              </div>
            </div>
            <div className="card-data">
              <div className="grid">
                <div className="col-4 boton-icono">
                </div>
                <div className="col-4">
                  <div>
                    <img src={iconoEmpleados} alt="" className="icono-imagen" />
                  </div>
                  <div className="title-icon">Empleados</div>
                </div>
                <div className="col-4">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card-main">
            <div
              className="card-title shadow-2"
              style={{ "background-color": "#E54240" }}
            >
              <div className="grid">
                <div className="col-10">FINANZAS</div>
                <div className="col-2">
                  <i className="pi pi-chart-bar" style={{ fontSize: "2rem" }}></i>
                </div>
              </div>
            </div>
            <div className="card-data">
              <div className="grid">
                <div className="col-4 boton-icono">
                </div>
                <div className="col-4">
                  <div>
                    <img src={iconoDashboard} alt="" className="icono-imagen" />
                  </div>
                  <div className="title-icon">Dashboard Sistema</div>
                </div>
                <div className="col-4">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card-main">
            <div
              className="card-title shadow-2"
              style={{ "background-color": "#6C7281" }}
            >
              <div className="grid">
                <div className="col-10">ATENCIÓN A C.</div>
                <div className="col-2">
                  <i className="pi pi-server" style={{ fontSize: "2rem" }}></i>
                </div>
              </div>
            </div>
            <div className="card-data">
              <div className="grid">
                <div className="col-4 boton-icono">
                </div>
                <div className="col-4">
                  <div>
                    <img src={iconoQuejas} alt="" className="icono-imagen" />
                  </div>
                  <div className="title-icon">Quejas y comentarios</div>
                </div>
                <div className="col-4">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
