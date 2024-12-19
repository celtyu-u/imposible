package com.example.demo.models;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class DataGeneric {
    private int status=0;
    private String message="";
    private String table="";
    private int lastPk=0;
    private List<List<Field>> datas = new ArrayList<>();
}
