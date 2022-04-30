package com.proyecto.seguridad;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class Seguridad extends WebSecurityConfigurerAdapter {
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.authorizeRequests().antMatchers("/admin").access("hasRole('ADMIN')");
		http.authorizeRequests().antMatchers("/protectora").access("hasAnyRole('PROTECTORA','ADMIN')");
		http.authorizeRequests().antMatchers("/registrado").access("hasAnyRole('REGISTRADO','ADMIN')");
		http.authorizeRequests().antMatchers("/chat").access("hasAnyRole('REGISTRADO', 'PROTECTORA', 'ADMIN')");
		http.authorizeRequests().and().exceptionHandling().accessDeniedPage("/403");
		http.authorizeRequests().and().formLogin().loginPage("/login").failureUrl("/login?error=true");
	}

}