/*
  IdTipoProducto
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
INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioInicial, IdTipoProducto)
VALUES 
('7501027380016', 'Arroz Blanco 1kg', 25.50, 150, 1),
('7501065702921', 'Aceite de Cocina 1L', 40.00, 100, 1),
('7501013100912', 'Frijoles Negros 900g', 28.90, 80, 1),
('7501031410084', 'Detergente en Polvo 1kg', 55.00, 50, 2),
('7501026031842', 'Papel Higiénico 4 rollos', 35.00, 120, 3),
('7501059291128', 'Jamón de Pavo 500g', 85.00, 60, 4),
('7501013105016', 'Manzanas Rojas 1kg', 40.50, 200, 5),
('7501040008102', 'Pizza Congelada Familiar', 95.00, 30, 6),
('7501094001107', 'Croquetas para Perro 10kg', 450.00, 20, 9),
('7501023520815', 'Cereal Integral 500g', 75.00, 70, 10)


INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioInicial, IdTipoProducto)
VALUES 
('7501027380023', 'Atún en Agua 140g', 18.50, 200, 1),
('7501013101236', 'Sopa Instantánea 64g', 12.00, 300, 1),
('7501026061248', 'Cloro 1L', 22.50, 150, 2),
('7501015601475', 'Crema Corporal Hidratante 400ml', 65.00, 80, 3),
('7501087062012', 'Chorizo de Cerdo 500g', 90.00, 50, 4),
('7501092810013', 'Tomates Verdes 1kg', 28.00, 250, 5),
('7501027032045', 'Helado de Vainilla 1L', 85.00, 60, 6),
('7501051921081', 'Whisky 750ml', 450.00, 25, 7),
('7501084312307', 'Arena para Gato 10kg', 120.00, 40, 9),
('7501029831097', 'Miel Orgánica 500g', 125.00, 70, 10)

INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioInicial, IdTipoProducto)
VALUES 
('7501098701125', 'Leche Entera 1L', 22.00, 300, 1),
('7501028367024', 'Galletas de Chocolate 200g', 35.00, 120, 1),
('7501093100578', 'Suavizante de Telas 900ml', 45.00, 100, 2),
('7501012234523', 'Shampoo Anticaspa 750ml', 80.00, 50, 3),
('7501082311049', 'Carne Molida de Res 1kg', 120.00, 40, 4),
('7501023412083', 'Aguacate Hass 1kg', 85.00, 150, 5),
('7501064521078', 'Nuggets de Pollo 500g', 110.00, 70, 6),
('7501073412035', 'Cerveza Artesanal 355ml', 50.00, 80, 7),
('7501032100123', 'Hueso de Carnaza para Perro', 35.00, 60, 9),
('7501056432094', 'Chía Orgánica 250g', 65.00, 90, 10)

INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioInicial, IdTipoProducto)
VALUES 
('7501090042157', 'Café Molido 250g', 95.00, 80, 1),
('7501029876543', 'Pan de Caja Integral 680g', 48.00, 150, 1),
('7501012315478', 'Desinfectante en Aerosol 400ml', 75.00, 60, 2),
('7501023458763', 'Jabón Líquido para Manos 500ml', 38.00, 100, 3),
('7501098765432', 'Salchichas de Pavo 1kg', 110.00, 70, 4),
('7501057890321', 'Plátanos Machos 1kg', 30.00, 200, 5),
('7501065423897', 'Papitas Congeladas 1kg', 90.00, 50, 6),
('7501019283746', 'Vodka Importado 1L', 300.00, 30, 7),
('7501032890127', 'Juguete para Gato', 80.00, 40, 9),
('7501065329018', 'Coco Rallado Orgánico 200g', 70.00, 50, 10)

INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioInicial, IdTipoProducto)
VALUES 
('7501090112234', 'Tortillas de Maíz 1kg', 18.00, 300, 1),
('7501011123456', 'Sardinas en Salsa de Tomate 125g', 22.50, 200, 1),
('7501029384756', 'Azúcar Refinada 2kg', 45.00, 150, 1),
('7501098767891', 'Jabón en Barra para Ropa 400g', 18.00, 100, 2),
('7501024587612', 'Limpiador Multiusos 1L', 30.00, 120, 2),
('7501097821345', 'Cepillo Dental Adulto', 25.00, 80, 3),
('7501018324756', 'Desodorante en Barra 50g', 35.00, 60, 3),
('7501029384721', 'Pechuga de Pollo 1kg', 120.00, 50, 4),
('7501012378456', 'Costilla de Cerdo 1kg', 150.00, 40, 4),
('7501039456123', 'Zanahorias 1kg', 18.00, 250, 5),
('7501087645123', 'Papaya Maradol 1kg', 25.00, 200, 5),
('7501034123478', 'Yogurt Congelado 1L', 85.00, 40, 6),
('7501056732198', 'Pollo Empanizado Congelado 500g', 95.00, 60, 6),
('7501079123456', 'Tequila Blanco 750ml', 250.00, 35, 7),
('7501012432189', 'Ron Añejo 1L', 280.00, 30, 7),
('7501023948567', 'Arena Sanitaria para Gato 5kg', 85.00, 50, 9),
('7501039487123', 'Premio para Perro 500g', 70.00, 40, 9),
('7501056723897', 'Granola Natural 500g', 65.00, 90, 10),
('7501032198475', 'Harina Integral 1kg', 45.00, 80, 10),
('7501072839471', 'Semillas de Girasol 300g', 55.00, 70, 10)

INSERT INTO [dbo].[Producto] (CodigoBarras, Descripcion, Precio, InventarioInicial, IdTipoProducto)
VALUES 
('7501098765433', 'Sopa de Fideo 200g', 15.00, 250, 1),
('7501023478912', 'Galletas Marías 500g', 25.00, 300, 1),
('7501012948625', 'Margarina 1kg', 40.00, 200, 1),
('7501098767892', 'Limpiador para Baños 500ml', 30.00, 100, 2),
('7501023948570', 'Desinfectante Líquido 500ml', 35.00, 120, 2),
('7501034123456', 'Shampoo para Cabello Graso 400ml', 65.00, 90, 3),
('7501012837459', 'Crema Hidratante Facial 200ml', 45.00, 80, 3),
('7501057654321', 'Filete de Res 1kg', 180.00, 50, 4),
('7501029384731', 'Pechuga de Pavo 500g', 90.00, 60, 4),
('7501098765439', 'Manzanas Verdes 1kg', 35.00, 200, 5),
('7501032109845', 'Naranjas 1kg', 28.00, 150, 5),
('7501029384752', 'Helado de Fresa 1L', 80.00, 40, 6),
('7501049283745', 'Pizza Congelada 4 Quesos', 100.00, 60, 6),
('7501032092837', 'Vino Tinto 750ml', 150.00, 45, 7),
('7501065321894', 'Whisky Escocés 700ml', 350.00, 30, 7),
('7501012837460', 'Pellets para Gato 5kg', 90.00, 80, 9),
('7501076543210', 'Correa para Perro', 45.00, 60, 9),
('7501087321098', 'Cereal de Maíz 500g', 55.00, 100, 10),
('7501029384735', 'Aceite de Coco 500ml', 65.00, 70, 10),
('7501032093841', 'Chía 250g', 40.00, 50, 10);





 
/*
creame 10 datos dummy para la siguiente tabla, el precio debe ser en pesos mexicanos, los productos deben ser de abarrotes, la definición es: CREATE TABLE [dbo].[Producto]( [IdProducto] [int] IDENTITY(1, 1) NOT NULL, [CodigoBarras] [nvarchar](13) NOT NULL, [Descripcion] [nvarchar](200) NOT NULL, [Precio] [numeric](18, 2) NOT NULL, [InventarioInicial] [numeric](18, 0) NOT NULL, [IdTipoProducto] [int] NOT NULL, CONSTRAINT [PK_Producto] PRIMARY KEY CLUSTERED ) debes considerar el siguiente catálogo para los idTipoProducto :   IdTipoProducto
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