package com.proyecto.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.proyecto.modelo.ProtectoraVO;

@Repository
public interface ProtectoraRepositorio extends CrudRepository<ProtectoraVO, Integer> {

	ProtectoraVO findByNombreUsuario(String nombreUsuario);

}