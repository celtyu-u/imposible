USE [ERPVersionD]
GO

/****** Object:  View [dbo].[MainInventories]    Script Date: 12/19/2024 9:24:25 PM ******/

if exists(select 1 from sysobjects where name='MainInventories')
begin
   DROP VIEW [dbo].[MainInventories]
end
GO

/****** Object:  View [dbo].[MainInventories]    Script Date: 12/19/2024 9:24:25 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create view [dbo].[MainInventories]
as
select sum(Compra) Compras,sum(Entrada) Entradas, sum(Venta) Ventas,Sum(Salida) Salidas from Inventory
GO
