package com.proyecto.servicioImp;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.proyecto.modelo.ProtectoraVO;
import com.proyecto.repositorio.ProtectoraRepositorio;
import com.proyecto.servicio.ServicioProtectora;

@Service
public class ServicioProtectoraImpl implements ServicioProtectora {
	
	@Autowired
	private ProtectoraRepositorio pr;
	
	@Override
	public ProtectoraVO findByNombreUsuario(String nombreUsuario) {
		return pr.findByNombreUsuario(nombreUsuario);
	}
	
	@Override
	public <S extends ProtectoraVO> S save(S entity) {
		return pr.save(entity);
	}

	@Override
	public <S extends ProtectoraVO> Iterable<S> saveAll(Iterable<S> entities) {
		return pr.saveAll(entities);
	}

	@Override
	public Optional<ProtectoraVO> findById(Integer id) {
		return pr.findById(id);
	}

	@Override
	public boolean existsById(Integer id) {
		return pr.existsById(id);
	}

	@Override
	public Iterable<ProtectoraVO> findAll() {
		return pr.findAll();
	}

	@Override
	public Iterable<ProtectoraVO> findAllById(Iterable<Integer> ids) {
		return pr.findAllById(ids);
	}

	@Override
	public long count() {
		return pr.count();
	}

	@Override
	public void deleteById(Integer id) {
		pr.deleteById(id);
	}

	@Override
	public void delete(ProtectoraVO entity) {
		pr.delete(entity);
	}

	@Override
	public void deleteAllById(Iterable<? extends Integer> ids) {
		pr.deleteAllById(ids);
	}

	@Override
	public void deleteAll(Iterable<? extends ProtectoraVO> entities) {
		pr.deleteAll(entities);
	}

	@Override
	public void deleteAll() {
		pr.deleteAll();
	}
	
}