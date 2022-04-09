package com.proyecto.seguridad;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class Seguridad extends WebSecurityConfigurerAdapter {
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		BCryptPasswordEncoder codificadorBCrypt = new BCryptPasswordEncoder();
		return codificadorBCrypt;
	}
	
	public static String encripta(String password) {
		BCryptPasswordEncoder codificador = new BCryptPasswordEncoder();
		return codificador.encode(password);
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("admin").password(encripta("temporal")).roles("admin")
		.and().withUser("registrado").password(encripta("temporal")).roles("registrado")
		.and().withUser("protectora").password(encripta("temporal")).roles("protectora");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.authorizeRequests().antMatchers("/admin").access("hasRole('admin')");
		http.authorizeRequests().antMatchers("/registrado").access("hasAnyRole('registrado','admin')");
		http.authorizeRequests().antMatchers("/protectora").access("hasAnyRole('protectora','admin')");
		http.authorizeRequests().and().exceptionHandling().accessDeniedPage("/403");
		//http.authorizeRequests().and().formLogin().loginPage("/login").failureUrl("/login?error=true");
	}

}