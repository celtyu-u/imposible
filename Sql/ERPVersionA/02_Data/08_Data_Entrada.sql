USE [ERPVersionA]
GO

-- Variables para ayudar en la generacion de datos.
DECLARE @FechaInicio DATE = '2024-12-01';
DECLARE @FechaFin DATE = '2024-12-21';
DECLARE @NumEntradas INT = 10;
DECLARE @Contador INT = 1;
DECLARE @TotalProductos INT;
DECLARE @ProductosPorEntrada INT;

-- Tabla temporal para los productos y su precio
CREATE TABLE #Productos (
    IdProducto INT,
    Precio DECIMAL(18, 2)
);

-- Insertar los productos de la tabla Producto en la tabla temporal
INSERT INTO #Productos (IdProducto, Precio)
SELECT IdProducto, Precio FROM Producto;

SELECT @TotalProductos = COUNT(*) FROM #Productos;

SET @ProductosPorEntrada = 2;

-- Tabla temporal para llevar el control de productos ya usados
CREATE TABLE #ProductosUsados (
	IdProducto INT,Usado INT
);

insert into #ProductosUsados
select IdProducto,0 from Producto;

CREATE TABLE #ProductosPorEntrada (
    IdEntrada INT,
	IdProducto INT
);

-- Bucle para generar las entradas
WHILE @Contador <= @NumEntradas
BEGIN
    -- Generar una fecha aleatoria dentro del rango
    DECLARE @FechaEntrada DATETIME = DATEADD(day, ABS(CHECKSUM(NEWID()) % 14), @FechaInicio);

    -- Generar un IdEmpleado aleatorio
    DECLARE @IdEmpleado INT = ABS(CHECKSUM(NEWID()) % 20) + 1;

    -- Insertar el encabezado de la entrada
	DECLARE @IdEntrada INT
    INSERT INTO Entrada (Fecha, IdEmpleado, Comentario, Total)
    VALUES (@FechaEntrada, @IdEmpleado, 'Entrada generada automaticamente', 0);
	SET @IdEntrada = SCOPE_IDENTITY()
    
    -- Variables para el detalle de la entrada
    DECLARE @TotalEntrada DECIMAL(18, 2) = 0;
	DECLARE @ProductoAgregado INT = 0;
	DECLARE @Cantidad INT
	DECLARE @IdProducto INT
	DECLARE @PrecioProducto DECIMAL (18,2)
	DECLARE @ContadorProducto INT = 1;

	-- Agregamos la cantidad de productos por entrada
	WHILE @ContadorProducto <= @ProductosPorEntrada
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

		SET @Cantidad =ABS(CHECKSUM(NEWID()) % 10)+1;
		DECLARE @TotalDetalle DECIMAL(18,2) = @PrecioProducto * @Cantidad;

		-- Insertamos el detalle de la entrada
		INSERT INTO EntradaDetalle (IdEntrada, IdProducto, Cantidad, Costo, TotalDet)
		VALUES (@IdEntrada, @IdProducto, @Cantidad, @PrecioProducto, @TotalDetalle);

		-- Actualizamos el total de la entrada
		SET @TotalEntrada = @TotalEntrada + @TotalDetalle;

		-- Insertamos en los productos usados.
		if exists(select 1 from #ProductosUsados where IdProducto=@IdProducto)
		begin
		   update #ProductosUsados set Usado=Usado+1 where IdProducto=@IdProducto
		end
		else
		begin
			INSERT INTO #ProductosUsados (IdProducto,Usado) VALUES (@IdProducto,1);
		end

		INSERT INTO #ProductosPorEntrada (IdEntrada,IdProducto)
		VALUES (@IdEntrada,@IdProducto);
		SET @ContadorProducto = @ContadorProducto + 1;
		SET @ProductoAgregado = 0;
	END
	
    UPDATE Entrada SET Total = @TotalEntrada WHERE IdEntrada = @IdEntrada;

    SET @Contador = @Contador + 1;
END

select min(Usado) from #ProductosUsados;
select * from #ProductosUsados;

-- Eliminamos las tablas temporales.
DROP TABLE #Productos;
DROP TABLE #ProductosUsados;
DROP TABLE #ProductosPorEntrada;