package com.proyecto.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.proyecto.modelo.UsuarioVO;

@Repository
public interface UsuarioRepositorio extends CrudRepository<UsuarioVO, Integer> {

	UsuarioVO findByNombreUsuario(String nombreUsuario);

}