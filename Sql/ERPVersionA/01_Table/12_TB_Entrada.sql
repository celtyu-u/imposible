USE [ERPVersionA]
GO

/****** Object:  Table [dbo].[Entrada]    Script Date: 12/12/2024 5:34:07 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Entrada]') AND type in (N'U'))
DROP TABLE [dbo].[Entrada]
GO

/****** Object:  Table [dbo].[Entrada]    Script Date: 12/12/2024 5:34:07 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Entrada](
	[IdEntrada] [int] IDENTITY(1,1) NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[IdEmpleado] [int] NOT NULL,
	[Comentario] [nvarchar](250) NOT NULL,
	[Total] [numeric](18, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdEntrada] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


