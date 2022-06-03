window.onload = function() {

	// DECLARACIÓN DE CONSTANTES Y VARIABLES

	const contenedorMostrar = document.querySelector(".contenedor-mostrar");
	var numeroFichas = 0;
	var index = 1;

	// LLAMADA A FUNCIÓN INICIAL

	fetchGatos();

	// FUNCIÓN QUE HACE FETCH A LA TABLA GATOS

	async function fetchGatos() {
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();
		fichasGatos(gatos)
	};

	// FUNCIÓN QUE FILTRA LOS GATOS NO ADOPTADOS Y LOS RECORRE CREANDO, DINÁMICAMENTE, Y SIEMPRE QUE
	// EL GATO EXISTA EN LA BASE DE DATOS, UNAS FICHAS CON SU INFORMACIÓN QUE LUEGO AÑADEN AL HTML
	// Y VAN SUMANDO UNIDADES A LA VARIABLE DE NÚMERO DE FICHAS

	function fichasGatos(gatos) {

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
			let fichaGato = document.createElement("div");
			fichaGato.classList.add("fichaGato");
			fichaGato.style.backgroundImage = `url(${gato.foto}`;

			fichaGato.appendChild(nombre);
			fichaGato.appendChild(descripcion);
			fichaGato.appendChild(edad);
			fichaGato.appendChild(sexo);
			fichaGato.appendChild(protectora);
			contenedorMostrar.appendChild(fichaGato);

			numeroFichas += 1;

		}

	}

	// FUNCIÓN QUE MUEVE EL CONTENEDOR DE LAS FICHAS HACIA LA IZQUIERDA AL HACER CLICK EN EL BOTÓN
	// MIENTRAS QUE NO SE ESTÉ EN LA PRIMERA FICHA, CALCULANDO EL DESPLAZAMIENTO A TRAVÉS DE
	// LA POSICIÓN ACTUAL DEL CONTENEDOR Y, FINALMENTE, RESTANDO UNA UNIDAD AL ÍNDICE

	document.querySelector(".prev").addEventListener("click", function moverFichasPrev() {
		if (index == 1) return;
		contenedorMostrar.style.right = parseInt(contenedorMostrar.style.right || 0) - 1335 + "px";
		index--;
	});

	// FUNCIÓN QUE MUEVE EL CONTENEDOR DE LAS FICHAS HACIA LA DERECHA AL HACER CLICK EN EL BOTÓN
	// MIENTRAS QUE NO SE SUPERE EL NÚMERO TOTAL DE FICHAS, CALCULANDO EL DESPLAZAMIENTO A TRAVÉS DE
	// LA POSICIÓN ACTUAL DEL CONTENEDOR Y, FINALMENTE, SUMANDO UNA UNIDAD AL ÍNDICE

	document.querySelector(".next").addEventListener("click", function moverFichasNext() {
		if (index == numeroFichas) return;
		contenedorMostrar.style.right = parseInt(contenedorMostrar.style.right || 0) + 1335 + "px";
		index++;
	});

}