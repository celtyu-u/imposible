USE [ERPVersionA]
GO

/****** Object:  Table [dbo].[Producto]    Script Date: 08/12/2024 06:51:42 p. m. ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Producto]') AND type in (N'U'))
DROP TABLE [dbo].[Producto]
GO

/****** Object:  Table [dbo].[Producto]    Script Date: 08/12/2024 06:51:42 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Producto](
	[IdProducto] [int] IDENTITY(1,1) NOT NULL,
	[CodigoBarras] [nvarchar](13) NOT NULL,
	[Descripcion] [nvarchar](200) NOT NULL,
	[Precio] [numeric](18, 2) NOT NULL,
	[InventarioInicial] [numeric](18, 0) NOT NULL,
	[IdTipoProducto] [int] NOT NULL,
 CONSTRAINT [PK_Producto] PRIMARY KEY CLUSTERED 
(
	[IdProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


