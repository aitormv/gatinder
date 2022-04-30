package com.proyecto.modelo;

import java.time.LocalDate;
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

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="usuarios")
public class UsuarioVO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idusuario;
	private String nombre;
	private String apellidos;
	private String sexo;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private LocalDate fechaNacimiento;
	private String localidad;
	private String telefono;
	private String email;
	@Column(unique=true)
	private String nombreUsuario;
	private String password;
	private String fotoPerfil;
	@ManyToOne
	@JoinColumn(name="idrol")
	@JsonIgnoreProperties("usuarios")
	private RolVO rol;
	@OneToMany(mappedBy="usuario")
	@JsonIgnoreProperties("usuario")
	private List<GatoVO> gatos;
	
	public UsuarioVO(int idusuario, String nombre, String apellidos, String sexo, LocalDate fechaNacimiento, String localidad, String telefono, String email, String nombreUsuario, String password, String fotoPerfil, RolVO rol) {
		super();
		this.idusuario = idusuario;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.sexo = sexo;
		this.fechaNacimiento = fechaNacimiento;
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
		return "UsuarioVO [idusuario=" + idusuario + ", nombre=" + nombre + ", apellidos=" + apellidos + ", sexo="
				+ sexo + ", fechaNacimiento=" + fechaNacimiento + ", localidad=" + localidad + ", telefono=" + telefono
				+ ", email=" + email + ", nombreUsuario=" + nombreUsuario + ", password=" + password + ", fotoPerfil="
				+ fotoPerfil + ", rol=" + rol + "]";
	}

}