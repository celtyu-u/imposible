import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import DataMainPage from './pages/DataMainPage/DataMainPage';

import CancelacionComprasPage from './pages/CancelacionComprasPage/CancelacionComprasPage';
import CancelacionVentaPage from './pages/CancelacionVentaPage/CancelacionVentaPage';
import ClientePage from './pages/ClientePage/ClientePage';
import CompraPage from './pages/CompraPage/CompraPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EmpleadoPage from './pages/EmpleadoPage/EmpleadoPage';
import EntradaPage from './pages/EntradaPage/EntradaPage';
import InventariosPage from './pages/InventariosPage/InventariosPage';
import ProductoPage from './pages/ProductoPage/ProductoPage';
import ProveedorPage from './pages/ProveedorPage/ProveedorPage';
import QuejaPage from './pages/QuejaPage/QuejaPage';
import SalidaPage from './pages/SalidaPage/SalidaPage';
import VentaPage from './pages/VentaPage/VentaPage';
import CuentaProveedorPage from './pages/CuentaProveedorPage/CuentaProveedorPage';
import { BlockUI } from "primereact/blockui";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [blockedScreen, setBblockedScreen] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/main" element={<MainPage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} ><DataMainPage/></MainPage>} />
          <Route path="/cancelacion-compras" element={<MainPage><CancelacionComprasPage/></MainPage>} />
          <Route path="/cancelacion-ventas" element={<MainPage><CancelacionVentaPage/></MainPage>} />
          <Route path="/clientes" element={<MainPage><ClientePage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen}/></MainPage>} />
          <Route path="/compras" element={<MainPage><CompraPage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen}/></MainPage>} />
          <Route path="/dashboard" element={<MainPage><DashboardPage/></MainPage>} />
          <Route path="/empleados" element={<MainPage><EmpleadoPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen}/></MainPage>} />
          <Route path="/entradas" element={<MainPage><EntradaPage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen}/></MainPage>} />
          <Route path="/inventarios" element={<MainPage><InventariosPage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen}/></MainPage>} />
          <Route path="/productos" element={<MainPage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen}><ProductoPage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen}/></MainPage>} />
          <Route path="/proveedores" element={<MainPage><ProveedorPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/quejas-comentarios" element={<MainPage><QuejaPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen}/></MainPage>} />
          <Route path="/salidas" element={<MainPage><SalidaPage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/ventas" element={<MainPage><VentaPage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen}/></MainPage>} />
          <Route path="/cuenta-proveedor" element={<MainPage><CuentaProveedorPage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
