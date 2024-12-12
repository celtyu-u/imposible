package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.demo.models.DataGeneric;
import com.example.demo.models.Field;
import com.example.demo.models.FieldDB;
import com.example.demo.repository.DatabaseRepository;

@Service
public class DatabaseService {

	public static ArrayList<FieldDB> TablesFields= new ArrayList<FieldDB>();
    private final DatabaseRepository repository;

    public DatabaseService(DatabaseRepository repository) {
        this.repository = repository;
    }


    public DataGeneric getAll(String table) {
        DataGeneric dataGeneric = new DataGeneric();
        dataGeneric.setTable(table);

        try {
            List<Map<String, Object>> rows = repository.getAllRows(table);
            List<List<Field>> datas = convertRowsToFields(rows,table);

            dataGeneric.setStatus(1);
            dataGeneric.setDatas(datas);
        } catch (Exception e) {
            dataGeneric.setStatus(0);
            dataGeneric.setMessage(e.getMessage());
        }

        return dataGeneric;
    }

    public DataGeneric getById(String table, String id) {
        DataGeneric dataGeneric = new DataGeneric();
        dataGeneric.setTable(table);

        try {
            Map<String, String> primaryKeyInfo = repository.getPrimaryKeyInfo(table);
            String primaryKeyName = primaryKeyInfo.get("name");
            String primaryKeyType = primaryKeyInfo.get("type");

            // Convertir el ID al tipo correspondiente
            Object convertedId = convertIdToType(id, primaryKeyType);

            List<Map<String, Object>> rows = repository.getAllRows(table); // Esto sería una consulta filtrada
            List<List<Field>> datas = convertRowsToFields(rows,table);

            dataGeneric.setStatus(1);
            dataGeneric.setDatas(datas);
        } catch (Exception e) {
            dataGeneric.setStatus(0);
            dataGeneric.setMessage(e.getMessage());
        }

        return dataGeneric;
    }

    public DataGeneric insert(String table, List<List<Field>> datas) {
        DataGeneric dataGeneric = new DataGeneric();
        dataGeneric.setTable(table);

        try {
            List<Map<String, Object>> rows = convertFieldsToRows(datas,table);
            
            for (Map<String, Object> row : rows) {
                row.remove("Id"+table);
            }
            
            repository.insertRows(table, rows);
            dataGeneric.setStatus(1);
            dataGeneric.setMessage("Insert successful");
        } catch (Exception e) {
            dataGeneric.setStatus(0);
            dataGeneric.setMessage(e.getMessage());
        }

        return dataGeneric;
    }

    public DataGeneric update(String table, List<List<Field>> datas) {
        DataGeneric dataGeneric = new DataGeneric();
        dataGeneric.setTable(table);

        try {
            //Map<String, String> primaryKeyInfo = repository.getPrimaryKeyInfo(table);
            
            List<FieldDB> fields= this.getDataLocal(table);
            Optional<FieldDB> pkField =fields.stream().filter(f->f.getIsPk()==1).findFirst();
            String primaryKey= pkField.get().getName();

            List<Map<String, Object>> rows = convertFieldsToRows(datas,table);
            repository.updateRows(table, rows, primaryKey);

            dataGeneric.setStatus(1);
            dataGeneric.setMessage("Update successful");
        } catch (Exception e) {
            dataGeneric.setStatus(0);
            dataGeneric.setMessage(e.getMessage());
        }

        return dataGeneric;
    }

    public DataGeneric delete(String table, String id) {
        DataGeneric dataGeneric = new DataGeneric();
        dataGeneric.setTable(table);

        try {
            List<FieldDB> fields= this.getDataLocal(table);
            Optional<FieldDB> pkField =fields.stream().filter(f->f.getIsPk()==1).findFirst();
            String primaryKeyName= pkField.get().getName();
            String primaryKeyType = "int";

            Object convertedId = convertIdToType(id, primaryKeyType);
            repository.deleteRow(table, primaryKeyName, convertedId);

            dataGeneric.setStatus(1);
            dataGeneric.setMessage("Delete successful");
        } catch (Exception e) {
            dataGeneric.setStatus(0);
            dataGeneric.setMessage(e.getMessage());
        }

        return dataGeneric;
    }

    /**
     * Convierte filas (Map) en listas de campos (Field).
     */
    
    
    
    private List<FieldDB> getDataLocal(String tableName){
        
    	List<FieldDB> fieldsDB=TablesFields.stream()
    	        .filter(field -> field.getNameTable().equalsIgnoreCase(tableName))
    	        .collect(Collectors.toList());
        
        if(fieldsDB.size()==0) {
        	try {
				fieldsDB= repository.getTableFields(tableName);
				TablesFields.addAll(fieldsDB);
			} catch (SQLException e) {
				e.printStackTrace();
			}
        }
    	return fieldsDB;
    }
    
    
    private List<List<Field>> convertRowsToFields(List<Map<String, Object>> rows,String tableName) {
        List<List<Field>> datas = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        
        List<FieldDB> fieldsDB=this.getDataLocal(tableName);
        
        if(fieldsDB.size()==0) {
        	try {
				fieldsDB= repository.getTableFields(tableName);
				TablesFields.addAll(fieldsDB);
			} catch (SQLException e) {
				e.printStackTrace();
			}
        }
        
        for (Map<String, Object> row : rows) {
            List<Field> fields = new ArrayList<>();
            row.forEach((key, value) -> {
                Field field = new Field();
                field.setName(key);
                
                
                Optional<FieldDB> fieldOptional = getDataLocal(tableName).stream()
                        .filter(f -> f.getName().equalsIgnoreCase(key))
                        .findFirst();
                
                fieldOptional.ifPresentOrElse(
                        f -> {
                            if (value instanceof Number) {
                                field.setType(f.getType());
                                field.setSize(f.getSize()); // Ejemplo de tamaño
                                field.setDecimal(f.getDecimal()); // Ejemplo de decimales
                                field.setValue(value.toString());
                            } else if (value instanceof java.util.Date) {
                                field.setType(f.getType());
                                field.setSize(f.getSize());
                                field.setDecimal(f.getDecimal());
                                field.setValue(dateFormat.format(value));
                            } else {
                                field.setType(f.getType());
                                field.setSize(f.getSize()); // Ajustar según tu esquema
                                field.setDecimal(f.getDecimal());
                                field.setValue(value != null ? value.toString() : "");
                            }
                        },
                        () -> {
                            if (value instanceof Number) {
                                field.setType(value instanceof Integer ? "error" : "error2");
                                field.setSize(value instanceof Integer ? -1 : 999); // Ejemplo de tamaño
                                field.setDecimal(value instanceof Integer ?-1 : 999); // Ejemplo de decimales
                                field.setValue(value.toString());
                            } else if (value instanceof java.util.Date) {
                                field.setType("datetime");
                                field.setSize(999);
                                field.setDecimal(999);
                                field.setValue(dateFormat.format(value));
                            } else {
                                field.setType("nvarchar");
                                field.setSize(999); // Ajustar según tu esquema
                                field.setDecimal(999);
                                field.setValue(value != null ? value.toString() : "");
                            }
                        }
                );
                fields.add(field);
            });
            datas.add(fields);
        }
        return datas;
    }

    private List<Map<String, Object>> convertFieldsToRows(List<List<Field>> datas,String tableName) {
        List<Map<String, Object>> rows = new ArrayList<>();
        List<FieldDB> fieldsDB=this.getDataLocal(tableName);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        
        for (List<Field> fields : datas) {
            Map<String, Object> row = new HashMap<>();
            for (Field field : fields) {
            	String nameField=field.getName();
            	
                Optional<FieldDB> result = fieldsDB.stream()
                        .filter(f -> f.getName().equals(nameField))
                        .findFirst();
                
                if(result.isPresent())
                {
                	FieldDB f2= result.get();
                	switch (f2.getType()) {
					case "nvarchar":
                        row.put(field.getName(), field.getValue());
					break;
					case "int":
                        row.put(field.getName(),Integer.parseInt(field.getValue()));								
					break;
					case "numeric":
                        row.put(field.getName(),Double.parseDouble(field.getValue()));								
					break;
					case "datetime":
                        try {
							row.put(field.getName(),formatter.parse(field.getValue()));
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}								
					break;
					default:
                        row.put(field.getName(), field.getValue());
					}
                }
                else {
                    row.put(field.getName(), field.getValue());
                }
                
                
            }
            rows.add(row);
        }
        return rows;
    }

    /**
     * Convierte un ID en String al tipo correspondiente.
     */
    private Object convertIdToType(String id, String type) {
        switch (type.toLowerCase()) {
            case "int":
                return Integer.parseInt(id);
            case "numeric":
                return Double.parseDouble(id);
            case "datetime":
                return java.sql.Date.valueOf(id);
            default:
                return id;
        }
    }
}