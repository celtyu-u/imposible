USE [ERPVersionA]
GO

/****** Object:  View [dbo].[Inventory]    Script Date: 12/18/2024 7:10:54 PM ******/
DROP VIEW [dbo].[Inventory]
GO

/****** Object:  View [dbo].[Inventory]    Script Date: 12/18/2024 7:10:54 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

Create view [dbo].[Inventory]
as
select T0.CodigoBarras,T0.Descripcion,T0.InventarioInicial,isnull(T1.Compra,0) Compra,isnull(T3.Entrada,0) Entrada,isnull(T2.Venta,0) Venta
,isnull(T4.Salida,0) Salida, isnull(T1.Compra,0)+isnull(T3.Entrada,0)-isnull(T2.Venta,0)-isnull(T4.Salida,0) Inventario
from Producto T0
left join (
select IdProducto,Sum(Cantidad) Compra
from CompraDetalle
group by IdProducto
) T1 on T0.IdProducto=T1.IdProducto
left join (
select IdProducto,Sum(Cantidad) Venta
from VentaDetalle
group by IdProducto
) T2 on T0.IdProducto=T2.IdProducto
left join (
select IdProducto,Sum(Cantidad) Entrada
from EntradaDetalle
group by IdProducto
) T3 on T0.IdProducto=T3.IdProducto
left join (
select IdProducto,Sum(Cantidad) Salida
from SalidaDetalle
group by IdProducto
) T4 on T0.IdProducto=T4.IdProducto
GO
