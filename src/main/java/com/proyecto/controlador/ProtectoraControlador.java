package com.proyecto.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.proyecto.modelo.ProtectoraVO;
import com.proyecto.servicio.ServicioProtectora;

@Controller
@RequestMapping("/protectora")
public class ProtectoraControlador {
	
	@Autowired
	ServicioProtectora sp;
	
	@RequestMapping("/mostrar")
	public String mostrar(Model modelo) {
		modelo.addAttribute("protectoras", sp.findAll());
		return "admin/panel_protectora/mostrarProtectoras";
	}
	
	@RequestMapping("/formInsertar")
	public String formInsertar(Model modelo) {
		modelo.addAttribute("protectora", new ProtectoraVO());
		return "admin/panel_protectora/formInsertarProtectora";
	}
	
	@RequestMapping("/insertar")
	public String insertar(@ModelAttribute ProtectoraVO protectora, Model modelo) {
		sp.save(protectora);
		modelo.addAttribute("protectoras", sp.findAll());
		return "admin/panel_protectora/mostrarProtectoras";
	}
	
	@RequestMapping("/eliminar")
	public String eliminar(@RequestParam int idprotectora, Model modelo) {
		sp.deleteById(idprotectora);
		modelo.addAttribute("protectoras", sp.findAll());
		return "admin/panel_protectora/mostrarProtectoras";
	}
	
	@RequestMapping("/formModificar")
	public String formModificar(@RequestParam int idprotectora, Model modelo){
		modelo.addAttribute("protectora", sp.findById(idprotectora).get());
		return "admin/panel_protectora/formModificarProtectora";
	}
	
	@RequestMapping("/modificar")
	public String modificar(@ModelAttribute ProtectoraVO protectora, Model modelo) {
		sp.save(protectora);
		modelo.addAttribute("protectoras", sp.findAll());
		return "admin/panel_protectora/mostrarProtectoras";
	}

}