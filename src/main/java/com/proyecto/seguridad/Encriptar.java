package com.proyecto.seguridad;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Encriptar {
	
	public static String encriptarPassword(String password) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return "{bcrypt}" + encoder.encode(password);
	}

}