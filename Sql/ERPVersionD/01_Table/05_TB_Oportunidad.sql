USE [ERPVersionD]
GO

/****** Object:  Table [dbo].[Oportunidad]    Script Date: 12/11/2024 9:43:22 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Oportunidad]') AND type in (N'U'))
DROP TABLE [dbo].[Oportunidad]
GO

/****** Object:  Table [dbo].[Oportunidad]    Script Date: 12/11/2024 9:43:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Oportunidad](
	[IdOportunidad] [int] IDENTITY(1,1) NOT NULL,
	[NombreContacto] [nvarchar](200) NOT NULL,
	[Empresa] [nvarchar](200) NOT NULL,
	[Telefono] [nvarchar](50) NOT NULL,
	[CorreoElectronico] [nvarchar](100) NOT NULL,
	[Domicilio] [nvarchar](250) NOT NULL,
	[Necesidad] [nvarchar](300) NOT NULL,
	[IdProceso] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdOportunidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


