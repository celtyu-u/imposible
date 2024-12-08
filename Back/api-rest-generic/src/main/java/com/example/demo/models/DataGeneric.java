package com.example.demo.models;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class DataGeneric {
    private int status;
    private String message;
    private String table;
    private List<List<Field>> datas = new ArrayList<>();
}
