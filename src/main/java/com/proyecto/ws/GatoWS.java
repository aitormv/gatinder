package com.proyecto.ws;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.dto.GatoDTO;
import com.proyecto.modelo.GatoVO;
import com.proyecto.servicio.ServicioGato;
import com.proyecto.servicio.ServicioProtectora;
import com.proyecto.servicio.ServicioUsuario;

@RestController
@CrossOrigin(origins = "http://localhost:8181")
@RequestMapping("/api/gatos")
public class GatoWS {
	
	@Autowired
	ServicioGato sg;
	
	@Autowired
	ServicioUsuario su;
	
	@Autowired
	ServicioProtectora sp;
	
	@GetMapping("")
	public ResponseEntity<?> findAll() {
		List<GatoVO> lista = new ArrayList<GatoVO>();
		sg.findAll().forEach(x -> lista.add(new GatoVO(x.getIdgato(), x.getNombre(), x.getSexo(),
		x.getEdad(), x.getDescripcion(), x.isAcogido(), x.isAdoptado(), x.getFoto(), x.getUsuario(), x.getProtectora())));
		return new ResponseEntity<List<GatoVO>>(lista, HttpStatus.OK);
	}
	
	@GetMapping("encontrarPorNombre")
	public ResponseEntity<?> encontrarPorNombre(@RequestParam String nombre) {
		GatoVO gato = sg.findByNombre(nombre);
		return new ResponseEntity<GatoVO>(gato, HttpStatus.OK);
	}
	
	@PostMapping("/insertar")
	public ResponseEntity<?> insertar(@RequestBody GatoDTO gato) {
		try {
			sg.save(new GatoVO(gato.getIdgato(), gato.getNombre(), gato.getSexo(), gato.getEdad(), gato.getDescripcion(),
			gato.isAcogido(), gato.isAdoptado(), gato.getFoto(), su.findByNombreUsuario(gato.getNombreUsuario()), sp.findById(gato.getIdprotectora()).get()));
			return new ResponseEntity<String>("Funciona", HttpStatus.CREATED);
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<String>("Data exception", HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			if (e.getCause() instanceof ConstraintViolationException) return new ResponseEntity<String>("Constraint exception",
			HttpStatus.BAD_REQUEST);
			return new ResponseEntity<String>("General exception", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/actualizar")
	public ResponseEntity<?> actualizar(@RequestBody GatoDTO gato) {
		try {
			sg.save(new GatoVO(gato.getIdgato(), gato.getNombre(), gato.getSexo(), gato.getEdad(), gato.getDescripcion(),
			gato.isAcogido(), gato.isAdoptado(), gato.getFoto(), su.findByNombreUsuario(gato.getNombreUsuario())));
			return new ResponseEntity<String>("Funciona", HttpStatus.CREATED);
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<String>("Data exception", HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			if (e.getCause() instanceof ConstraintViolationException) return new ResponseEntity<String>("Constraint exception",
			HttpStatus.BAD_REQUEST);
			return new ResponseEntity<String>("General exception", HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/eliminar")
	public ResponseEntity<?> eliminar(@RequestParam int idgato) {
		try {
			sg.deleteById(idgato);
			return new ResponseEntity<String>("Funciona", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Error", HttpStatus.BAD_REQUEST);
		}
	}

}