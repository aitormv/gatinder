window.onload = function () {

	const nombreUsuario = localStorage.getItem("nombreUsuario");
	const denominacionP = document.querySelector(".denominacionP")
    const contenedorMostrar = document.querySelector(".contenedor-mostrar");
    const contenedorForm = document.querySelector(".contenedor-form");
	const ficha = document.querySelector(".ficha");
	const contenedorFormProtectora = document.querySelector(".contenedor-form-protectora");
	const fichaProtectora = document.querySelector(".fichaProtectora");
	const modificar = document.querySelector(".modificar");
	const botonGuardarProtectora = document.querySelector(".botonGuardarProtectora");
	const botonCerrar = document.querySelector(".botonCerrar");
    const contenedorBuscar = document.querySelector(".contenedor-buscar");
	const buscador = document.querySelector(".buscador");
	const confirmarBorrado = document.querySelector(".confirmarBorrado");
	
    var inputNombre = document.querySelector(".inputNombre");
    var operacion = "";
	
	fetchProtectora();
	
	async function fetchProtectora() {
		let respuesta = await fetch(`/api/protectoras/encontrarPorUsuario?nombreUsuario=${nombreUsuario}`);
		let protectora = await respuesta.json();
		denominacionP.innerHTML = protectora.denominacion;
	};

    document.querySelector(".mostrarFichas").addEventListener("click", async function fetchGatos() {
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();	
		fichasGatos(gatos)
	});

    buscador.addEventListener("click", function buscar() {
		if(contenedorBuscar.style.visibility == "visible") {
			contenedorBuscar.style.visibility = "hidden";
		} else {
			contenedorBuscar.style.visibility = "visible";
		}
    });

    document.querySelector(".botonFiltrar").addEventListener("click", async function filtrar() {
		contenedorBuscar.style.visibility = "hidden";
		let respuesta = await fetch('/api/gatos');
		let gatos = await respuesta.json();	
        let seleccion = gatos.filter(gato => gato.nombre == inputNombre.value);
        limpiarFichas();
		fichasGatos(seleccion);
    });

    function limpiarFichas() {
        const fichasLimpiar = document.querySelectorAll(".fichaGato");
        for(fichaLimpiar of fichasLimpiar) {
            contenedorMostrar.removeChild(fichaLimpiar)
        }
    };

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
	
	botonCerrar.addEventListener("click", function cerrar() {
		contenedorFormProtectora.style.visibility = "hiddden";
	});
	
	botonGuardarProtectora.addEventListener("click", async function guardarProtectora() {
        let respuesta;
    
        let dataForm = new FormData(fichaProtectora);
        const formJSONP = Object.fromEntries(dataForm.entries());
        console.log("Form a JSON...", JSON.stringify(formJSONP));

        respuesta = await fetch('/api/protectoras/actualizar', {
        	headers: {'Access-Control-Allow-Origin':'*', 'Accept': 'application/json', 'Content-Type':'application/json; charset=utf-8'},
        	method: 'PUT',
        	body: JSON.stringify(formJSONP)
        });

        await respuesta.json();
	});

    function fichasGatos(gatos) {

        limpiarFichas();

        for(gato of gatos) {
			
            if(gato.idgato == undefined) {
                return;
            }

			for(protectora in gato.protectora) {
				if(gato.protectora["denominacion"] != denominacionP.innerHTML)
					return;
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
			for(usuarioGato in gato.usuario) {
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

			if(gato.usuario == null) {
				usuario.innerHTML = "Sin usuario";
			}

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

            botonActualizar.addEventListener("click", async function editarGato(e) {
                operacion = "update";
                idgato = e.target.parentNode.children[1].innerHTML.slice(22, 24);

                contenedorForm.style.visibility = "visible";

                document.querySelector("#idgato").classList.add("edit-id-disabled");
        
                let respuesta = await fetch('/api/gatos', {
					method: 'GET'
				});
                let gatos = await respuesta.json();
				let gato = gatos.filter(gato => gato.idgato == idgato);
        
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

            botonEliminar.addEventListener("click", function eliminarGato(e) {
                idgato = e.target.parentNode.children[1].innerHTML.slice(22, 24);
				
				confirmarBorrado.style.visibility = "visible";
				
				document.querySelector(".borradoNo").addEventListener("click", function noBorrar() {
					confirmarBorrado.style.visibility = "hidden";
					return;
				});
				
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

    document.querySelector(".botonInsertar").addEventListener("click", function insertarGato() {
        operacion = "insert";
        contenedorForm.style.visibility = "visible";
        document.querySelector("#idgato").classList.remove("edit-id-disabled");
    });

    let botonGuardar = document.querySelector(".botonGuardar");

    botonGuardar.addEventListener("click", async function guardar() {
        let respuesta;
    
        let dataForm = new FormData(ficha);
        const formJSON = Object.fromEntries(dataForm.entries());
        console.log("Form a JSON...", JSON.stringify(formJSON));
    
        switch(operacion) {
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
        console.log("Insert/update...", await respuesta.json());
    
    });

};