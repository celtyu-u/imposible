package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ApiRestGenericApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiRestGenericApplication.class, args);
	}

    @RestController
    class TestController {
        @GetMapping("/")
        public String home() {
            return "Aplicación funcionando";
        }
    }
}
