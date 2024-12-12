USE [ERPVersionD]
GO

/****** Object:  Table [dbo].[Cliente]    Script Date: 12/11/2024 7:58:05 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Cliente]') AND type in (N'U'))
DROP TABLE [dbo].[Cliente]
GO

/****** Object:  Table [dbo].[Cliente]    Script Date: 12/11/2024 7:58:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Cliente](
	[IdCliente] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](150) NOT NULL,
	[Celular] [nvarchar](20) NOT NULL,
	[CorreoElectronico] [nvarchar](100) NOT NULL,
	[Domicilio] [nvarchar](250) NOT NULL,
	[RFC] [nvarchar](50) NOT NULL,
	[IdTipoCliente] [int] NOT NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[IdCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


