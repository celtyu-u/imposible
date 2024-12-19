package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.DataGeneric;
import com.example.demo.models.Field;
import com.example.demo.service.DatabaseService;

@CrossOrigin
@RestController
@RequestMapping("/api/database")
public class DatabaseController {

    private final DatabaseService service;

    public DatabaseController(DatabaseService service) {
        this.service = service;
    }

    @GetMapping("/getAll")
    public DataGeneric getAll(@RequestParam String table) {
        return service.getAll(table);
    }

    @GetMapping("/getById")
    public DataGeneric getById(@RequestParam String table, @RequestParam String id) {
        // Implement logic for getById
        return new DataGeneric();
    }
    @GetMapping("/getByDetalleId")
    public DataGeneric getByDetalleId(@RequestParam String table, @RequestParam String id) {
        // Implement logic for getById
        return this.service.getByDetalleId(table, id);
    }

    @DeleteMapping("/deleteDetalleId")
    public DataGeneric deleteDetalleId(@RequestParam String table, @RequestParam String id) {
        // Implement logic for getById
        return this.service.deleteDetalleId(table, id);
    }

    @PostMapping("/insert")
    public DataGeneric insert(@RequestParam String table, @RequestBody List<List<Field>> datas) {
        // Implement logic for insert
        return this.service.insert(table, datas);
    }

    @PutMapping("/update")
    public DataGeneric update(@RequestParam String table, @RequestBody List<List<Field>> datas) {
        // Implement logic for update
        return this.service.update(table, datas);
    }

    @DeleteMapping("/delete")
    public DataGeneric delete(@RequestParam String table, @RequestParam String id) {
        // Implement logic for delete
        return this.service.delete(table, id);
    }
}