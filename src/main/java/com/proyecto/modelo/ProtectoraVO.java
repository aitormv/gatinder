package com.proyecto.modelo;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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
	private String nombreUsuario;
	private String password;
	private String fotoPerfil;
	@OneToMany(mappedBy="protectora")
	private List<GatoVO> gatos;
	
	@Override
	public String toString() {
		return "ProtectoraVO [idprotectora=" + idprotectora + ", denominacion=" + denominacion + ", localidad="
				+ localidad + ", telefono=" + telefono + ", email=" + email + ", nombreUsuario=" + nombreUsuario
				+ ", password=" + password + ", fotoPerfil=" + fotoPerfil + "]";
	}

}