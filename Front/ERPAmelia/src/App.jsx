import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import DataMainPage from './pages/DataMainPage/DataMainPage';

import CancelacionComprasPage from './pages/CancelacionComprasPage/CancelacionComprasPage';
import CancelacionVentaPage from './pages/CancelacionVentaPage/CancelacionVentaPage';
import ClientesPage from './pages/ClientesPage/ClientesPage';
import ComprasPage from './pages/ComprasPage/ComprasPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EmpleadosPage from './pages/EmpleadosPage/EmpleadosPage';
import EntradasPage from './pages/EntradasPage/EntradasPage';
import InventariosPage from './pages/InventariosPage/InventariosPage';
import ProductoPage from './pages/ProductoPage/ProductoPage';
import ProveedoresPage from './pages/ProveedoresPage/ProveedoresPage';
import QuejasPage from './pages/QuejasPage/QuejasPage';
import SalidasPage from './pages/SalidasPage/SalidasPage';
import VentasPage from './pages/VentasPage/VentasPage';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/main" element={<MainPage><DataMainPage/></MainPage>} />
          <Route path="/cancelacion-compras" element={<MainPage><CancelacionComprasPage/></MainPage>} />
          <Route path="/cancelacion-ventas" element={<MainPage><CancelacionVentaPage/></MainPage>} />
          <Route path="/clientes" element={<MainPage><ClientesPage/></MainPage>} />
          <Route path="/compras" element={<MainPage><ClientesPage/></MainPage>} />
          <Route path="/dashboard" element={<MainPage><DashboardPage/></MainPage>} />
          <Route path="/empleados" element={<MainPage><EmpleadosPage/></MainPage>} />
          <Route path="/entradas" element={<MainPage><EntradasPage/></MainPage>} />
          <Route path="/inventarios" element={<MainPage><InventariosPage/></MainPage>} />
          <Route path="/productos" element={<MainPage><ProductoPage/></MainPage>} />
          <Route path="/proveedores" element={<MainPage><ProveedoresPage/></MainPage>} />
          <Route path="/quejas-comentarios" element={<MainPage><QuejasPage/></MainPage>} />
          <Route path="/salidas" element={<MainPage><SalidasPage/></MainPage>} />
          <Route path="/ventas" element={<MainPage><VentasPage/></MainPage>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
