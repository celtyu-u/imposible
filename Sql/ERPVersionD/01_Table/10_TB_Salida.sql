USE [ERPVersionD]
GO

/****** Object:  Table [dbo].[Salida]    Script Date: 12/12/2024 5:32:14 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Salida]') AND type in (N'U'))
DROP TABLE [dbo].[Salida]
GO

/****** Object:  Table [dbo].[Salida]    Script Date: 12/12/2024 5:32:14 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Salida](
	[IdSalida] [int] IDENTITY(1,1) NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[IdEmpleado] [int] NOT NULL,
	[Comentario] [nvarchar](250) NOT NULL,
	[Total] [numeric](18, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdSalida] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


