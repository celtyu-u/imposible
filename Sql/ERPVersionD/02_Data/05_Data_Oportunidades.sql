USE [ERPVersionD]
GO

/*
IdProceso
1-Iniciando
2-Negociando
3-Exitoso
4-No exitoso
*/


INSERT INTO [dbo].[Oportunidad] ([NombreContacto], [Empresa], [Telefono], [CorreoElectronico], [Domicilio], [Necesidad], [IdProceso])
VALUES
('Carlos Pérez', 'Tech Solutions', '5551234567', 'carlos.perez@techsolutions.com', 'Av. Tecnológica 45, Ciudad A', 'Adquirir sistemas de gestión ERP', 1),
('María López', 'Distribuidora La Esquina', '5559876543', 'maria.lopez@laesquina.com', 'Calle Comercio 32, Ciudad B', 'Optimizar procesos logísticos', 2),
('Juan Gómez', 'El Buen Precio', '5553344556', 'juan.gomez@elbuenprecio.com', 'Blvd. Central 98, Ciudad C', 'Implementar sistema de inventarios', 3),
('Ana Torres', 'Servicios Financieros Alfa', '5551122334', 'ana.torres@financierosalfa.com', 'Calle Principal 56, Ciudad D', 'Mejorar herramientas de análisis financiero', 1),
('Luis Sánchez', 'Abarrotes San José', '5556677889', 'luis.sanchez@sanjose.com', 'Av. Mercado 87, Ciudad E', 'Digitalizar gestión de pedidos', 2),
('Claudia Ramírez', 'La Familia Abarrotes', '5552233445', 'claudia.ramirez@lafamilia.com', 'Calle Unión 23, Ciudad F', 'Desarrollar estrategia de ventas online', 3),
('Miguel Hernández', 'Mercado Santa Fe', '5554455667', 'miguel.hernandez@santafe.com', 'Blvd. Campestre 12, Ciudad G', 'Reestructurar cadena de suministro', 1),
('Sofía Martínez', 'Central de Abastos San José', '5555566778', 'sofia.martinez@centralabastos.com', 'Calle Mercado 65, Ciudad H', 'Automatizar procesos de compras', 4),
('Javier Castillo', 'Distribuidora El Molino', '5559988776', 'javier.castillo@elmolino.com', 'Calle Molino Viejo 45, Ciudad I', 'Rediseñar sistemas de facturación', 2),
('Patricia Morales', 'Innovaciones Comerciales', '5556677880', 'patricia.morales@innovaciones.com', 'Calle Innovación 67, Ciudad J', 'Implementar CRM para ventas', 4)

INSERT INTO [dbo].[Oportunidad] ([NombreContacto], [Empresa], [Telefono], [CorreoElectronico], [Domicilio], [Necesidad], [IdProceso])
VALUES
('Fernanda Rivera', 'Comercializadora Rivera', '5556789012', 'fernanda.rivera@comercializadorarivera.com', 'Calle Comercio 123, Ciudad K', 'Aumentar puntos de venta', 1),
('Diego Morales', 'Abarrotes Morales', '5558765432', 'diego.morales@abarrotesmorales.com', 'Av. Principal 45, Ciudad L', 'Reducir costos de operación', 2),
('Laura Jiménez', 'Mayoreo Integral', '5553456789', 'laura.jimenez@mayoreointegral.com', 'Blvd. Comercial 67, Ciudad M', 'Mejorar tiempos de entrega', 3),
('Ricardo Ortiz', 'Tiendas Ortiz', '5557890123', 'ricardo.ortiz@tiendasortiz.com', 'Av. Oriente 98, Ciudad N', 'Actualizar tecnología de punto de venta', 4),
('Valeria Ruiz', 'Distribuidora Ruiz', '5554321098', 'valeria.ruiz@distribuidoraruiz.com', 'Calle Progreso 12, Ciudad O', 'Capacitar personal en herramientas digitales', 1),
('Héctor Martínez', 'Central de Abastos Martínez', '5551237890', 'hector.martinez@abastosmartinez.com', 'Blvd. Mercado 34, Ciudad P', 'Diseñar nuevo sistema de reparto', 2),
('Daniela Vázquez', 'Comercializadora Vázquez', '5559873210', 'daniela.vazquez@comercializadoravazquez.com', 'Calle Reforma 56, Ciudad Q', 'Incrementar cartera de clientes', 3),
('José Hernández', 'Abarrotes Hernández', '5553219876', 'jose.hernandez@abarroteshernandez.com', 'Av. Central 78, Ciudad R', 'Introducir nuevo sistema de inventarios', 4),
('Gabriela Soto', 'Mercados Unidos', '5558762109', 'gabriela.soto@mercadosunidos.com', 'Blvd. Unido 89, Ciudad S', 'Optimizar procesos de distribución', 1),
('Manuel García', 'Distribuidora García', '5556540987', 'manuel.garcia@distribuidoragarcia.com', 'Calle Comercio 90, Ciudad T', 'Crear sistema de fidelización de clientes', 2)
