import React from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { classNames } from "primereact/utils";
import { MegaMenu } from 'primereact/megamenu';
import "./MainPage.css";


const MainPage = () => {

    const items = [
        {
            label: 'Ventas',
            icon: 'pi pi-cart-plus',
            items: [
                [
                    {
                        label: 'Módulos',
                        items: [{ label: 'Alta de Producto' }, { label: 'Ventas' }, { label: 'Cancelación Ventas' }]
                    }
                ]
            ]
        },
        {
            label: 'Compras',
            icon: 'pi pi-receipt',
            items: [
                [
                    {
                        label: 'Módulos',
                        items: [{ label: 'Proveedores' }, { label: 'Compras' }, { label: 'Cancelación Compras' }]
                    }
                ]
            ]
        },
        {
            label: 'Almacen',
            icon: 'pi pi-server',
            items: [
                [
                    {
                        label: 'Módulos',
                        items: [{ label: 'Inventario' }, { label: 'Salidas' }, { label: 'Entradas' }]
                    }
                ]
            ]
        },
        {
            label: 'Recursos Humanos',
            icon: 'pi pi-users',
            items: [
                [
                    {
                        label: 'Módulos',
                        items: [{ label: 'Empleados' }]
                    }
                ]
            ]
        },
        {
            label: 'Finanzas',
            icon: 'pi pi-users',
            items: [
                [
                    {
                        label: 'Módulos',
                        items: [{ label: 'Reporte Ingresos' }]
                    }
                ]
            ]
        },
        {
            label: 'Atención Clientes',
            icon: 'pi pi-users',
            items: [
                [
                    {
                        label: 'Módulos',
                        items: [{ label: 'Quejas y comentarios' }]
                    }
                ]
            ]
        },
    ];



  return (
    <>
      <div className="grid">
        <div className="col-2">
             <p className="title-main">
                ERP DAYSI
             </p>
        </div>
        <div className="col-7">
        <div className="card">
            <MegaMenu model={items} breakpoint="560px" />
        </div>

        </div>
        <div className="col-3">

        </div>
      </div>
    </>
  );
};

export default MainPage;
