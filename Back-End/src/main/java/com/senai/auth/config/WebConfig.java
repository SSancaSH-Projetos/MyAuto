package com.senai.auth.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("*") // Permitir todos os origins
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Inclui OPTIONS
				.allowedHeaders("*"); // Todos os cabeçalhos permitidos
	}
}