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
@Table(name="roles")
public class RolVO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idrol;
	private String nombre;
	@OneToMany(mappedBy="rol")
	private List<UsuarioVO> usuarios;
	
	@Override
	public String toString() {
		return "RolVO [idrol=" + idrol + ", nombre=" + nombre + "]";
	}

}