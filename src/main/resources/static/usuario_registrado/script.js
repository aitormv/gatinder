window.onload = function () {

	const nombreUsuario = localStorage.getItem("nombreUsuario");
	const nombreU = document.querySelector(".nombreU");
    const contenedorMostrar = document.querySelector(".contenedor-mostrar");
    const contenedorBuscar = document.querySelector(".contenedor-buscar");
    const buscador = document.querySelector(".buscador");
	const contenedorForm = document.querySelector(".contenedor-form");
	const modificar = document.querySelector(".modificar");
	const ficha = document.querySelector(".ficha");
	const botonGuardar = document.querySelector(".botonGuardar");
	var inputNombre = document.querySelector(".inputNombre");
	var inputEdad1 = document.querySelector(".inputEdad1");
	var inputEdad2 = document.querySelector(".inputEdad2");
	var inputSexo = document.querySelector(".inputSexo");

	fetchUsuario();
    fetchGatos();

	async function fetchUsuario() {
		let respuesta = await fetch(`/api/usuarios/encontrarPorUsuario?nombreUsuario=${nombreUsuario}`);
		const usuario = await respuesta.json();
		nombreU.innerHTML = usuario.nombre;
	};

    async function fetchGatos() {
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();	
		fichasGatos(gatos)
    };

    buscador.addEventListener("click", function buscar() {
        if(contenedorBuscar.style.visibility == "visible") {
			contenedorBuscar.style.visibility = "hidden";
		} else {
			contenedorBuscar.style.visibility = "visible";
		}
    });

    document.querySelector(".botonFiltrarNombre").addEventListener("click", async function filtrarNombre() {
		contenedorBuscar.style.visibility = "hidden";
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();	
        let seleccion = gatos.filter(gato => gato.nombre == inputNombre.value);
        limpiarFichas();
		fichasGatos(seleccion);
    });

    document.querySelector(".botonFiltrarEdad").addEventListener("click", async function filtrarEdad() {
		contenedorBuscar.style.visibility = "hidden";
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();	
        let seleccion = gatos.filter(gato => gato.edad >= inputEdad1.value && gato.edad <= inputEdad2.value);
        limpiarFichas();
		fichasGatos(seleccion);
    });

	document.querySelector(".botonFiltrarSexo").addEventListener("click", async function filtrarSexo() {
		contenedorBuscar.style.visibility = "hidden";
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();	
        let seleccion = gatos.filter(gato => gato.sexo == inputSexo.value);
        limpiarFichas();
		fichasGatos(seleccion);
	});
	
	document.querySelector(".botonRecargar").addEventListener("click", async function recargarFichas() {
		contenedorBuscar.style.visibility = "hidden";
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();
		limpiarFichas();
		fichasGatos(gatos);
	});

    function limpiarFichas() {
        const fichasLimpiar = document.querySelectorAll(".fichaGato");
        for(fichaLimpiar of fichasLimpiar) {
            contenedorMostrar.removeChild(fichaLimpiar)
        }
    }

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
	
	botonCerrar.addEventListener("click", function cerrar() {
		contenedorForm.style.visibility = "hiddden";
	});
	
	botonGuardar.addEventListener("click", async function guardar() {
        let respuesta;
    
        let dataForm = new FormData(ficha);
        const formJSON = Object.fromEntries(dataForm.entries());
        console.log("Form a JSON...", JSON.stringify(formJSON));

        respuesta = await fetch('/api/usuarios/actualizar', {
        	headers: {'Access-Control-Allow-Origin':'*', 'Accept': 'application/json', 'Content-Type':'application/json; charset=utf-8'},
        	method: 'PUT',
        	body: JSON.stringify(formJSON)
        });

        await respuesta.json();
	});

    function fichasGatos(gatos) {
	
		limpiarFichas();
		
		let seleccion = gatos.filter(gato => gato.adoptado == 0);

        for(gato of seleccion) {

            if(gato.idgato == undefined) {
                return;
            }

            let id = document.createElement("p");
            id.innerHTML = '<b>Identificador:</b> ' + gato.idgato;
            let nombre = document.createElement("p");
            nombre.innerHTML = '<b>Nombre:</b> ' + gato.nombre;
            let descripcion = document.createElement("p");
            descripcion.innerHTML = '<b>Descripción:</b> ' + gato.descripcion;
            let edad = document.createElement("p");
            edad.innerHTML = '<b>Edad:</b> ' + gato.edad;
            let foto = document.createElement("img");
            foto.src = gato.foto;
            foto.classList.add("fotoGato");
            let iconoLike = document.createElement("p");
            iconoLike.innerHTML = '<i class="fas fa-heart fa-2xl"></i>';
			let botonChat = document.createElement("button");
			botonChat.classList.add("botonChat");
			botonChat.innerHTML = 'ABRIR CHAT CON PROTECTORA';
            let fichaGato = document.createElement("div");

            fichaGato.classList.add("fichaGato");
            fichaGato.appendChild(foto);
            fichaGato.appendChild(id);
            fichaGato.appendChild(nombre);
            fichaGato.appendChild(descripcion);
            fichaGato.appendChild(edad);
            fichaGato.appendChild(iconoLike);
			fichaGato.appendChild(botonChat);
            contenedorMostrar.appendChild(fichaGato);

			iconoLike.addEventListener("click", function darLike() {
				botonChat.style.visibility = "visible";
			});
        
        }

    }

}