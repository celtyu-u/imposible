USE [ERPVersionA]
GO

/*
IdCliente
Los ids van del número 1 al 30

IdPrioridad
1. Alta
2. Media
3. Baja

IdEstatus
1. Reportado
2. En Proceso
3. Resuelto

*/


INSERT INTO [dbo].[Queja] ([Proceso], [Queja], [Solucion], [IdCliente], [IdPrioridad], [IdEstatus])
VALUES
('Entrega', 'Problema con el servicio de entrega', 'Mejorar los tiempos de entrega', 1, 1, 1),
('Recepción Producto', 'Producto recibido defectuoso', 'Reemplazo del producto', 2, 2, 2),
('Facturación', 'Facturación incorrecta', 'Revisión y corrección de la factura', 3, 1, 3),
('Recepción Producto', 'No se recibió el pedido completo', 'Envío del producto faltante', 4, 3, 2),
('Atención al cliente', 'Atención al cliente deficiente', 'Capacitación de personal de soporte', 5, 2, 1),
('Entrega', 'Retraso en el envío', 'Notificación al cliente sobre el retraso', 6, 2, 3),
('Sistemas', 'Error en la página web', 'Corregir el bug en la plataforma', 7, 1, 2),
('Entrega', 'Producto no corresponde a la descripción', 'Reemplazo por el producto correcto', 8, 3, 1),
('Entrega', 'Problemas con la calidad del producto', 'Investigación sobre la calidad y corrección', 9, 1, 3),
('Entrega', 'Servicio de instalación inadecuado', 'Reprogramación de la instalación', 10, 2, 2)

