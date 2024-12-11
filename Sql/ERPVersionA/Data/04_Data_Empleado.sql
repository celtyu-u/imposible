USE [ERPVersionA]
GO

/*
IdArea
1-Sistemas
2-Ventas
3-Administrativo
4-Recursos Humanos
5-Compras
*/


INSERT INTO [dbo].[Empleado] (Nombre, Telefono, Correo, Direccion, IdArea)
VALUES
('Carlos Pérez Ramírez', '5543219876', 'carlos.perez@example.com', 'Av. Insurgentes 123, Ciudad de México, CDMX', 1),
('María López Torres', '5587654321', 'maria.lopez@example.com', 'Calle Hidalgo 456, Guadalajara, Jalisco', 2),
('Luis Hernández Gómez', '5576543210', 'luis.hernandez@example.com', 'Blvd. Constitución 789, Monterrey, Nuevo León', 3),
('Ana Rodríguez Jiménez', '5598765432', 'ana.rodriguez@example.com', 'Calle Allende 23, Puebla, Puebla', 4),
('Gabriela Sánchez Mendoza', '5523456789', 'gabriela.sanchez@example.com', 'Av. Reforma 567, Querétaro, Querétaro', 1),
('Jorge Martínez Ruiz', '5534567890', 'jorge.martinez@example.com', 'Blvd. Revolución 123, León, Guanajuato', 2),
('Daniela Torres Morales', '5567891234', 'daniela.torres@example.com', 'Calle Morelos 34, Mérida, Yucatán', 3),
('Ricardo Gómez Rivera', '5512345678', 'ricardo.gomez@example.com', 'Av. Juárez 89, Cancún, Quintana Roo', 4),
('Sofía Ramírez Gutiérrez', '5545678901', 'sofia.ramirez@example.com', 'Calle Central 56, Toluca, Estado de México', 1),
('Fernando Castillo Navarro', '5589012345', 'fernando.castillo@example.com', 'Av. Benito Juárez 456, Oaxaca, Oaxaca', 2)

INSERT INTO [dbo].[Empleado] (Nombre, Telefono, Correo, Direccion, IdArea)
VALUES
('Paola Cruz Hernández', '5543211234', 'paola.cruz@example.com', 'Av. Central 123, Ciudad de México, CDMX', 1),
('Diego Flores Jiménez', '5578906543', 'diego.flores@example.com', 'Calle Insurgentes 45, Guadalajara, Jalisco', 2),
('Andrea López García', '5523459876', 'andrea.lopez@example.com', 'Blvd. Independencia 67, Monterrey, Nuevo León', 3),
('Héctor Martínez Ramírez', '5534561234', 'hector.martinez@example.com', 'Calle Morelos 89, Puebla, Puebla', 4),
('Valeria Torres Rivera', '5567896543', 'valeria.torres@example.com', 'Av. Juárez 56, Querétaro, Querétaro', 5),
('Ángel Gutiérrez Sánchez', '5512348765', 'angel.gutierrez@example.com', 'Calle Allende 78, León, Guanajuato', 1),
('Camila Vargas Morales', '5545671234', 'camila.vargas@example.com', 'Blvd. Constitución 12, Mérida, Yucatán', 2),
('Roberto Ramírez Pérez', '5587654321', 'roberto.ramirez@example.com', 'Av. Reforma 34, Cancún, Quintana Roo', 3),
('Isabel Mendoza Ortiz', '5523491234', 'isabel.mendoza@example.com', 'Calle Central 45, Toluca, Estado de México', 4),
('Manuel Sánchez García', '5589012345', 'manuel.sanchez@example.com', 'Av. Benito Juárez 67, Oaxaca, Oaxaca', 5)