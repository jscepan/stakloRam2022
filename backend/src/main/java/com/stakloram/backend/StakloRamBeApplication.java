package com.stakloram.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class StakloRamBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(StakloRamBeApplication.class, args);
    }
//moramo dodati  xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" u header
    // Remove comments if is develop mode to remove CORS errors...
    /*
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedHeaders("*")
                        .allowedOrigins("*")
                        .allowedMethods("*");
            }
        };
    }
     */
}
