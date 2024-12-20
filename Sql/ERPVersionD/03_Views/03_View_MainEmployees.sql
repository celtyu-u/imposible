USE [ERPVersionD]
GO

/****** Object:  View [dbo].[MainEmployees]    Script Date: 12/19/2024 9:20:41 PM ******/
if exists(select 1 from sysobjects where name='MainEmployees')
begin
   DROP VIEW [dbo].[MainEmployees]
end
GO

/****** Object:  View [dbo].[MainEmployees]    Script Date: 12/19/2024 9:20:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create view [dbo].[MainEmployees]
as
select top 3 ven.IdCliente,cli.Nombre, sum(det.TotalDet) Importe
from Venta ven 
inner join VentaDetalle det
on ven.IdVenta=det.IdVenta
inner join Producto pro
on pro.IdProducto=det.IdProducto
inner join Cliente cli
on cli.IdCliente=ven.IdCliente
group by ven.IdCliente,cli.Nombre
order by sum(det.TotalDet) desc
GO


