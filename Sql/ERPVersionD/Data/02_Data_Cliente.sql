/*
IdTipoCliente
1.-Mayoreo
2.-Menudeo
3.-Estandar
*/
INSERT INTO [dbo].[Cliente] (Nombre, Celular, CorreoElectronico, Domicilio, RFC, IdTipoCliente)
VALUES
('Juan Carlos Pérez Hernández', '5512345678', 'juancarlos.perez@example.com', 'Calle 123, Col. Centro, CP 06000, México, CDMX', 'JCPHE123456XYZ', 1),
('María Guadalupe Rodríguez López', '5598765432', 'mariag.rodriguez@example.com', 'Av. Revolución 1234, Col. Guadalupe, CP 54321, Guadalajara, Jalisco', 'MGRLO123456XYZ', 2),
('Luis Alberto González Martínez', '5545678901', 'luis.gonzalez@example.com', 'Calle Abedul 789, Col. Jardines del Bosque, CP 12345, Monterrey, Nuevo León', 'LAGMA123456XYZ', 3),
('Ana Sofía Martínez Sánchez', '5587654321', 'anasofia.martinez@example.com', 'Calle Principal 234, Col. Centro, CP 98765, Puebla, Puebla', 'AMASA123456XYZ', 1),
('Carlos Enrique Hernández García', '5532109876', 'carlos.hernandez@example.com', 'Av. Reforma 567, Col. Roma Norte, CP 06700, México, CDMX', 'CAHEGA123456XYZ', 2),
('Sofía Alejandra López Ramírez', '5576543210', 'sofia.lopez@example.com', 'Calle Morelos 123, Col. Centro, CP 87654, Mérida, Yucatán', 'SOLORA123456XYZ', 3),
('Diego Fernando Ramírez González', '5521098765', 'diego.ramirez@example.com', 'Av. Juárez 456, Col. Centro Histórico, CP 65432, Oaxaca, Oaxaca', 'DIRAGO123456XYZ', 1),
('Laura Valentina García Pérez', '5565432109', 'laura.garcia@example.com', 'Calle Hidalgo 789, Col. Centro, CP 32109, Veracruz, Veracruz', 'LAGAPE123456XYZ', 2),
('Daniel Alejandro Santos López', '5510987654', 'daniel.santos@example.com', 'Av. Madero 123, Col. Centro, CP 98765, Guanajuato, Guanajuato', 'DASALO123456XYZ', 3),
('Valeria Fernanda Torres Martínez', '5554321098', 'valeria.torres@example.com', 'Calle Juárez 456, Col. Centro, CP 76543, Querétaro, Querétaro', 'VATOMA123456XYZ', 1),
('María Teresa López García', '5512345678', 'mariateresa.lopez@example.com', 'Av. Juárez 123, Col. Centro, CP 06000, México, CDMX', 'MTLOGA123456XYZ', 1),  -- Mayoreo
('Juan José Hernández Ramírez', '5598765432', 'juanjose.hernandez@example.com', 'Calle Hidalgo 456, Col. Roma, CP 06700, México, CDMX', 'JJHERRA123456XYZ', 2),  -- Menudeo
('Ana Laura Martínez Sánchez', '5545678901', 'anlaura.martinez@example.com', 'Av. Revolución 789, Col. Guadalupe, CP 54321, Guadalajara, Jalisco', 'ALAMAS123456XYZ', 3),  -- Estandar
('Carlos Eduardo Pérez González', '5587654321', 'carlose.perez@example.com', 'Calle Morelos 123, Col. Centro, CP 98765, Puebla, Puebla', 'CEPIGO123456XYZ', 1),  -- Mayoreo
('Sofía Valentina López Ramírez', '5532109876', 'sofia.lopez@example.com', 'Av. Reforma 567, Col. Roma Norte, CP 06700, México, CDMX', 'SOLORA123456XYZ', 2),  -- Menudeo
('Diego Fernando Ramírez González', '5576543210', 'diego.ramirez@example.com', 'Calle Juárez 123, Col. Centro, CP 87654, Mérida, Yucatán', 'DIRAGO123456XYZ', 3),  -- Estandar
('Laura Camila García Pérez', '5521098765', 'laura.garcia@example.com', 'Av. Hidalgo 456, Col. Centro, CP 32109, Veracruz, Veracruz', 'LAGAPE123456XYZ', 1),  -- Mayoreo
('Daniel Alejandro Santos López', '5565432109', 'daniel.santos@example.com', 'Calle Madero 789, Col. Centro, CP 98765, Guanajuato, Guanajuato', 'DASALO123456XYZ', 2),  -- Menudeo
('Valeria Fernanda Torres Martínez', '5510987654', 'valeria.torres@example.com', 'Av. Juárez 123, Col. Centro, CP 76543, Querétaro, Querétaro', 'VATOMA123456XYZ', 3),  -- Estandar
('Miguel Ángel Rodríguez Hernández', '5554321098', 'miguelangel.rodriguez@example.com', 'Calle Hidalgo 456, Col. Roma, CP 06700, México, CDMX', 'MARHER123456XYZ', 2);  -- Menudeo
