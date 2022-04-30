package com.proyecto.ws;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.dto.ProtectoraDTO;
import com.proyecto.modelo.ProtectoraVO;
import com.proyecto.seguridad.Encriptar;
import com.proyecto.servicio.ServicioProtectora;
import com.proyecto.servicio.ServicioRol;

@RestController
@CrossOrigin(origins = "http://localhost:8181")
@RequestMapping("/api/protectoras")
public class ProtectoraWS {
	
	@Autowired
	ServicioProtectora sp;
	
	@Autowired
	ServicioRol sr;
	
	static Encriptar e;
	
	@GetMapping("/encontrarPorUsuario")
	public ResponseEntity<?> encontrarPorUsuario(@RequestParam String nombreUsuario) {
		ProtectoraVO protectora = sp.findByNombreUsuario(nombreUsuario);
		return new ResponseEntity<ProtectoraVO>(protectora, HttpStatus.OK);
	}
	
	@PostMapping("/insertar")
	public ResponseEntity<?> insertar(@RequestBody ProtectoraDTO protectora) {
		try {
			sp.save(new ProtectoraVO(protectora.getIdprotectora(), protectora.getDenominacion(), protectora.getLocalidad(),
			protectora.getTelefono(), protectora.getEmail(), protectora.getNombreUsuario(),
			Encriptar.encriptarPassword(protectora.getPassword()), protectora.getFotoPerfil(), sr.findById(protectora.getIdrol()).get()));
			return new ResponseEntity<String>("Funciona", HttpStatus.CREATED);
		} catch(DataIntegrityViolationException e) {
			return new ResponseEntity<String>("Data exception", HttpStatus.BAD_REQUEST);
		} catch(Exception e) {
			if(e.getCause() instanceof ConstraintViolationException) return new ResponseEntity<String>("Constraint exception",
			HttpStatus.BAD_REQUEST);
			return new ResponseEntity<String>("General exception", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/actualizar")
	public ResponseEntity<?> actualizar(@RequestBody ProtectoraDTO protectora) {
		try {
			sp.save(new ProtectoraVO(protectora.getIdprotectora(), protectora.getDenominacion(), protectora.getLocalidad(),
			protectora.getTelefono(), protectora.getEmail(), protectora.getNombreUsuario(),
			Encriptar.encriptarPassword(protectora.getPassword()), protectora.getFotoPerfil(), sr.findById(protectora.getIdrol()).get()));
			return new ResponseEntity<String>("Funciona", HttpStatus.CREATED);
		} catch(DataIntegrityViolationException e) {
			return new ResponseEntity<String>("Data exception", HttpStatus.BAD_REQUEST);
		} catch(Exception e) {
			if(e.getCause() instanceof ConstraintViolationException) return new ResponseEntity<String>("Constraint exception",
			HttpStatus.BAD_REQUEST);
			return new ResponseEntity<String>("General exception", HttpStatus.BAD_REQUEST);
		}
	}

}