package com.proyecto.servicio;

import java.util.Optional;

import com.proyecto.modelo.GatoVO;

public interface ServicioGato {

	<S extends GatoVO> S save(S entity);

	<S extends GatoVO> Iterable<S> saveAll(Iterable<S> entities);

	Optional<GatoVO> findById(Integer id);

	boolean existsById(Integer id);

	Iterable<GatoVO> findAll();

	Iterable<GatoVO> findAllById(Iterable<Integer> ids);

	long count();

	void deleteById(Integer id);

	void delete(GatoVO entity);

	void deleteAllById(Iterable<? extends Integer> ids);

	void deleteAll(Iterable<? extends GatoVO> entities);

	void deleteAll();

}