window.onload = function () {

    // DECLARACIÓN DE CONSTANTES Y VARIABLES

	const nombreUsuario = localStorage.getItem("nombreUsuario");
	const denominacionP = document.querySelector(".denominacionP");
	const fotoP = document.querySelector(".fotoP");
    const contenedorMostrar = document.querySelector(".contenedor-mostrar");
    const contenedorForm = document.querySelector(".contenedor-form");
	const ficha = document.querySelector(".ficha");
	const subidaFotoP = document.querySelector(".subidaFotoP");
	const fotoPerfilP = document.querySelector(".fotoPerfilP");
	const visualizarFotoP = document.querySelector(".visualizarFotoP");
	const subidaFotoG = document.querySelector(".subidaFotoG");
	const fotoG = document.querySelector(".fotoG");
	const visualizarFotoG = document.querySelector(".visualizarFotoG");
	const contenedorFormProtectora = document.querySelector(".contenedor-form-protectora");
	const fichaProtectora = document.querySelector(".fichaProtectora");
	const modificar = document.querySelector(".modificar");
	const botonGuardarProtectora = document.querySelector(".botonGuardarProtectora");
	const botonCerrarP = document.querySelector(".botonCerrarP");
    const contenedorBuscar = document.querySelector(".contenedor-buscar");
	const buscador = document.querySelector(".buscador");
	const confirmarBorrado = document.querySelector(".confirmarBorrado");
	var idProtectora = 0;
    var inputNombre = document.querySelector(".inputNombre");
    var operacion = "";

	// LLAMADA A FUNCIÓN INICIAL
	
	fetchProtectora();
	
	// FUNCIÓN QUE HACE FETCH AL USUARIO PROTECTORA A TRAVÉS DE LA CONSTANTE RECOGIDA EN EL LOGIN
	// Y MUESTRA EN PANTALLA SU DENOMINACIÓN Y FOTO DE PERFIL, A LA VEZ QUE SE RECOGE SU ID Y SE GUARDA EN LOCALSTORAGE SU ROL
	
	async function fetchProtectora() {
		let respuesta = await fetch(`/api/protectoras/encontrarPorUsuario?nombreUsuario=${nombreUsuario}`);
		let protectora = await respuesta.json();
		denominacionP.innerHTML = protectora.denominacion;
		fotoP.src = protectora.fotoPerfil;
		idProtectora = protectora.idprotectora;
		localStorage.setItem("rol", protectora.rol.idrol);
	};
	
	// FUNCIÓN QUE HACE FETCH A LA TABLA DE GATOS

    document.querySelector(".mostrarFichas").addEventListener("click", async function fetchGatos() {
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();	
		fichasGatos(gatos)
	});
	
	// FUNCIÓN QUE ABRE Y CIERRA EL MENÚ DEL BUSCADOR

    buscador.addEventListener("click", function buscar() {
		if (contenedorBuscar.style.visibility == "visible") contenedorBuscar.style.visibility = "hidden";
		else contenedorBuscar.style.visibility = "visible";
    });

	// FUNCIÓN QUE FILTRA LOS GATOS POR NOMBRE UTILIZANDO EL VALOR BUSCADO EN EL INPUT

    document.querySelector(".botonFiltrar").addEventListener("click", async function filtrar() {
		contenedorBuscar.style.visibility = "hidden";
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();	
        let seleccion = gatos.filter(gato => gato.nombre == inputNombre.value);
        limpiarFichas();
		fichasGatos(seleccion);
    });

	// FUNCIÓN QUE ELIMINA DEL HTML LAS FICHAS DE GATOS DE CARA A SER MOSTRADAS TRAS UNA INSERCIÓN, ACTUALIZACIÓN O BORRADO

    function limpiarFichas() {
        const fichasLimpiar = document.querySelectorAll(".fichaGato");
        for (fichaLimpiar of fichasLimpiar) {
            contenedorMostrar.removeChild(fichaLimpiar);
        }
    };

	let subirFotoP = document.querySelector(".subirFotoP");
	
	// FUNCIÓN QUE SE ACTIVA AL HACER CLICK EN EL BOTÓN DE SUBIR FOTO Y QUE RECOGE EL ARCHIVO DE IMAGEN SELECCIONADO
	// PARA ENVIARLO AL SERVIDOR MEDIANTE UNA PETICIÓN POST, MOSTRÁNDOLO POSTERIORMENTE EN EL DOCUMENTO
	
	subirFotoP.addEventListener("click", async function subirFotoProtectora() {
		
		let respuesta;
		
		let dataForm = new FormData();
		dataForm.append("file", subidaFotoP.files[0]);
		
		fotoPerfilP.value = "/img/" + subidaFotoP.value.slice(12);

  		respuesta = await fetch('/api/protectoras/upload', {
			headers: {'Access-Control-Allow-Origin':'*'},
    		method: 'POST', 
    		body: dataForm
  		});

		visualizarFotoP.src = fotoPerfilP.value;
		await respuesta();

  	});

	// FUNCIÓN QUE HACE FETCH AL USUARIO PROTECTORA, PONE VISIBLE EL MENÚ DE EDITAR PERFIL
	// Y SELECCIONA, PARA LOS CAMPOS DEL FORMULARIO, LOS VALORES QUE TIENE EN ESE MOMENTO

    modificar.addEventListener("click", async function editarUsuario() {
		let respuesta = await fetch(`/api/protectoras/encontrarPorUsuario?nombreUsuario=${nombreUsuario}`);
		let protectora = await respuesta.json();
		
    	contenedorFormProtectora.style.visibility = "visible";
        
		fichaProtectora.idprotectora.value = protectora.idprotectora;
        fichaProtectora.denominacion.value = protectora.denominacion;
        fichaProtectora.localidad.value = protectora.localidad;
        fichaProtectora.telefono.value = protectora.telefono;
        fichaProtectora.email.value = protectora.email;
        fichaProtectora.localidad.value = protectora.localidad;
        fichaProtectora.nombreUsuario.value = protectora.nombreUsuario;
		fichaProtectora.fotoPerfil.value = protectora.fotoPerfil;
	});
	
	// FUNCIÓN QUE OCULTA EL MENÚ DE EDITAR PERFIL
	
	botonCerrarP.addEventListener("click", function cerrar() {
		contenedorFormProtectora.style.visibility = "hidden";
	});
	
	// FUNCIÓN QUE GUARDA LOS DATOS DEL PERFIL ACTUALIZADO MEDIANTE UN MÉTODO POST
	
	botonGuardarProtectora.addEventListener("click", async function guardarProtectora() {
        let respuesta;
    
        let dataForm = new FormData(fichaProtectora);
        const formJSONP = Object.fromEntries(dataForm.entries());

        respuesta = await fetch('/api/protectoras/actualizar', {
        	headers: {'Access-Control-Allow-Origin':'*', 'Accept': 'application/json', 'Content-Type':'application/json; charset=utf-8'},
        	method: 'PUT',
        	body: JSON.stringify(formJSONP)
        });

        await respuesta.json();
	});
	
	// FUNCIÓN QUE MUESTRA LOS GATOS PERTENECIENTES A LA PROTECTORA Y GENERA, DE FORMA DINÁMICA, SUS DATOS EN FORMA DE FICHA

    function fichasGatos(gatos) {

        limpiarFichas();

        for (gato of gatos) {
			
            if (gato.idgato == undefined) return;

			for (protectora in gato.protectora) {
				if (gato.protectora["denominacion"] != denominacionP.innerHTML) return;
			}

            let titulo = document.createElement("h1");
            titulo.innerHTML = "FICHA DE GATO";
            let idgato = document.createElement("p");
            idgato.innerHTML = '<b>Identificador:</b> ' + gato.idgato;
            let nombre = document.createElement("p");
            nombre.innerHTML = '<b>Nombre:</b> ' + gato.nombre;
            let descripcion = document.createElement("p");
            descripcion.innerHTML = '<b>Descripción:</b> ' + gato.descripcion;
            let edad = document.createElement("p");
            edad.innerHTML = '<b>Edad:</b> ' + gato.edad;
			let sexo = document.createElement("p");
			sexo.innerHTML = '<b>Sexo:</b> ' + gato.sexo;
			let usuario = document.createElement("p");
			for (u in gato.usuario) {
				usuario.innerHTML = '<b>Usuario:</b> ' + gato.usuario["nombreUsuario"];
			}
            let foto = document.createElement("img");
            foto.src = gato.foto;
            foto.classList.add("fotoGato");
            let botonEliminar = document.createElement("button");
            botonEliminar.innerHTML = "ELIMINAR";
            let botonActualizar = document.createElement("button");
            botonActualizar.innerHTML = "ACTUALIZAR";
            let fichaGato = document.createElement("div");
            fichaGato.classList.add("fichaGato");

			if (gato.usuario == null) usuario.innerHTML = "Sin usuario";

            fichaGato.appendChild(titulo);
            fichaGato.appendChild(idgato);
            fichaGato.appendChild(nombre);
            fichaGato.appendChild(descripcion);
            fichaGato.appendChild(edad);
			fichaGato.appendChild(sexo);
			fichaGato.appendChild(usuario);
            fichaGato.appendChild(foto);
            fichaGato.appendChild(botonEliminar);
            fichaGato.appendChild(botonActualizar);
            contenedorMostrar.appendChild(fichaGato);

			let subirFotoG = document.querySelector(".subirFotoG");
			
			// FUNCIÓN DE SUBIDA DE FOTO DE GATO AL SERVIDOR
	
			subirFotoG.addEventListener("click", async function subirFotoGato() {
				
				let respuesta;
				
				let dataForm = new FormData();
				dataForm.append("file", subidaFotoG.files[0]);
				
				fotoG.value = "/img/" + subidaFotoG.value.slice(12);
		
		  		respuesta = await fetch('/api/gatos/upload', {
					headers: {'Access-Control-Allow-Origin':'*'},
		    		method: 'POST', 
		    		body: dataForm
		  		});
		
				visualizarFotoG.src = fotoG.value;
				await respuesta();
		
		  	});
	
			// FUNCIÓN QUE ESCOGE LA OPERACIÓN UPDATE, HACE VISIBLE EL MENÚ DE ACTUALIZAR LA FICHA DE UN GATO
			// Y RECOGE SUS VALORES ACTUALES PARA LOS CAMPOS

            botonActualizar.addEventListener("click", async function editarGato(e) {
                operacion = "update";
                idgato = e.target.parentNode.children[1].innerHTML.slice(22, 24);

                contenedorForm.style.visibility = "visible";

                document.querySelector("#idgato").classList.add("edit-id-disabled");
        
                let respuesta = await fetch('/api/gatos');
                let gatos = await respuesta.json();
				let gato = gatos.filter(gato => gato.idgato == idgato);
        
                visualizarFotoG.src = gato[0].foto;
				ficha.idgato.value = gato[0].idgato;
                ficha.acogido.value = gato[0].acogido.data;
                ficha.adoptado.value = gato[0].adoptado.data;
                ficha.descripcion.value = gato[0].descripcion;
                ficha.edad.value = gato[0].edad;
                ficha.foto.value = gato[0].foto;
                ficha.nombre.value = gato[0].nombre;
                ficha.sexo.value = gato[0].sexo;
				ficha.nombreUsuario.value = gato[0].usuario["nombreUsuario"];
            });

			// FUNCIÓN QUE RECOGE EL ID DEL GATO Y MUESTRA EL MENÚ DE CONFIRMACIÓN DE BORRADO

            botonEliminar.addEventListener("click", function eliminarGato(e) {
                idgato = e.target.parentNode.children[1].innerHTML.slice(22, 24);
				
				confirmarBorrado.style.visibility = "visible";
				
				// FUNCIÓN QUE CIERRA EL MENÚ SIN REALIZAR EL BORRADO
				
				document.querySelector(".borradoNo").addEventListener("click", function noBorrar() {
					confirmarBorrado.style.visibility = "hidden";
					return;
				});
				
				// FUNCIÓN QUE LLAMA AL MÉTODO DELETE PARA ELIMINAR LA FICHA DE GATO
				
				document.querySelector(".borradoYes").addEventListener("click", async function borrar() {
					respuesta = await fetch(`/api/gatos/eliminar?idgato=${idgato}`, {
                		method: 'DELETE'
                	});
					
					confirmarBorrado.style.visibility = "hidden";
					limpiarFichas();
				});
				
            });

        };

    };

	// FUNCIÓN QUE ESCOGE LA OPERACIÓN INSERT, ABRE EL MENÚ DE INSERTAR FICHA DE GATO Y DEJA EDITAR SU ID

    document.querySelector(".botonInsertar").addEventListener("click", function insertarGato() {
        operacion = "insert";
        contenedorForm.style.visibility = "visible";
        document.querySelector("#idgato").classList.remove("edit-id-disabled");
		document.querySelector("#idprotectora").value = idProtectora;
    });

    let botonGuardar = document.querySelector(".botonGuardar");

	// FUNCIÓN QUE, DEPENDIENDO DEL TIPO DE OPERACIÓN, INSERTA O ACTUALIZA UNA FICHA DE GATO

    botonGuardar.addEventListener("click", async function guardar() {
        let respuesta;
    
        let dataForm = new FormData(ficha);
        const formJSON = Object.fromEntries(dataForm.entries());
    
        switch (operacion) {
            case "update":
                respuesta = await fetch('/api/gatos/actualizar', {
                    headers: {'Access-Control-Allow-Origin':'*', 'Accept': 'application/json', 'Content-Type':'application/json; charset=utf-8'},
                    method: 'PUT',
                    body: JSON.stringify(formJSON)
                });
                break;
        
            case "insert":
                respuesta = await fetch('/api/gatos/insertar', {
                    headers: {'Access-Control-Allow-Origin':'*', 'Accept': 'application/json', 'Content-Type':'application/json; charset=utf-8'},
                    method: 'POST',
                    body: JSON.stringify(formJSON)
                });
                break;
        };
        await respuesta.json();
    
    });

};