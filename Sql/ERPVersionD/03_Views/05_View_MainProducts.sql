USE [ERPVersionD]
GO

/****** Object:  View [dbo].[MainProducts]    Script Date: 12/19/2024 9:27:33 PM ******/
if exists(select 1 from sysobjects where name='MainProducts')
begin
   DROP VIEW [dbo].[MainProducts]
end
GO

/****** Object:  View [dbo].[MainProducts]    Script Date: 12/19/2024 9:27:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create view [dbo].[MainProducts]
as
select top 10 pro.IdProducto,pro.CodigoBarras,max(pro.Descripcion) Descripcion,sum(det.Cantidad) Cantidad,sum(det.TotalDet) Importe, sum((det.Cantidad*det.Precio)-((det.Cantidad*pro.Costo))) Utilidad
from Venta ven 
inner join VentaDetalle det
on ven.IdVenta=det.IdVenta
inner join Producto pro
on pro.IdProducto=det.IdProducto
group by pro.IdProducto,pro.CodigoBarras
order by sum((det.Cantidad*det.Precio)-((det.Cantidad*pro.Costo))) desc
GO


