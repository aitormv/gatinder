package com.proyecto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GatoDTO {
	
	private int idgato;
	private String nombre;
	private String sexo;
	private int edad;
	private String descripcion;
	private boolean acogido;
	private boolean adoptado;
	private String foto;
	private String nombreUsuario;
	private int idprotectora;
	
}