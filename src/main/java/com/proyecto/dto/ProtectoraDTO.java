package com.proyecto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProtectoraDTO {
	
	private int idprotectora;
	private String denominacion;
	private String localidad;
	private String telefono;
	private String email;
	private String nombreUsuario;
	private String password;
	private String fotoPerfil;
	private int idrol;
	
	public ProtectoraDTO(int idprotectora, String denominacion, String localidad, String telefono, String email, String nombreUsuario, String password, String fotoPerfil) {
		super();
		this.idprotectora = idprotectora;
		this.denominacion = denominacion;
		this.localidad = localidad;
		this.telefono = telefono;
		this.email = email;
		this.nombreUsuario = nombreUsuario;
		this.password = password;
		this.fotoPerfil = fotoPerfil;
	}

}