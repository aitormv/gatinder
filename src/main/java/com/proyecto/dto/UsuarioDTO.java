package com.proyecto.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {

	private int idusuario;
	private String nombre;
	private String apellidos;
	private String sexo;
	private LocalDate fechaNacimiento;
	private String localidad;
	private String telefono;
	private String email;
	private String nombreUsuario;
	private String password;
	private String fotoPerfil;
	private int idrol;

}