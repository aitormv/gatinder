package com.proyecto.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.proyecto.modelo.GatoVO;
import com.proyecto.servicio.ServicioGato;

@Controller
@RequestMapping("/gato")
public class GatoControlador {
	
	@Autowired
	ServicioGato sg;
	
	@RequestMapping("/mostrar")
	public String mostrar(Model modelo) {
		modelo.addAttribute("gatos", sg.findAll());
		return "gato/mostrarGatos";
	}
	
	@RequestMapping("/formInsertar")
	public String formInsertar(Model modelo) {
		modelo.addAttribute("gato", new GatoVO());
		return "gato/formInsertarGato";
	}
	
	@RequestMapping("/insertar")
	public String insertar(@ModelAttribute GatoVO gato, Model modelo) {
		sg.save(gato);
		modelo.addAttribute("gatos", sg.findAll());
		return "gato/mostrarGatos";
	}
	
	@RequestMapping("/eliminar")
	public String eliminar(@RequestParam int idgato, Model modelo) {
		sg.deleteById(idgato);
		modelo.addAttribute("gatos", sg.findAll());
		return "gato/mostrarGatos";
	}
	
	@RequestMapping("/formModificar")
	public String formModificar(@RequestParam int idgato, Model modelo){
		modelo.addAttribute("gato", sg.findById(idgato).get());
		return "gato/formModificarGato";
	}
	
	@RequestMapping("/modificar")
	public String modificar(@ModelAttribute GatoVO gato, Model modelo) {
		sg.save(gato);
		modelo.addAttribute("gatos", sg.findAll());
		return "gato/mostrarGatos";
	}
	
}