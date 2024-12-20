USE [ERPVersionD]
GO

/****** Object:  View [dbo].[MainDatas]    Script Date: 12/19/2024 9:14:42 PM ******/

if exists(select 1 from sysobjects where name='MainDatas')
begin
    DROP VIEW [dbo].[MainDatas]
end
GO

/****** Object:  View [dbo].[MainDatas]    Script Date: 12/19/2024 9:14:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create view [dbo].[MainDatas]
as
select sum((det.Cantidad*det.Precio)-(det.Cantidad*pro.Costo)) Utilidad,
Round(((sum((det.Cantidad*det.Precio)-(det.Cantidad*pro.Costo))/23000)-1)*100,2) Porcentaje,
sum(det.Cantidad) Cantidad,
sum(case when ven.Fecha>'20241215' then det.Cantidad else 0 end) CantidadUS,
round(sum(det.TotalDet)/200000*100,2) Meta
from Venta ven
inner join VentaDetalle det
on ven.IdVenta=det.IdVenta
inner join Producto pro
on pro.IdProducto=det.IdProducto
GO


