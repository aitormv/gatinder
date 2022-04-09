package com.proyecto.dto;


import com.proyecto.modelo.ProtectoraVO;
import com.proyecto.modelo.UsuarioVO;

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
	private UsuarioVO usuario;
	private ProtectoraVO protectora;

}