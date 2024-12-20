/*
  IdTipoFamilia
  1. Alimentos y Bebidas
  2. Productos de Limpieza
  3. Higiene y Cuidado Personal
  4. Carnicería y Embutidos (si aplica)
  5. Verduras y Frutas
  6. Congelados
  7. Bebidas Alcohólicas (si aplica)
  8. Otros
  9. Artículos para Mascotas
 10. Productos Naturales y Orgánicos
 11. Utensilios de Cocina
 12. Medicamentos
 13. Productos para Bebés
 14. Electrónicos y Accesorios
*/

INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioBase, IdTipoFamilia, Costo)
VALUES 
('7891234567890', 'Harina de trigo, marca La Estrella', 25.50, 500, 1, 20.00),
('4567891234567', 'Detergente líquido, aroma cítrico', 42.99, 200, 2, 35.00),
('1234567890123', 'Jabón de baño, marca "Natura"', 18.75, 350, 3, 15.00),
('9876543210987', 'Filete de res, corte Ribeye', 220.00, 100, 4, 180.00),
('3456789012345', 'Manzana roja, variedad Fuji', 15.00, 250, 5, 10.00),
('2345678901234', 'Pizza congelada, sabor pepperoni', 89.99, 150, 6, 75.00),
('5678901234567', 'Cerveza clara, marca "Corona"', 22.50, 300, 7, 18.00),
('8765432109876', 'Alimento para perro, raza pequeña', 120.00, 100, 9, 90.00),
('1012131415161', 'Leche de almendras, sin azúcar', 35.99, 180, 10, 30.00),
('7654321098765', 'Olla de acero inoxidable, 5 litros', 499.00, 50, 11, 400.00)

INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioBase, IdTipoFamilia, Costo)
VALUES
('6543210987654', 'Café soluble, marca Nescafé', 85.99, 400, 1, 70.00),
('2109876543210', 'Atún en lata, al natural', 22.50, 300, 1, 18.00),
('9876543210987', 'Galletas saladas, marca SensaChips', 32.99, 500, 1, 25.00),
('1234567890123', 'Jabón en polvo, marca Ariel', 55.00, 250, 2, 45.00),
('4567891234567', 'Shampoo para cabello seco', 110.00, 150, 3, 90.00),
('7890123456789', 'Carne molida de res', 180.00, 200, 4, 150.00),
('3456789012345', 'Tomate rojo, variedad bola', 12.00, 350, 5, 8.00),
('5678901234567', 'Helado de chocolate, 1 litro', 59.99, 200, 6, 45.00),
('8765432109876', 'Vino tinto, variedad Cabernet Sauvignon', 150.00, 100, 7, 120.00),
('0123456789012', 'Semillas de girasol', 30.00, 250, 10, 25.00)


INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioBase, IdTipoFamilia, Costo)
VALUES
('1112223334444', 'Pasta spaghetti, marca La Moderna', 18.99, 600, 1, 15.00),
('5556667778888', 'Arroz blanco, grano largo', 25.50, 800, 1, 20.00),
('9998887776666', 'Frijoles negros en lata', 16.50, 500, 1, 13.00),
('3332221110000', 'Limpiador multiusos', 39.99, 300, 2, 32.00),
('7778889990000', 'Suavizante de telas, aroma floral', 45.99, 250, 2, 38.00),
('2221110003333', 'Papel higiénico, 4 rollos', 28.50, 400, 3, 23.00),
('6667778889999', 'Chuleta de cerdo', 140.00, 150, 4, 110.00),
('0001112223333', 'Zanahoria, paquete', 10.50, 500, 5, 8.00),
('4445556667777', 'Helado de vainilla, 1 litro', 55.99, 200, 6, 42.00),
('8889990001111', 'Cerveza oscura, marca Indio', 24.50, 300, 7, 19.00)


INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioBase, IdTipoFamilia, Costo)
VALUES
('0001112223333', 'Leche entera, marca Lala', 18.50, 800, 1, 15.00),
('3332221110000', 'Yogurt griego, sabor natural', 22.99, 400, 1, 18.00),
('5556667778888', 'Pan blanco, de molde', 15.99, 600, 1, 12.00),
('7778889990000', 'Detergente en polvo, marca Ariel', 49.99, 350, 2, 40.00),
('9998887776666', 'Suavizante concentrado, aroma lavanda', 38.50, 200, 2, 30.00),
('1112223334444', 'Jabón líquido para manos, antibacterial', 25.99, 500, 3, 20.00),
('2221110003333', 'Pañales desechables, talla M', 180.00, 250, 13, 150.00),
('6667778889999', 'Pollo entero, fresco', 90.00, 100, 4, 75.00),
('8889990001111', 'Manzana verde, Granny Smith', 12.50, 400, 5, 10.00),
('4445556667777', 'Pizza congelada, cuatro quesos', 79.99, 150, 6, 65.00)


INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioBase, IdTipoFamilia, Costo)
VALUES
('1234567890123', 'Avena instantánea, sabor a manzana', 29.99, 500, 1, 25.00),
('4567891234567', 'Jugo de naranja, 1 litro', 19.50, 800, 1, 16.00),
('7890123456789', 'Galletas integrales, sin azúcar', 35.99, 300, 1, 30.00),
('0123456789012', 'Detergente para platos, limón', 28.50, 400, 2, 23.00),
('3456789012345', 'Suavizante concentrado, aroma bebé', 42.99, 250, 2, 35.00),
('6789012345678', 'Papel toalla, tamaño jumbo', 39.99, 300, 3, 32.00),
('9012345678901', 'Salchichas de pavo', 95.00, 150, 4, 80.00),
('2345678901234', 'Lechuga romana, pieza', 18.00, 200, 5, 15.00),
('5678901234567', 'Helado de coco, 1 litro', 62.99, 100, 6, 50.00),
('8901234567890', 'Cerveza artesanal, IPA', 35.00, 150, 7, 28.00)



 
/*
creame 10 datos dummy para la siguiente tabla, el precio debe ser en pesos mexicanos, los productos deben ser de abarrotes, la definición es: 
CREATE TABLE [dbo].[Producto](
	[IdProducto] [int] IDENTITY(1,1) NOT NULL,
	[CodigoBarras] [nvarchar](13) NULL,
	[Descripcion] [nvarchar](200) NULL,
	[Precio] [numeric](18, 2) NULL,
	[InventarioBase] [numeric](18, 0) NULL,
	[IdTipoFamilia] [int] NULL,
	[Costo] [numeric](18, 2) NULL)
debes considerar el siguiente catálogo para los idTipoFamilia :   idTipoFamilia
  1. Alimentos y Bebidas
  2. Productos de Limpieza
  3. Higiene y Cuidado Personal
  4. Carnicería y Embutidos (si aplica)
  5. Verduras y Frutas
  6. Congelados
  7. Bebidas Alcohólicas (si aplica)
  8. Otros
  9. Artículos para Mascotas
 10. Productos Naturales y Orgánicos
 11. Utensilios de Cocina
 12. Medicamentos
 13. Productos para Bebés
 14. Electrónicos y Accesorios
*/