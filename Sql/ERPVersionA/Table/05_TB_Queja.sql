USE [ERPVersionA]
GO

/****** Object:  Table [dbo].[Queja]    Script Date: 12/11/2024 2:51:06 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Queja]') AND type in (N'U'))
DROP TABLE [dbo].[Queja]
GO

/****** Object:  Table [dbo].[Queja]    Script Date: 12/11/2024 2:51:06 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Queja](
	[IdQueja] [int] IDENTITY(1,1) NOT NULL,
	[Proceso] [nvarchar](100) NOT NULL,
	[Queja] [nvarchar](250) NOT NULL,
	[Solucion] [nvarchar](250) NOT NULL,
	[IdCliente] [int] NOT NULL,
	[IdPrioridad] [int] NOT NULL,
	[IdEstatus] [int] NOT NULL,
 CONSTRAINT [PK_Queja] PRIMARY KEY CLUSTERED 
(
	[IdQueja] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
