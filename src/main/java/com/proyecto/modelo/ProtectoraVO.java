package com.proyecto.modelo;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="protectoras")
public class ProtectoraVO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idprotectora;
	private String denominacion;
	private String localidad;
	private String telefono;
	private String email;
	@Column(unique=true)
	private String nombreUsuario;
	private String password;
	private String fotoPerfil;
	@ManyToOne
	@JoinColumn(name="idrol")
	@JsonIgnoreProperties("protectoras")
	private RolVO rol;
	@OneToMany(mappedBy="protectora")
	@JsonIgnoreProperties("protectoras")
	private List<GatoVO> gatos;
	
	public ProtectoraVO(int idprotectora, String denominacion, String localidad, String telefono, String email, String nombreUsuario, String password, String fotoPerfil, RolVO rol) {
		super();
		this.idprotectora = idprotectora;
		this.denominacion = denominacion;
		this.localidad = localidad;
		this.telefono = telefono;
		this.email = email;
		this.nombreUsuario = nombreUsuario;
		this.password = password;
		this.fotoPerfil = fotoPerfil;
		this.rol = rol;
	}
	
	@Override
	public String toString() {
		return "ProtectoraVO [idprotectora=" + idprotectora + ", denominacion=" + denominacion + ", localidad="
				+ localidad + ", telefono=" + telefono + ", email=" + email + ", nombreUsuario=" + nombreUsuario
				+ ", password=" + password + ", fotoPerfil=" + fotoPerfil + ", rol=" + rol + "]";
	}
	
}