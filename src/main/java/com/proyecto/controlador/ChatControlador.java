package com.proyecto.controlador;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.proyecto.dto.ChatDTO;

@Controller
public class ChatControlador {
	
	@MessageMapping("mandarMensaje")
	@SendTo("/sala/recibirMensaje")
	public ChatDTO chatConUsuarios(ChatDTO chatDTO) {
		return chatDTO;
	}

}