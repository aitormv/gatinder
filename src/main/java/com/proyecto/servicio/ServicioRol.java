package com.proyecto.servicio;

import java.util.Optional;
import com.proyecto.modelo.RolVO;

public interface ServicioRol {

	<S extends RolVO> S save(S entity);

	<S extends RolVO> Iterable<S> saveAll(Iterable<S> entities);

	Optional<RolVO> findById(Integer id);

	boolean existsById(Integer id);

	Iterable<RolVO> findAll();

	Iterable<RolVO> findAllById(Iterable<Integer> ids);

	long count();

	void deleteById(Integer id);

	void delete(RolVO entity);

	void deleteAllById(Iterable<? extends Integer> ids);

	void deleteAll(Iterable<? extends RolVO> entities);

	void deleteAll();

}