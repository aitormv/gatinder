package com.proyecto.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
	@Column(unique=true)
	private String nombre;
	private String sexo;
	private int edad;
	private String descripcion;
	private boolean acogido;
	private boolean adoptado;
	private String foto;
	@ManyToOne
	@JoinColumn(name="idusuario")
	@JsonIgnoreProperties("gatos")
	private UsuarioVO usuario;
	@ManyToOne
	@JoinColumn(name="idprotectora")
	@JsonIgnoreProperties("gatos")
	private ProtectoraVO protectora;

	public GatoVO(int idgato, String nombre, String sexo, int edad, String descripcion, boolean acogido, boolean adoptado, String foto, UsuarioVO usuario) {
		super();
		this.idgato = idgato;
		this.nombre = nombre;
		this.sexo = sexo;
		this.edad = edad;
		this.descripcion = descripcion;
		this.acogido = acogido;
		this.adoptado = adoptado;
		this.foto = foto;
		this.usuario = usuario;
	}

	@Override
	public String toString() {
		return "GatoVO [idgato=" + idgato + ", nombre=" + nombre + ", sexo=" + sexo + ", edad=" + edad
				+ ", descripcion=" + descripcion + ", acogido=" + acogido + ", adoptado=" + adoptado + ", foto=" + foto
				+ ", usuario=" + usuario + ", protectora=" + protectora + "]";
	}

}