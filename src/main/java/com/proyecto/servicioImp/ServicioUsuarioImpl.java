package com.proyecto.servicioImp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.proyecto.modelo.ProtectoraVO;
import com.proyecto.modelo.UsuarioVO;
import com.proyecto.repositorio.ProtectoraRepositorio;
import com.proyecto.repositorio.UsuarioRepositorio;
import com.proyecto.servicio.ServicioUsuario;

@Service
public class ServicioUsuarioImpl implements UserDetailsService, ServicioUsuario {
	
	@Autowired
	private UsuarioRepositorio ur;
	
	@Autowired
	private ProtectoraRepositorio pr;
	
	@Override
	public UsuarioVO findByNombreUsuario(String nombreUsuario) {
		return ur.findByNombreUsuario(nombreUsuario);
	}

	@Override
	public UserDetails loadUserByUsername(String nombreUsuario) throws UsernameNotFoundException {
		
		UsuarioVO usuario = ur.findByNombreUsuario(nombreUsuario);
		ProtectoraVO protectora = pr.findByNombreUsuario(nombreUsuario);
		
		if (usuario == null && protectora == null) {
			throw new UsernameNotFoundException("El usuario " + nombreUsuario + " no existe en la base de datos");
		}
		
		if (usuario == null) {
			
			List<GrantedAuthority> grantList = new ArrayList<GrantedAuthority>();
			
			if (protectora.getRol()!=null) {
				GrantedAuthority authority = new SimpleGrantedAuthority(protectora.getRol().getNombre());
				grantList.add(authority);
			}
				
			UserDetails userDetails = (UserDetails) new User(protectora.getNombreUsuario(), protectora.getPassword(), grantList);
			
			return userDetails;
		}
		
		List<GrantedAuthority> grantList = new ArrayList<GrantedAuthority>();
		
		if (usuario.getRol()!=null) {
			GrantedAuthority authority = new SimpleGrantedAuthority(usuario.getRol().getNombre());
			grantList.add(authority);
		}
			
		UserDetails userDetails = (UserDetails) new User(usuario.getNombreUsuario(), usuario.getPassword(), grantList);
		
		return userDetails;
	}
	
	@Override
	public <S extends UsuarioVO> S save(S entity) {
		return ur.save(entity);
	}

	@Override
	public <S extends UsuarioVO> Iterable<S> saveAll(Iterable<S> entities) {
		return ur.saveAll(entities);
	}

	@Override
	public Optional<UsuarioVO> findById(Integer id) {
		return ur.findById(id);
	}

	@Override
	public boolean existsById(Integer id) {
		return ur.existsById(id);
	}

	@Override
	public Iterable<UsuarioVO> findAll() {
		return ur.findAll();
	}

	@Override
	public Iterable<UsuarioVO> findAllById(Iterable<Integer> ids) {
		return ur.findAllById(ids);
	}

	@Override
	public long count() {
		return ur.count();
	}

	@Override
	public void deleteById(Integer id) {
		ur.deleteById(id);
	}

	@Override
	public void delete(UsuarioVO entity) {
		ur.delete(entity);
	}

	@Override
	public void deleteAllById(Iterable<? extends Integer> ids) {
		ur.deleteAllById(ids);
	}

	@Override
	public void deleteAll(Iterable<? extends UsuarioVO> entities) {
		ur.deleteAll(entities);
	}

	@Override
	public void deleteAll() {
		ur.deleteAll();
	}

}