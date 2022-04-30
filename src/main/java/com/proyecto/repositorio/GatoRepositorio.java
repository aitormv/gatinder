package com.proyecto.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.proyecto.modelo.GatoVO;

@Repository
public interface GatoRepositorio extends CrudRepository<GatoVO, Integer> {
	
	GatoVO findByNombre(String nombre);

}