package com.proyecto.modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="gatos")
public class GatoVO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idgato;
	private String nombre;
	private String sexo;
	private int edad;
	private String descripcion;
	private boolean acogido;
	private boolean adoptado;
	private String foto;
	@ManyToOne
	@JoinColumn(name="idusuario")
	private UsuarioVO usuario;
	@ManyToOne
	@JoinColumn(name="idprotectora")
	private ProtectoraVO protectora;
	
}