package com.proyecto.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.proyecto.modelo.RolVO;

@Repository
public interface RolRepositorio extends CrudRepository<RolVO, Integer> {

}