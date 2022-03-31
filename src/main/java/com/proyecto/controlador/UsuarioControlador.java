package com.proyecto.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.proyecto.modelo.UsuarioVO;
import com.proyecto.servicio.ServicioUsuario;

@Controller
@RequestMapping("/usuario")
public class UsuarioControlador {
	
	@Autowired
	ServicioUsuario su;
	
	@RequestMapping("/mostrar")
	public String mostrar(Model modelo) {
		modelo.addAttribute("usuarios", su.findAll());
		return "usuario/mostrarUsuarios";
	}
	
	@RequestMapping("/formInsertar")
	public String formInsertar(Model modelo) {
		modelo.addAttribute("usuario", new UsuarioVO());
		return "usuario/formInsertarUsuario";
	}
	
	@RequestMapping("/insertar")
	public String insertar(@ModelAttribute UsuarioVO usuario, Model modelo) {
		su.save(usuario);
		modelo.addAttribute("usuarios", su.findAll());
		return "usuario/mostrarUsuarios";
	}
	
	@RequestMapping("/eliminar")
	public String eliminar(@RequestParam int idusuario, Model modelo) {
		su.deleteById(idusuario);
		modelo.addAttribute("usuarios", su.findAll());
		return "usuario/mostrarUsuarios";
	}
	
	@RequestMapping("/formModificar")
	public String formModificar(@RequestParam int idusuario, Model modelo){
		modelo.addAttribute("usuario", su.findById(idusuario).get());
		return "usuario/formModificarUsuario";
	}
	
	@RequestMapping("/modificar")
	public String modificar(@ModelAttribute UsuarioVO usuario, Model modelo) {
		su.save(usuario);
		modelo.addAttribute("usuarios", su.findAll());
		return "usuario/mostrarUsuarios";
	}

}