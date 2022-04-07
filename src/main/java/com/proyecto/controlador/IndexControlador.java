package com.proyecto.controlador;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class IndexControlador {
	
	@RequestMapping("/login")
	public String login() {
		return "login/index";
	}
	
	@RequestMapping("/logout")
	public String logout() {
		return "logout/index";
	}
	
	@RequestMapping("/cerrar")
	public void cerrar() {
		System.exit(0);
		return;
	}
	
	@RequestMapping("/registro")
	public String registro() {
		return "registro/index";
	}
	
	@RequestMapping("/anonimo")
	public String anonimo() {
		return "usuario_anónimo/index";
	}
	
	@RequestMapping("/registrado")
	public String registrado() {
		return "registrado/usuario_registrado/index";
	}
	
	@RequestMapping("/protectora")
	public String protectora() {
		return "protectora/gestión_protectora/index";
	}
	
	@RequestMapping("/admin")
	public String admin() {
		return "admin/panel/mostrar";
	}

}