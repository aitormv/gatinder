package com.proyecto.tests;

import org.junit.jupiter.api.Test;
import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.proyecto.servicio.ServicioUsuario;

@SpringBootTest
class GatinderApplicationTests {
	
	@Autowired
	ServicioUsuario su;

	@Test
	public void test01() {
		Assert.assertNotNull(su.findByNombreUsuario("aitormv"));
	}
	
	@Test
	public void test02() {
		Assert.assertNotNull(su.loadUserByUsername("aitormv"));
	}

}