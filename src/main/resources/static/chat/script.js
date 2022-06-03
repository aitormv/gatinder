window.onload = function () {

	// DECLARACIÓN DE CONSTANTES Y VARIABLES
	
	const rol = localStorage.getItem("rol");
	const nombreUsuario = localStorage.getItem("nombreUsuario");
	const nombreUsuarioProtectora = localStorage.getItem("nombreUsuarioProtectora");
	const username = document.querySelector(".username");
	const nombreDestinatario = document.querySelector(".destinatario");
	var stompClient;

	// LLAMADAS A FUNCIONES INICIALES
	
	fetchUsuario();
	empezarMensajear();

	// FUNCIÓN QUE, DEPENDIENDO DEL ROL DEL USUARIO QUE SE CONECTA AL CHAT, HACE FETCH A UN USUARIO REGISTRADO
	// O A UNA PROTECTORA, MOSTRANDO EN PANTALLA SU NOMBRE Y, EN EL CASO DEL USUARIO, EL DEL DESTINATARIO
	
	async function fetchUsuario() {
		
		if (rol == 1) {
			let respuestaU = await fetch(`/api/usuarios/encontrarPorUsuario?nombreUsuario=${nombreUsuario}`);
			let usuario = await respuestaU.json();
			username.innerHTML = 'Bienvenido, ' + usuario.nombreUsuario;
			if (nombreUsuarioProtectora == null) return;
			destinatario = nombreUsuarioProtectora;
			nombreDestinatario.innerHTML = 'Estás hablando con ' + destinatario;
		}
		
		if (rol == 2 || rol == 11) {
			let respuestaP = await fetch(`/api/protectoras/encontrarPorUsuario?nombreUsuario=${nombreUsuario}`);
			let protectora = await respuestaP.json();
			username.innerHTML = 'Bienvenido, ' + protectora.nombreUsuario;
			destinatario = "";
		}
	
	};

	// FUNCIÓN QUE UTILIZA LAS LIBRERÍAS DE SOCKJS Y STOMPCLIENT PARA INICIAR LA CONEXIÓN AL CHAT
	
	function empezarMensajear() {
		
		var socket = new SockJS("/websocket");
 		stompClient = Stomp.over(socket);

 		stompClient.connect({}, function connect() {

			// FUNCIÓN QUE SUSCRIBE AL USUARIO A LA SALA DE CHAT, DONDE ESPERAR UN MENSAJE
			// Y DEPENDIENDO DE SI ES SU DESTINATARIO O NO, LO MUESTRA
	
			stompClient.subscribe("/sala/recibirMensaje", function recibirMensaje(mensajeRecibido) {
		    	var mensaje = JSON.parse(mensajeRecibido.body);
				if (mensaje.enviadoPor == nombreUsuario) return;
				if (rol == 1 && mensaje.enviadoA == nombreUsuario) mostrarMensajesRecibidos(mensaje);
				if (rol == 2 || rol == 11 && mensaje.enviadoA == nombreUsuario) return;
				mostrarMensajesRecibidos(mensaje);
			});
			
		});
		
	};

	// FUNCIÓN QUE GENERA UN CÓDIGO DE HTML CON LA INFORMACIÓN DEL MENSAJE RECIBIDO
	
	function mostrarMensajesRecibidos(mensaje) {
		
	    const mensajesRecibidosHTML = `
	        <div class="fila">
		        <div class="tarjetaMensaje">
		            <div class="cuerpoTarjeta">
		                <div class="p1">
		                    <small class="floatRight">
		                    	${mensaje.enviadoPor}
		                    </small>
		                    <small class="floatLeft">
		                        ${mensaje.enviadoEn}
		                    </small>
		                </div>
		                <hr class="texto">
		                <p class="card-text-recieved">
		                    ${mensaje.mensaje}
		                </p>
		            </div>
		        </div>
	    	</div>
		`;
		
		mostrarMensajesVentana(mensajesRecibidosHTML);
		
	};

	// FUNCIÓN QUE RECOGE EL VALOR DEL INPUT DEL CHAT Y SE LO PONE A UN MENSAJE
	
	document.querySelector(".mensaje_enviar").addEventListener("click", function submitMensaje(e) {
		
	    e.preventDefault();

	    var mensajeInput = document.querySelector(".mensaje_texto");
	    var mensaje = mensajeInput.value;
	    mensajeInput.value = "";

	    enviarMensajeUsuarios(mensaje);
	    mostrarMensajesPropios(mensaje);

	});

	// FUNCIÓN QUE UTILIZA LA LIBRERÍA DE STOMPCLIENT PARA ENVIAR UN MENSAJE A LA SALA
	// CON LOS VALORES DEL TIEMPO REAL DE ENVÍO, EL EMISOR, EL DESTINATARIO Y SU CONTENIDO EN TEXTO
	
	function enviarMensajeUsuarios(mensaje) {
		
		stompClient.send("/chatUsuarios/mandarMensaje", {}, JSON.stringify({
		    enviadoEn: getCurrentTime(),
		    enviadoPor: nombreUsuario,
			enviadoA: destinatario,
		    mensaje: mensaje
		}));
		
	};

	// FUNCIÓN QUE GENERA UN CÓDIGO DE HTML CON LA INFORMACIÓN DE LOS MENSAJES DEL PROPIO USUARIO
	
	function mostrarMensajesPropios(mensaje) {
		
		const mensajesPropiosHTML = `
	        <div class="fila">
		        <div class="tarjetaMensaje">
		            <div class="cuerpoTarjeta">
		                <div class="p1">
		                    <small class="floatLeft">
		                    	${nombreUsuario}
		                    </small>
		                    <small class="floatRight">
		                        ${getCurrentTime()}
		                    </small>
		                </div>
		                <hr class="texto">
		                <p class="card-text-sent">
		                    ${mensaje}
		                </p>
		            </div>
		        </div>
	    	</div>
		`;
		
		mostrarMensajesVentana(mensajesPropiosHTML);
		
	};

	// FUNCIÓN QUE AÑADE AL HTML LAS CADENAS GENERADAS ANTERIORMENTE Y RECOGE EL DESTINATARIO
	// PARA LAS PROTECTORAS
	
    function mostrarMensajesVentana(mensajesHTML) {
	
		const historial = document.querySelector(".historial");
		const cajaMensajes = document.createElement("div");
		cajaMensajes.innerHTML = mensajesHTML;
		historial.append(cajaMensajes);
		historial.scrollTop = historial.scrollHeight;
		
		if (rol == 2 || rol == 11) destinatario = document.querySelector(".floatLeft").innerText;
		
	};

	// FUNCIÓN QUE GENERA LA HORA Y MINUTOS ACTUALES
	
	function getCurrentTime() {
	    const now = new Date();
	    return now.getHours() + ':' + now.getMinutes();
	};
	
};