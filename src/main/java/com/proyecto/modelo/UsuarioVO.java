package com.proyecto.modelo;

import java.time.LocalDate;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

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
	private String nombreUsuario;
	private String password;
	private String fotoPerfil;
	@ManyToOne
	@JoinColumn(name="idrol")
	private RolVO rol;
	@OneToMany(mappedBy="usuario")
	private List<GatoVO> gatos;
	
	@Override
	public String toString() {
		return "UsuarioVO [idusuario=" + idusuario + ", nombre=" + nombre + ", apellidos=" + apellidos + ", sexo="
				+ sexo + ", fechaNacimiento=" + fechaNacimiento + ", localidad=" + localidad + ", telefono=" + telefono
				+ ", email=" + email + ", nombreUsuario=" + nombreUsuario + ", password=" + password + ", fotoPerfil="
				+ fotoPerfil + ", rol=" + rol + "]";
	}

}