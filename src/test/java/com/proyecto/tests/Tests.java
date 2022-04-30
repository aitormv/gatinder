package com.proyecto.tests;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.proyecto.servicio.ServicioUsuario;

@SpringBootTest
class Tests {
	
	@Autowired
	ServicioUsuario su;
	
	@Test
	void test01() {
		assertNotNull(su.findByNombreUsuario("aitormv"));
		System.out.println(su.findByNombreUsuario("aitormv"));
	}

	@Test
	void test02() {
		assertNotNull(su.loadUserByUsername("aitormv"));
		System.out.println(su.loadUserByUsername("aitormv"));
	}

}