package com.proyecto.seguridad;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Encriptar {
	
	public static String encriptarPassword(String password) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return "{bcrypt}" + encoder.encode(password);
	}

	public static void main(String[] args) {
		String password = "temporal";
		String passwordEncriptado = encriptarPassword(password);
		System.out.println("Password encriptado: " + passwordEncriptado);
	}

}