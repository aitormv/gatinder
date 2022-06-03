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

import com.proyecto.dto.UsuarioDTO;
import com.proyecto.modelo.UsuarioVO;
import com.proyecto.seguridad.Encriptar;
import com.proyecto.servicio.ServicioRol;
import com.proyecto.servicio.ServicioUsuario;

@RestController
@CrossOrigin(origins = "http://localhost:8181")
@RequestMapping("/api/usuarios")
public class UsuarioWS {
	
	@Autowired
	ServicioUsuario su;
	
	@Autowired
	ServicioRol sr;
	
	static Encriptar e;
	
	@GetMapping("/encontrarPorUsuario")
	public ResponseEntity<?> encontrarPorUsuario(@RequestParam String nombreUsuario) {
		UsuarioVO usuario = su.findByNombreUsuario(nombreUsuario);
		return new ResponseEntity<UsuarioVO>(usuario, HttpStatus.OK);
	}
	
	@PostMapping("/insertar")
	public ResponseEntity<?> insertar(@RequestBody UsuarioDTO usuario) {
		try {
			su.save(new UsuarioVO(usuario.getIdusuario(), usuario.getNombre(), usuario.getApellidos(), usuario.getSexo(),
			usuario.getFechaNacimiento(), usuario.getLocalidad(), usuario.getTelefono(), usuario.getEmail(), usuario.getNombreUsuario(),
			Encriptar.encriptarPassword(usuario.getPassword()), usuario.getFotoPerfil(), sr.findById(usuario.getIdrol()).get()));
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
	public ResponseEntity<?> actualizar(@RequestBody UsuarioDTO usuario) {
		try {
			su.save(new UsuarioVO(usuario.getIdusuario(), usuario.getNombre(), usuario.getApellidos(), usuario.getSexo(),
			usuario.getFechaNacimiento(), usuario.getLocalidad(), usuario.getTelefono(), usuario.getEmail(), usuario.getNombreUsuario(),
			Encriptar.encriptarPassword(usuario.getPassword()), usuario.getFotoPerfil(), sr.findById(usuario.getIdrol()).get()));
			return new ResponseEntity<String>("Funciona", HttpStatus.CREATED);
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<String>("Data exception", HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			if (e.getCause() instanceof ConstraintViolationException) return new ResponseEntity<String>("Constraint exception",
			HttpStatus.BAD_REQUEST);
			return new ResponseEntity<String>("General exception", HttpStatus.BAD_REQUEST);
		}
	}

}