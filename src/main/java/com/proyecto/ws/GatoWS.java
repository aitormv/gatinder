package com.proyecto.ws;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.dto.GatoDTO;
import com.proyecto.modelo.GatoVO;
import com.proyecto.servicio.ServicioGato;

@RestController
@RequestMapping("/api/gatos")
public class GatoWS {
	
	@Autowired
	ServicioGato sg;
	
	@CrossOrigin(origins = "http://localhost:8181/api/gatos")
	@GetMapping("")
	public ResponseEntity<?> findAll() {
		List<GatoDTO> lista = new ArrayList<GatoDTO>();
		sg.findAll().forEach(x -> lista.add(new GatoDTO(x.getIdgato(), x.getNombre(), x.getSexo(), x.getEdad(), x.getDescripcion(), x.isAcogido(), x.isAdoptado(), x.getFoto(), x.getUsuario(), x.getProtectora())));
		return new ResponseEntity<List<GatoDTO>>(lista, HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "http://localhost:8181/api/gatos")
	@GetMapping("/{idgato}")
	public ResponseEntity<?> findById(@PathVariable int idgato) {
		try {
			GatoVO gato = sg.findById(idgato).get();
			return new ResponseEntity<GatoDTO>(new GatoDTO(gato.getIdgato(), gato.getNombre(), gato.getSexo(), gato.getEdad(), gato.getDescripcion(), gato.isAcogido(), gato.isAdoptado(), gato.getFoto(), gato.getUsuario(), gato.getProtectora()), HttpStatus.OK);
		} catch(NoSuchElementException e) {
			return new ResponseEntity<String>("No existe el registro", HttpStatus.NO_CONTENT);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:8181/api/gatos")
	@PostMapping("/insertar")
	public ResponseEntity<?> insertar(@RequestBody GatoDTO gato) {
		try {
			sg.save(new GatoVO(gato.getIdgato(), gato.getNombre(), gato.getSexo(), gato.getEdad(), gato.getDescripcion(), gato.isAcogido(), gato.isAdoptado(), gato.getFoto(), gato.getUsuario(), gato.getProtectora()));
			return new ResponseEntity<String>("Funciona", HttpStatus.CREATED);
		} catch(DataIntegrityViolationException e) {
			return new ResponseEntity<String>("Data exception", HttpStatus.BAD_REQUEST);
		} catch(Exception e) {
			if(e.getCause() instanceof ConstraintViolationException) return new ResponseEntity<String>("Constraint exception", HttpStatus.BAD_REQUEST);
			return new ResponseEntity<String>("General exception", HttpStatus.BAD_REQUEST);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:8181/api/gatos")
	@PutMapping("/actualizar")
	public ResponseEntity<?> actualizar(@RequestBody GatoDTO gato) {
		try {
			sg.save(new GatoVO(gato.getIdgato(), gato.getNombre(), gato.getSexo(), gato.getEdad(), gato.getDescripcion(), gato.isAcogido(), gato.isAdoptado(), gato.getFoto(), gato.getUsuario(), gato.getProtectora()));
			return new ResponseEntity<String>("Funciona", HttpStatus.CREATED);
		} catch(DataIntegrityViolationException e) {
			return new ResponseEntity<String>("Data exception", HttpStatus.BAD_REQUEST);
		} catch(Exception e) {
			if(e.getCause() instanceof ConstraintViolationException) return new ResponseEntity<String>("Constraint exception", HttpStatus.BAD_REQUEST);
			return new ResponseEntity<String>("General exception", HttpStatus.BAD_REQUEST);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:8181/api/gatos")
	@DeleteMapping("/eliminar")
	public ResponseEntity<?> eliminar(@RequestParam int idgato) {
		try {
			sg.deleteById(idgato);
			return new ResponseEntity<String>("Funciona", HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<String>("Error", HttpStatus.BAD_REQUEST);
		}
	}
	
	@CrossOrigin(origins = "http://localhost:8181/api/gatos")
	@DeleteMapping("/eliminarTodo")
	public ResponseEntity<?> eliminarTodo() {
		try {
			sg.deleteAll();
			return new ResponseEntity<String>("Funciona", HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<String>("Error", HttpStatus.BAD_REQUEST);
		}
	}

}