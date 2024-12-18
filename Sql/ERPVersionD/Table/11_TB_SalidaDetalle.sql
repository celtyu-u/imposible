USE [ERPVersionA]
GO

/****** Object:  Table [dbo].[SalidaDetalle]    Script Date: 12/12/2024 5:32:19 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SalidaDetalle]') AND type in (N'U'))
DROP TABLE [dbo].[SalidaDetalle]
GO

/****** Object:  Table [dbo].[SalidaDetalle]    Script Date: 12/12/2024 5:32:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SalidaDetalle](
	[IdSalidaDetalle] [int] IDENTITY(1,1) NOT NULL,
	[IdSalida] [int] NOT NULL,
	[IdProducto] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[Costo] [numeric](18, 2) NOT NULL,
	[TotalDet] [numeric](18, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdSalidaDetalle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

