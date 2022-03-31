package com.proyecto.controlador;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/panel")
public class PanelControlador {
	
	@RequestMapping("/mostrar")
	public String mostrar() {
		return "admin/panel/mostrar";
	}
	
	@RequestMapping("/cerrar")
	public void cerrar() {
		System.exit(0);
		return;
	}

}