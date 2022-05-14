window.onload = function () {

	// DECLARACIÓN DE CONSTANTES Y VARIABLES
	
	const ficha1 = document.querySelector(".ficha1");
	const ficha2 = document.querySelector(".ficha2");
	const subidaFotoU = document.querySelector(".subidaFotoU");
	const fotoPerfilU = document.querySelector("#fotoPerfilU");
	const visualizarFotoU = document.querySelector(".visualizarFotoU");
	const subidaFotoP = document.querySelector(".subidaFotoP");
	const fotoPerfilP = document.querySelector(".fotoPerfilP");
	const visualizarFotoP = document.querySelector(".visualizarFotoP");
	
	let subirFotoU = document.querySelector(".subirFotoU");
	
	// FUNCIÓN QUE SUBE AL SERVIDOR LA FOTO DEL USUARIO
	
	subirFotoU.addEventListener("click", async function subirFotoUsuario() {
		
		/*let respuesta;
		
		let dataForm = new FormData();
		dataForm.append("file", subidaFotoU.files[0]);*/
		
		fotoPerfilU.value = subidaFotoU.value;

  		/*respuesta = await fetch('/api/usuarios/upload', {
			headers: {'Access-Control-Allow-Origin':'*'},
    		method: 'POST', 
    		body: dataForm
  		});*/

		visualizarFotoU.src = fotoPerfilU.value;
		//await respuesta.json();

  	});

	// FUNCIÓN QUE VALIDA LOS DATOS E INSERTA EL NUEVO USUARIO

    let botonGuardarUsuario = document.querySelector(".botonGuardarUsuario");

    botonGuardarUsuario.addEventListener("click", async function guardar() {
	
		let inputFoto = document.querySelector(".subidaFotoU");
		let inputNombre = document.querySelector(".nombreU");
		let inputApellidos = document.querySelector(".apellidosU");
		let inputFecha = document.querySelector(".fechaNacimientoU");
		let inputLocalidad = document.querySelector(".localidadU");
		let inputTelefono = document.querySelector(".telefonoU");
		let inputEmail = document.querySelector(".emailU");
		let inputNombreUsuario = document.querySelector(".nombreUsuarioU");
		let inputPassword = document.querySelector(".passwordU");
		
		if (inputFoto.value.trim() == "" || inputNombre.value.trim() == "" ||
		inputApellidos.value.trim() == "" || inputFecha.value.trim() == "" ||
		inputLocalidad.value.trim() == "" || inputTelefono.value.trim() == "" ||
		inputEmail.value.trim() == "" || inputNombreUsuario.value.trim() == "" ||
		inputPassword.value.trim() == "") {
			document.querySelector(".mensajeU").innerHTML = 'Error al registrarse';
			return;
		}

        let respuesta;
    
        let dataForm = new FormData(ficha1);
        const formJSON = Object.fromEntries(dataForm.entries());
    
        respuesta = await fetch('/api/usuarios/insertar', {
            headers: {'Access-Control-Allow-Origin':'*', 'Accept': 'application/json', 'Content-Type':'application/json; charset=utf-8'},
            method: 'POST',
            body: JSON.stringify(formJSON)
        });

		document.querySelector(".mensajeU").innerHTML = 'Registro exitoso';
		ficha1.reset();
        window.open("/login");
		await respuesta.json();
		
    });

	let subirFotoP = document.querySelector(".subirFotoP");
	
	// FUNCIÓN QUE SUBE AL SERVIDOR LA FOTO DE LA PROTECTORA
	
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
		await respuesta.json();

  	});

    let botonGuardarProtectora = document.querySelector(".botonGuardarProtectora");

	// FUNCIÓN QUE VALIDA LOS DATOS E INSERTA LA NUEVA PROTECTORA

    botonGuardarProtectora.addEventListener("click", async function guardar() {
	
		let inputFoto = document.querySelector(".subidaFotoP");
		let inputDenominacion = document.querySelector(".denominacionP");
		let inputLocalidad = document.querySelector(".localidadP");
		let inputTelefono = document.querySelector(".telefonoP");
		let inputEmail = document.querySelector(".emailP");
		let inputNombreUsuario = document.querySelector(".nombreUsuarioP");
		let inputPassword = document.querySelector(".passwordP");
		
		if (inputFoto.value.trim() == "" || inputDenominacion.value.trim() == "" ||
		inputLocalidad.value.trim() == "" ||inputTelefono.value.trim() == "" ||
		inputEmail.value.trim() == "" || inputNombreUsuario.value.trim() == "" ||
		inputPassword.value.trim() == "") {
			document.querySelector(".mensajeP").innerHTML = 'Error al registrarse';
			return;
		}

        let respuesta;
    
        let dataForm = new FormData(ficha2);
        const formJSON = Object.fromEntries(dataForm.entries());
    
        respuesta = await fetch('/api/protectoras/insertar', {
            headers: {'Access-Control-Allow-Origin':'*', 'Accept': 'application/json', 'Content-Type':'application/json; charset=utf-8'},
            method: 'POST',
            body: JSON.stringify(formJSON)
        });

		document.querySelector(".mensajeP").innerHTML = 'Registro exitoso';
		ficha2.reset();
		window.open("/login");
		await respuesta.json();
    
    });

};