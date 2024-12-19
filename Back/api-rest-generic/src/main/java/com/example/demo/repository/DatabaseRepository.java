package com.example.demo.repository;

import org.springframework.stereotype.Repository;

import com.example.demo.models.FieldDB;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.*;

@Repository
public class DatabaseRepository {

    private final DataSource dataSource;
    private final EntityManager entityManager;

    public DatabaseRepository(DataSource dataSource, EntityManager entityManager) {
        this.dataSource = dataSource;
        this.entityManager = entityManager;
    }

    /**
     * Obtiene todas las filas de una tabla.
     * 
     * @param table Nombre de la tabla.
     * @return Lista de mapas representando las filas y columnas.
     * @throws SQLException Si ocurre un error al acceder a la base de datos.
     */
    public List<Map<String, Object>> getAllRows(String table) throws SQLException {
        String sql = "SELECT * FROM " + table; // Consulta dinámica
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            List<Map<String, Object>> results = new ArrayList<>();
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    row.put(metaData.getColumnName(i), rs.getObject(i));
                }
                results.add(row);
            }
            return results;
        }
    }

    
    public int deleteDetalleRows(String table, String id) throws SQLException {
        // Consulta para eliminar el registro basado en el id
        String sql = "DELETE FROM " + table + " WHERE Id" + table.replace("Detalle", "") + "=" + id;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            // Ejecutar la eliminación
            int rowsAffected = stmt.executeUpdate(); // Devuelve el número de filas afectadas

            return rowsAffected; // Retorna el número de filas eliminadas
        }
    }
    
    public List<Map<String, Object>> getAllDetalleRows(String table,String id) throws SQLException {
        String sql = "SELECT * FROM " + table+" where Id"+table.replace("Detalle", "")+"="+id; // Consulta dinámica
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            List<Map<String, Object>> results = new ArrayList<>();
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    row.put(metaData.getColumnName(i), rs.getObject(i));
                }
                results.add(row);
            }
            return results;
        }
    }


    /**
     * Obtiene información de la clave primaria de una tabla.
     * 
     * @param table Nombre de la tabla.
     * @return Mapa con la información de la clave primaria (nombre y tipo).
     * @throws SQLException Si no se encuentra la clave primaria.
     */
    public Map<String, String> getPrimaryKeyInfo(String table) throws SQLException {
        try (Connection conn = dataSource.getConnection()) {
            DatabaseMetaData metaData = conn.getMetaData();
            try (ResultSet rs = metaData.getPrimaryKeys(null, null, table)) {
                if (rs.next()) {
                    String columnName = rs.getString("COLUMN_NAME");
                    String typeName = rs.getString("TYPE_NAME");
                    return Map.of("name", columnName, "type", typeName);
                }
            }
        }
        throw new SQLException("Primary key not found for table: " + table);
    }

    /**
     * Inserta múltiples filas en la tabla especificada.
     * 
     * @param table Nombre de la tabla.
     * @param rows Lista de filas representadas como mapas columna-valor.
     * @throws SQLException Si ocurre un error durante la inserción.
     */
    public int insertRows(String table, List<Map<String, Object>> rows) throws SQLException {
        if (rows.isEmpty()) {
            return -1; // Si no hay filas, se retorna un valor por defecto
        }

        // Construir la consulta dinámica para la inserción
        String sql = buildInsertQuery(table, rows.get(0).keySet());
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            int lastGeneratedId = -1;

            for (Map<String, Object> row : rows) {
                int index = 1;
                for (Object value : row.values()) {
                    stmt.setObject(index++, value);
                }
                stmt.executeUpdate(); // Ejecutar fila por fila

                // Obtener el último identificador generado
                try (ResultSet rs = stmt.getGeneratedKeys()) {
                    if (rs.next()) {
                        lastGeneratedId = rs.getInt(1); // Actualizar el último ID generado
                    }
                }
            }

            return lastGeneratedId; // Retornar el último ID generado
        }
    }

    private String buildInsertQuery(String table, Set<String> columnNames) {
        String columns = String.join(", ", columnNames);
        String placeholders = String.join(", ", Collections.nCopies(columnNames.size(), "?"));
        return "INSERT INTO " + table + " (" + columns + ") VALUES (" + placeholders + ")";
    }

    /**
     * Actualiza múltiples filas en la tabla especificada.
     * 
     * @param table Nombre de la tabla.
     * @param rows Lista de filas con datos a actualizar.
     * @param primaryKey Clave primaria de la tabla.
     * @throws SQLException Si ocurre un error durante la actualización.
     */
    public void updateRows(String table, List<Map<String, Object>> rows, String primaryKey) throws SQLException {
        if (rows.isEmpty()) {
            return;
        }

        // Construir la consulta dinámica para la actualización
        String sql = buildUpdateQuery(table, rows.get(0).keySet(), primaryKey);
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            for (Map<String, Object> row : rows) {
                int index = 1;
                for (String key : row.keySet()) {
                    if (!key.equals(primaryKey)) {
                        stmt.setObject(index++, row.get(key));
                    }
                }
                stmt.setObject(index, row.get(primaryKey));
                stmt.addBatch();
            }
            stmt.executeBatch();
        }
    }

    private String buildUpdateQuery(String table, Set<String> columnNames, String primaryKey) {
        StringBuilder query = new StringBuilder("UPDATE " + table + " SET ");
        for (String column : columnNames) {
            if (!column.equals(primaryKey)) {
                query.append(column).append(" = ?, ");
            }
        }
        query.setLength(query.length() - 2); // Eliminar la última coma
        query.append(" WHERE ").append(primaryKey).append(" = ?");
        return query.toString();
    }

    /**
     * Elimina una fila específica en base al ID.
     * 
     * @param table Nombre de la tabla.
     * @param primaryKey Nombre de la columna de la clave primaria.
     * @param id Valor de la clave primaria.
     * @throws SQLException Si ocurre un error durante la eliminación.
     */
    public void deleteRow(String table, String primaryKey, Object id) throws SQLException {
        String sql = "DELETE FROM " + table + " WHERE " + primaryKey + " = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setObject(1, id);
            stmt.executeUpdate();
        }
    }
    
    
    
    public List<FieldDB> getTableFields(String table) throws SQLException {
        String sql = """
                SELECT 
                    c.ORDINAL_POSITION,
                    c.TABLE_NAME,
                    c.COLUMN_NAME,
                    c.DATA_TYPE,
                    ISNULL(c.CHARACTER_MAXIMUM_LENGTH, 
                           CASE 
                               WHEN c.DATA_TYPE IN ('decimal', 'numeric') THEN NUMERIC_PRECISION
                               ELSE 0
                           END) AS [PRECISION],
                    ISNULL(c.NUMERIC_SCALE, 0) AS NUMERIC_SCALE,
                    CASE 
                        WHEN tc.CONSTRAINT_TYPE = 'PRIMARY KEY' THEN 1
                        ELSE 0
                    END AS IS_PRIMARY_KEY
                FROM 
                    INFORMATION_SCHEMA.COLUMNS c
                LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
                    ON c.TABLE_NAME = kcu.TABLE_NAME 
                    AND c.COLUMN_NAME = kcu.COLUMN_NAME 
                    AND c.TABLE_SCHEMA = kcu.TABLE_SCHEMA
                LEFT JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
                    ON kcu.TABLE_NAME = tc.TABLE_NAME
                    AND kcu.CONSTRAINT_NAME = tc.CONSTRAINT_NAME
                    AND tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
                WHERE c.TABLE_NAME = ?
                ORDER BY 
                    c.TABLE_NAME, c.ORDINAL_POSITION
                """;

        List<FieldDB> fields = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            // Configurar el parámetro de la tabla
            stmt.setString(1, table);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    FieldDB field = new FieldDB();
                    field.setNameTable(rs.getString("TABLE_NAME"));
                    field.setPosition(rs.getString("ORDINAL_POSITION"));
                    field.setName(rs.getString("COLUMN_NAME"));
                    field.setType(rs.getString("DATA_TYPE"));
                    field.setSize(rs.getInt("PRECISION"));
                    field.setDecimal(rs.getInt("NUMERIC_SCALE"));
                    field.setIsPk(rs.getInt("IS_PRIMARY_KEY"));

                    fields.add(field);
                }
            }
        }

        return fields;
    }
    
    
    
}