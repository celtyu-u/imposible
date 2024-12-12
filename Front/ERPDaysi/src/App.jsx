import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './pages/LoginPage/LoginPage'
import MainPage from './pages/MainPage/MainPage'
import DataMainPage from './pages/DataMain/DataMainPage'
import './App.css'

import CancelacionComprasPage from './pages/CancelacionComprasPage/CancelacionComprasPage';
import CancelacionVentaPage from './pages/CancelacionVentaPage/CancelacionVentaPage';
import ClientePage from './pages/ClientePage/ClientePage';
import ComprasPage from './pages/ComprasPage/ComprasPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EmpleadoPage from './pages/EmpleadoPage/EmpleadoPage';
import EntradasPage from './pages/EntradasPage/EntradasPage';
import InventariosPage from './pages/InventariosPage/InventariosPage';
import ProductoPage from './pages/ProductoPage/ProductoPage';
import ProveedorPage from './pages/ProveedorPage/ProveedorPage';
import OportunidadPage from './pages/OportunidadPage/OportunidadPage';
import SalidasPage from './pages/SalidasPage/SalidasPage';
import VentasPage from './pages/VentasPage/VentasPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [blockedScreen, setBblockedScreen] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen}><DataMainPage/></MainPage>} />
          <Route path="/cancelacion-compras" element={<MainPage><CancelacionComprasPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/cancelacion-ventas" element={<MainPage><CancelacionVentaPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/compras" element={<MainPage><ComprasPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/dashboard" element={<MainPage><DashboardPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/empleados" element={<MainPage><EmpleadoPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/entradas" element={<MainPage><EntradasPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/inventarios" element={<MainPage><InventariosPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/productos" element={<MainPage><ProductoPage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/proveedores" element={<MainPage><ProveedorPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/oportunidades" element={<MainPage><OportunidadPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/salidas" element={<MainPage><SalidasPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/ventas" element={<MainPage><VentasPage  blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
          <Route path="/clientes" element={<MainPage><ClientePage blockedScreen={blockedScreen} setBblockedScreen={setBblockedScreen} /></MainPage>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
