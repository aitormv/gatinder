package com.proyecto.servicio;

import java.util.Optional;

import com.proyecto.modelo.ProtectoraVO;

public interface ServicioProtectora {

	<S extends ProtectoraVO> S save(S entity);

	<S extends ProtectoraVO> Iterable<S> saveAll(Iterable<S> entities);

	Optional<ProtectoraVO> findById(Integer id);

	boolean existsById(Integer id);

	Iterable<ProtectoraVO> findAll();

	Iterable<ProtectoraVO> findAllById(Iterable<Integer> ids);

	long count();

	void deleteById(Integer id);

	void delete(ProtectoraVO entity);

	void deleteAllById(Iterable<? extends Integer> ids);

	void deleteAll(Iterable<? extends ProtectoraVO> entities);

	void deleteAll();

}