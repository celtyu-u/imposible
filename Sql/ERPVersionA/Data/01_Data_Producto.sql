/*
  IdTipoProducto
  1- Tequila
  2- Rones
  3- Whiskies
  4- Vinos
  5- Cerveza
  6- Vodkas
  7- Mezcales
*/

INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioInicial, IdTipoProducto)
VALUES
('7501000135402', 'Tequila Don Julio Reposado 750ml', 899.50, 50, 1),
('7503000135607', 'Ron Bacardí Carta Blanca 1L', 289.00, 100, 2),
('7504000135708', 'Whisky Johnnie Walker Black Label 700ml', 849.00, 35, 3),
('7505000135804', 'Vino Tinto Casillero del Diablo Cabernet Sauvignon 750ml', 199.00, 75, 4),
('7506000135906', 'Cerveza Corona Extra 355ml (12 pack)', 240.00, 200, 5),
('7507000136009', 'Vodka Absolut Original 750ml', 459.00, 80, 6),
('7508000136103', 'Mezcal 400 Conejos Joven Espadín 750ml', 499.00, 60, 7),
('7509000136208', 'Tequila Herradura Añejo 750ml', 1025.00, 40, 1),
('7510000136301', 'Ron Zacapa Centenario 23 Años 750ml', 1200.00, 20, 2),
('7511000136405', 'Whisky Jack Daniels Tennessee Honey 750ml', 565.00, 90, 3)


INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioInicial, IdTipoProducto)
VALUES
('7512000145409', 'Tequila José Cuervo Tradicional Plata 700ml', 379.00, 60, 1),
('7513000145504', 'Ron Matusalem Clásico 10 Años 750ml', 420.00, 45, 2),
('7514000145608', 'Whisky Glenlivet 12 Años Single Malt 750ml', 1150.00, 30, 3),
('7515000145701', 'Vino Blanco Concha y Toro Sauvignon Blanc 750ml', 170.00, 50, 4),
('7516000145805', 'Cerveza Heineken 355ml (6 pack)', 150.00, 150, 5),
('7517000145908', 'Vodka Grey Goose Original 750ml', 890.00, 25, 6),
('7518000146002', 'Mezcal Montelobos Espadín Joven 750ml', 620.00, 40, 7),
('7519000146106', 'Tequila Centenario Reposado 950ml', 480.00, 70, 1),
('7520000146200', 'Ron Flor de Caña 12 Años 750ml', 870.00, 35, 2),
('7521000146304', 'Whisky Macallan Double Cask 12 Años 750ml', 1950.00, 20, 3)

 
/*
creame 10 datos dummy para la siguiente tabla, el precio debe ser en pesos mexicanos, los productos deben ser de vinos y licores, la definición es: CREATE TABLE [dbo].[Producto]( [IdProducto] [int] IDENTITY(1, 1) NOT NULL, [CodigoBarras] [nvarchar](13) NOT NULL, [Descripcion] [nvarchar](200) NOT NULL, [Precio] [numeric](18, 2) NOT NULL, [InventarioInicial] [numeric](18, 0) NOT NULL, [IdTipoProducto] [int] NOT NULL, CONSTRAINT [PK_Producto] PRIMARY KEY CLUSTERED ) debes considerar el siguiente catálogo para los idTipoProducto : IdTipoProducto 1- Tequila 2- Rones 3- Whiskies 4- Vinos 5- Cerveza 6- Vodkas 7- Mezcales
*/