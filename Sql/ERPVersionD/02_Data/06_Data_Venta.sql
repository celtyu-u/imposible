USE [ERPVersionD]
GO

DECLARE @FechaInicio DATETIME = '2024-12-01';
DECLARE @FechaFin DATETIME = '2024-12-21 23:59:59';
DECLARE @Contador INT = 1;
DECLARE @TotalProductos INT;
DECLARE @ProductosPorVenta INT;

-- Tabla temporal para los productos y su precio
CREATE TABLE #Productos (
    IdProducto INT,
    Precio DECIMAL(18, 2)
);

-- Insertar los productos de la tabla Producto en la tabla temporal
INSERT INTO #Productos (IdProducto, Precio)
SELECT IdProducto, Precio FROM Producto;

SELECT @TotalProductos = COUNT(*) FROM #Productos;

--Productos que se manjan en cada venta.
SET @ProductosPorVenta = 3;

-- Tabla temporal para llevar el control de productos ya usados
CREATE TABLE #ProductosUsados (
	IdProducto INT,Usado INT
);

insert into #ProductosUsados
select IdProducto,0 from Producto;

CREATE TABLE #ProductosPorVenta (
    IdVenta INT,
	IdProducto INT
);

-- Bucle para recorrer los días
WHILE @FechaInicio <= @FechaFin
BEGIN
    -- Ventas que se manejan por día
    DECLARE @NumVentasDia INT = 12;
    --DECLARE @NumVentasDia INT = ABS(CHECKSUM(NEWID()) % 5) + 1;
	DECLARE @ContadorVenta INT = 1;
	
	-- Bucle para generar las ventas por día
	WHILE @ContadorVenta <= @NumVentasDia
	BEGIN
		-- Generar una fecha aleatoria dentro del día
		DECLARE @FechaVenta DATETIME = DATEADD(hour, ABS(CHECKSUM(NEWID()) % 24), @FechaInicio);

		-- Generar un IdCliente aleatorio
		DECLARE @IdCliente INT = ABS(CHECKSUM(NEWID()) % 30) + 1;

		-- Generar un IdEmpleado aleatorio
		DECLARE @IdEmpleado INT = ABS(CHECKSUM(NEWID()) % 20) + 1;

		-- Insertar el encabezado de la venta
		DECLARE @IdVenta INT
		INSERT INTO Venta (Fecha, IdCliente, IdEmpleado, Comentario, Total)
		VALUES (@FechaVenta, @IdCliente, @IdEmpleado, 'Venta generada automaticamente', 0);
		SET @IdVenta = SCOPE_IDENTITY();
        
        -- Validar que el IdVenta no sea NULL
        IF @IdVenta IS NULL
        BEGIN
           SET @ContadorVenta = @ContadorVenta+1;
           CONTINUE;
        END
		
		-- Variables para el detalle de la venta
		DECLARE @TotalVenta DECIMAL(18, 2) = 0;
		DECLARE @ProductoAgregado INT = 0;
		DECLARE @Cantidad INT
		DECLARE @IdProducto INT
		DECLARE @PrecioProducto DECIMAL (18,2)
		DECLARE @ContadorProducto INT = 1;

		-- Agregamos la cantidad de productos por venta
		WHILE @ContadorProducto <= @ProductosPorVenta
		BEGIN
			-- Seleccionamos un producto que no se halla agregado
			SELECT TOP 1  @IdProducto = IdProducto, @PrecioProducto = Precio 
			FROM #Productos
			WHERE IdProducto IN (SELECT IdProducto FROM #ProductosUsados where Usado=(select min(Usado) from #ProductosUsados))
			ORDER BY NEWID()

			IF @IdProducto IS NULL 
			BEGIN
				SELECT TOP 1  @IdProducto = IdProducto, @PrecioProducto = Precio 
				FROM #Productos
				ORDER BY NEWID()
				SET @ProductoAgregado = 1
			END

			--Es el random que se maneja en la cantidad.
			SET @Cantidad =ABS(CHECKSUM(NEWID()) % 5)+1;
			DECLARE @TotalDetalle DECIMAL(18,2) = @PrecioProducto * @Cantidad;

			-- Insertamos el detalle de la venta
			INSERT INTO VentaDetalle (IdVenta, IdProducto, Cantidad, Precio, TotalDet)
			VALUES (@IdVenta, @IdProducto, @Cantidad, @PrecioProducto, @TotalDetalle);

			-- Actualizamos el total de la venta
			SET @TotalVenta = @TotalVenta + @TotalDetalle;

			-- Insertamos en los productos usados.
			if exists(select 1 from #ProductosUsados where IdProducto=@IdProducto)
			begin
			   update #ProductosUsados set Usado=Usado+1 where IdProducto=@IdProducto
			end
			else
			begin
				INSERT INTO #ProductosUsados (IdProducto,Usado) VALUES (@IdProducto,1);
			end

			INSERT INTO #ProductosPorVenta (IdVenta,IdProducto)
			VALUES (@IdVenta,@IdProducto);
			SET @ContadorProducto = @ContadorProducto + 1;
			SET @ProductoAgregado = 0;
		END
		
		UPDATE Venta SET Total = @TotalVenta WHERE IdVenta = @IdVenta;
		
		SET @ContadorVenta = @ContadorVenta + 1;
	END
    
	SET @FechaInicio = DATEADD(day, 1, @FechaInicio);
END

select min(Usado) from #ProductosUsados;
select * from #ProductosUsados;

-- Eliminamos las tablas temporales.
DROP TABLE #Productos;
DROP TABLE #ProductosUsados;
DROP TABLE #ProductosPorVenta;