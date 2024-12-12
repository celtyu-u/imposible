USE [ERPVersionD]
GO

/****** Object:  Table [dbo].[Producto]    Script Date: 12/11/2024 6:59:05 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Producto]') AND type in (N'U'))
DROP TABLE [dbo].[Producto]
GO

/****** Object:  Table [dbo].[Producto]    Script Date: 12/11/2024 6:59:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Producto](
	[IdProducto] [int] IDENTITY(1,1) NOT NULL,
	[CodigoBarras] [nvarchar](13) NULL,
	[Descripcion] [nvarchar](200) NULL,
	[Precio] [numeric](18, 2) NULL,
	[InventarioBase] [numeric](18, 0) NULL,
	[IdTipoFamilia] [int] NULL,
	[Costo] [numeric](18, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


