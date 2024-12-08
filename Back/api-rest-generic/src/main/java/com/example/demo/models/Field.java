package com.example.demo.models;

import lombok.Data;

@Data
public class Field {
    private String name;
    private String type;
    private int size;
    private int decimal;
    private String value;
}

