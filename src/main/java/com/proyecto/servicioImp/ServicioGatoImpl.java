package com.proyecto.servicioImp;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.proyecto.modelo.GatoVO;
import com.proyecto.repositorio.GatoRepositorio;
import com.proyecto.servicio.ServicioGato;

@Service
public class ServicioGatoImpl implements ServicioGato {
	
	@Autowired
	private GatoRepositorio gr;

	public GatoVO findByNombre(String nombre) {
		return gr.findByNombre(nombre);
	}

	@Override
	public <S extends GatoVO> S save(S entity) {
		return gr.save(entity);
	}

	@Override
	public <S extends GatoVO> Iterable<S> saveAll(Iterable<S> entities) {
		return gr.saveAll(entities);
	}

	@Override
	public Optional<GatoVO> findById(Integer id) {
		return gr.findById(id);
	}

	@Override
	public boolean existsById(Integer id) {
		return gr.existsById(id);
	}

	@Override
	public Iterable<GatoVO> findAll() {
		return gr.findAll();
	}

	@Override
	public Iterable<GatoVO> findAllById(Iterable<Integer> ids) {
		return gr.findAllById(ids);
	}

	@Override
	public long count() {
		return gr.count();
	}

	@Override
	public void deleteById(Integer id) {
		gr.deleteById(id);
	}

	@Override
	public void delete(GatoVO entity) {
		gr.delete(entity);
	}

	@Override
	public void deleteAllById(Iterable<? extends Integer> ids) {
		gr.deleteAllById(ids);
	}

	@Override
	public void deleteAll(Iterable<? extends GatoVO> entities) {
		gr.deleteAll(entities);
	}

	@Override
	public void deleteAll() {
		gr.deleteAll();
	}

}