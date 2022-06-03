window.onload = function() {

	// DECLARACIÓN DE CONSTANTES Y VARIABLES

	const nombreUsuario = localStorage.getItem("nombreUsuario");
	const menuDesplegable = document.querySelector(".menuDesplegable");
	const panelControl = document.querySelector(".panelControl");
	const panelControlDesplegable = document.querySelector(".panelControlDesplegable");

	// LLAMADA A FUNCIÓN INICIAL

	fetchAdmin();

	// FUNCIÓN QUE HACE FETCH AL USUARIO A TRAVÉS DE LA CONSTANTE RECOGIDA EN EL LOGIN
	// Y SI TIENE ROL DE ADMINISTRADOR MUESTRA EN EL MENÚ EL PANEL DE CONTROL

	async function fetchAdmin() {
		if (nombreUsuario == null) return;
		let respuesta = await fetch(`/api/usuarios/encontrarPorUsuario?nombreUsuario=${nombreUsuario}`);
		let usuario = await respuesta.json();
		if (usuario.rol.idrol == 21) {
			panelControl.style.display = "flex";
			panelControlDesplegable.style.display = "flex";
		}
		else {
			panelControl.style.display = "none";
			panelControlDesplegable.style.display = "none";
		}
	};

	// FUNCIÓN QUE HACE VISIBLE Y OCULTA EL MENÚ DESPLEGABLE AL HACER CLICK EN EL BOTÓN

	document.querySelector(".botonMenu").addEventListener("click", function abrirMenu() {
		if (menuDesplegable.style.opacity == 0) menuDesplegable.style.opacity = 1;
		else menuDesplegable.style.opacity = 0;
	});

	// FUNCIONES DE MENÚ ABIERTO Y DESPLEGABLE QUE ABREN UNA VENTANA
	// CON EL GESTOR DE CORREO ELECTRÓNICO PREDETERMINADO PARA ENVIAR UN MENSAJE DE REPORTE DE ERRORES

	document.querySelector(".bugReport1").addEventListener("click", function mandarCorreo1() {
		window.open("mailto:gatinder@app.com?subject=bug");
	});

	document.querySelector(".bugReport2").addEventListener("click", function mandarCorreo2() {
		window.open("mailto:gatinder@app.com?subject=bug");
	});

	// FUNCION QUE ABRE LA VISTA DE USUARIO ANÓNIMO AL HACER CLICK EN EL LOGO

	document.querySelector(".logo").addEventListener("click", function abrirUsuariosAnonimos() {
		window.open("/anonimo");
	});

};