package com.example.demo.models;

import lombok.Data;

@Data
public class FieldDB {
	private String nameTable;
	private String position;
	private String name;
	private String type;
	private int size;
	private int decimal;
	private int isPk;
}
