window.onload = function() {

	// DECLARACIÓN DE CONSTANTES Y VARIABLES

	const nombreUsuario = localStorage.getItem("nombreUsuario");
	const nombreU = document.querySelector(".nombreU");
	const fotoU = document.querySelector(".fotoU");
	const contenedorPrincipal = document.querySelector(".contenedor-principal");
	const contenedorMostrar = document.querySelector(".contenedor-mostrar");
	const contenedorBuscar = document.querySelector(".contenedor-buscar");
	const buscador = document.querySelector(".buscador");
	const contenedorForm = document.querySelector(".contenedor-form");
	const modificar = document.querySelector(".modificar");
	const ficha = document.querySelector(".ficha");
	const botonGuardar = document.querySelector(".botonGuardar");
	const botonCerrar = document.querySelector(".botonCerrar");
	const gatosUsuario = document.querySelector(".gatosUsuario");
	const divGatosUsuario = document.querySelector(".contenedor-gatosUsuario");
	var inputNombre = document.querySelector(".inputNombre");
	var inputEdad1 = document.querySelector(".inputEdad1");
	var inputEdad2 = document.querySelector(".inputEdad2");
	var inputSexo = document.querySelector(".inputSexo");
	var numeroFichas = 0;
	var index = 1;
	var divP = "";

	// LLAMADAS A FUNCIONES INICIALES

	fetchUsuario();
	fetchGatos();

	// FUNCIÓN QUE HACE FETCH AL USUARIO A PARTIR DE SU USERNAME, MUESTRA EN EL HTML SU NOMBRE Y FOTO DE PERFIL
	// Y GUARDA EN LOCALSTORAGE SU ROL A LA VEZ QUE DEJA EL USERNAME DE LA PROTECTORA VACÍO

	async function fetchUsuario() {
		let respuesta = await fetch(`/api/usuarios/encontrarPorUsuario?nombreUsuario=${nombreUsuario}`);
		let usuario = await respuesta.json();
		nombreU.innerHTML += usuario.nombre;
		fotoU.src = usuario.fotoPerfil;
		pintarGatosUsuario(usuario);
		localStorage.setItem("rol", usuario.rol.idrol);
		localStorage.setItem("nombreUsuarioProtectora", "");
	};

	// FUNCIÓN QUE MUESTRA LOS GATOS QUE EL USUARIO TIENE EN ACOGIDA Y ADOPCIÓN

	function pintarGatosUsuario(usuario) {
		if (usuario.gatos == null) return;
		for (g of usuario.gatos) {
			let titulo = document.createElement("h1");
			titulo.innerHTML = 'Gatos adoptados y en acogida';
			let nombre = document.createElement("span");
			nombre.innerHTML = `<b>${g.nombre}</b> : `;
			let acogidoAdoptado = document.createElement("span");
			if (g.acogido) acogidoAdoptado.innerHTML = '<b>Acogido</b> <i class="fas fa-tent fa-lg"></i>';
			if (g.adoptado) acogidoAdoptado.innerHTML = '<b>Adoptado</b> <i class="fas fa-person-shelter fa-lg"></i>';
			divGatosUsuario.appendChild(titulo);
			divGatosUsuario.appendChild(nombre);
			divGatosUsuario.appendChild(acogidoAdoptado);
		}
	};

	// FUNCIÓN QUE MUESTRA EL MENÚ DE LOS GATOS DEL USUARIO

	gatosUsuario.addEventListener("click", function mostrarGatosUsuario() {
		if (divGatosUsuario.style.visibility == "visible") divGatosUsuario.style.visibility = "hidden";
		else divGatosUsuario.style.visibility = "visible";
	});

	// FUNCIÓN QUE HACE FETCH A LOS GATOS

	async function fetchGatos() {
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();
		fichasGatos(gatos);
	};

	// FUNCIÓN QUE ABRE Y CIERRA EL MENÚ DEL BUSCADOR

	buscador.addEventListener("click", function buscar() {
		if (contenedorBuscar.style.visibility == "visible") contenedorBuscar.style.visibility = "hidden";
		else contenedorBuscar.style.visibility = "visible";
	});

	// FUNCIÓN QUE FILTRA LOS GATOS POR NOMBRE

	document.querySelector(".botonFiltrarNombre").addEventListener("click", async function filtrarNombre() {
		contenedorBuscar.style.visibility = "hidden";
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();
		let seleccion = gatos.filter(gato => gato.nombre == inputNombre.value);
		limpiarFichas();
		numeroFichas = 0;
		fichasGatos(seleccion);
	});

	// FUNCIÓN QUE FILTRA LOS GATOS ENTRE EDADES

	document.querySelector(".botonFiltrarEdad").addEventListener("click", async function filtrarEdad() {
		contenedorBuscar.style.visibility = "hidden";
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();
		let seleccion = gatos.filter(gato => gato.edad >= inputEdad1.value && gato.edad <= inputEdad2.value);
		limpiarFichas();
		numeroFichas = 0;
		fichasGatos(seleccion);
	});

	// FUNCIÓN QUE FILTRA LOS GATOS POR SEXO

	document.querySelector(".botonFiltrarSexo").addEventListener("click", async function filtrarSexo() {
		contenedorBuscar.style.visibility = "hidden";
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();
		let seleccion = gatos.filter(gato => gato.sexo == inputSexo.value);
		limpiarFichas();
		numeroFichas = 0;
		fichasGatos(seleccion);
	});

	// FUNCIÓN QUE RECARGA LAS FICHAS ORIGINALES TRAS HACER UNA BÚSQUEDA

	document.querySelector(".botonRecargar").addEventListener("click", async function recargarFichas() {
		contenedorBuscar.style.visibility = "hidden";
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();
		limpiarFichas();
		numeroFichas = 0;
		fichasGatos(gatos);
	});

	// FUNCIÓN QUE ELIMINA LAS FICHAS DE GATOS

	function limpiarFichas() {
		const fichasLimpiar = document.querySelectorAll(".fichaGato");
		for (fichaLimpiar of fichasLimpiar) {
			contenedorMostrar.removeChild(fichaLimpiar)
		}
	}

	// FUNCIÓN QUE ABRE EL MENÚ DE MODIFICAR PERFIL DE USUARIO Y PONE LOS VALORES ACTUALES EN LOS CAMPOS DEL FORMULARIO

	modificar.addEventListener("click", async function editarUsuario() {
		let respuesta = await fetch(`/api/usuarios/encontrarPorUsuario?nombreUsuario=${nombreUsuario}`);
		let usuario = await respuesta.json();

		contenedorForm.style.visibility = "visible";

		ficha.idusuario.value = usuario.idusuario;
		ficha.nombre.value = usuario.nombre;
		ficha.apellidos.value = usuario.apellidos;
		ficha.sexo.value = usuario.sexo;
		ficha.fechaNacimiento.value = usuario.fechaNacimiento;
		ficha.localidad.value = usuario.localidad;
		ficha.telefono.value = usuario.telefono;
		ficha.email.value = usuario.email;
		ficha.nombreUsuario.value = usuario.nombreUsuario;
		ficha.fotoPerfil.value = usuario.fotoPerfil;
	});

	// FUNCIÓN QUE CIERRA EL MENÚ DE MODIFICAR EL PERFIL

	botonCerrar.addEventListener("click", function cerrar() {
		contenedorForm.style.visibility = "hiddden";
	});

	// FUNCIÓN QUE LANZA UNA PETICIÓN PUT AL SERVIDOR PARA ACTUALIZAR LOS DATOS DEL USUARIO

	botonGuardar.addEventListener("click", async function guardar() {
		let respuesta;

		let dataForm = new FormData(ficha);
		const formJSON = Object.fromEntries(dataForm.entries());

		respuesta = await fetch('/api/usuarios/actualizar', {
			headers: { 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8' },
			method: 'PUT',
			body: JSON.stringify(formJSON)
		});

		await respuesta.json();
	});

	// FUNCIÓN QUE FILTRA LOS GATOS NO ADOPTADOS PARA MOSTRARLOS EN EL HTML

	function fichasGatos(gatos) {

		limpiarFichas();

		let seleccion = gatos.filter(gato => gato.adoptado == 0);

		for (gato of seleccion) {

			if (gato.idgato == undefined) return;

			let nombre = document.createElement("p");
			nombre.innerHTML = gato.nombre;
			let descripcion = document.createElement("p");
			descripcion.innerHTML = gato.descripcion;
			let edad = document.createElement("p");
			edad.innerHTML = gato.edad + ' años';
			let sexo = document.createElement("p");
			sexo.innerHTML = gato.sexo;
			let protectora = document.createElement("span");
			protectora.innerHTML = 'Protectora ' + gato.protectora["denominacion"];
			protectora.classList.add("protectora");
			let botonInfo = document.createElement("span");
			botonInfo.innerHTML = ' <i class="fas fa-circle-info fa-lg"></i><br>';
			let iconoLike = document.createElement("i");
			iconoLike.innerHTML = '<br>';
			iconoLike.classList.add("iconoLike", "fas", "fa-heart", "fa-2xl");
			let br = document.createElement("br");
			let botonChat = document.createElement("button");
			botonChat.innerHTML = 'ABRIR CHAT CON PROTECTORA';
			botonChat.classList.add("botonChat");
			let fichaGato = document.createElement("div");
			fichaGato.classList.add("fichaGato");
			fichaGato.style.backgroundImage = `url(${gato.foto}`;

			fichaGato.appendChild(nombre);
			fichaGato.appendChild(descripcion);
			fichaGato.appendChild(edad);
			fichaGato.appendChild(sexo);
			fichaGato.appendChild(protectora);
			fichaGato.appendChild(botonInfo);
			fichaGato.appendChild(iconoLike);
			fichaGato.appendChild(br);
			fichaGato.appendChild(botonChat);
			contenedorMostrar.appendChild(fichaGato);

			// FUNCIÓN QUE MUESTRA EL BOTÓN DE ABRIR CHAT CON LA PROTECTORA

			iconoLike.addEventListener("click", function darLike() {
				iconoLike.style.color = "#CC998D";
				botonChat.style.visibility = "visible";
			});

			// FUNCIÓN QUE ABRE UNA VENTANA DE CHAT, COMUNICANDO ÚNICAMENTE CON LA PROTECTORA QUE LLEVA ESE GATO

			botonChat.addEventListener("click", async function abrirChatProtectora(e) {
				let denominacion = e.target.parentNode.children[4].innerHTML.slice(11);
				let respuesta = await fetch(`/api/protectoras/encontrarPorDenominacion?denominacion=${denominacion}`);
				let protectora = await respuesta.json();
				localStorage.setItem("nombreUsuarioProtectora", protectora.nombreUsuario);
				window.open("/chat");
			});

			numeroFichas += 1;

			// FUNCIÓN QUE MUESTRA UN PEQUEÑO MENÚ CON LA INFORMACIÓN DE LA PROTECTORA DEL GATO

			botonInfo.addEventListener("click", async function mostrarInfoProtectora(e) {
				let denominacion = e.target.parentNode.parentNode.children[4].innerHTML.slice(11);
				let respuesta = await fetch(`/api/protectoras/encontrarPorDenominacion?denominacion=${denominacion}`);
				let protectora = await respuesta.json();
				let denP = document.createElement("p");
				denP.innerHTML = '<b>Denominación:</b> ' + protectora.denominacion;
				let locP = document.createElement("p");
				locP.innerHTML = '<b>Localidad:</b> ' + protectora.localidad;
				let telP = document.createElement("p");
				telP.innerHTML = '<b>Teléfono:</b> ' + protectora.telefono;
				let emailP = document.createElement("p");
				emailP.innerHTML = '<b>Correo electrónico:</b> ' + protectora.email;
				divP = document.createElement("div");
				divP.classList.add("divP");
				divP.appendChild(denP);
				divP.appendChild(locP);
				divP.appendChild(telP);
				divP.appendChild(emailP);
				contenedorPrincipal.appendChild(divP);
			});

		}

	}

	// FUNCIÓN QUE DESPLAZA A LA IZQUIERDA LA FICHA DE GATO Y QUITA EL MENÚ DE INFORMACION DE LA PROTECTORA

	document.querySelector(".prev").addEventListener("click", function moverFichasPrev() {
		if (index == 1) return;
		contenedorMostrar.style.right = parseInt(contenedorMostrar.style.right || 0) - 1335 + "px";
		index--;
		contenedorPrincipal.removeChild(divP);
	});

	// FUNCIÓN QUE DESPLAZA A LA DERECHA LA FICHA DE GATO Y QUITA EL MENÚ DE INFORMACION DE LA PROTECTORA

	document.querySelector(".next").addEventListener("click", function moverFichasNext() {
		if (index == numeroFichas) return;
		contenedorMostrar.style.right = parseInt(contenedorMostrar.style.right || 0) + 1335 + "px";
		index++;
		contenedorPrincipal.removeChild(divP);
	});

}