package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HolaController {
	
	@GetMapping(path = "/Product2")
    public String getProduct2(){
    	return"GET hola mundo";
    }

}