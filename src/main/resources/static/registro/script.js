window.onload = function () {
	
	const ficha1 = document.querySelector(".ficha1");
	const ficha2 = document.querySelector(".ficha2");
	const subidaFoto = document.querySelector(".subidaFoto");
	const fotoPerfil = document.querySelector(".fotoPerfil");
	const visualizarFotoU = document.querySelector(".visualizarFotoU");
	
	let subirFotoU = document.querySelector(".subirFotoU");
	
	subirFotoU.addEventListener("click", async function subirFotoUsuario() {
		
		let respuesta;
		
		let dataForm = new FormData();
		dataForm.append("file", subidaFoto.files[0]);
		
		fotoPerfil.value = "/img/" + subidaFoto.value.slice(12);

  		respuesta = await fetch('/api/usuarios/upload', {
			headers: {'Access-Control-Allow-Origin':'*'},
    		method: 'POST', 
    		body: dataForm
  		});

		visualizarFotoU.src = fotoPerfil.value;
		await respuesta();

  	});

    let botonGuardarUsuario = document.querySelector(".botonGuardarUsuario");

    botonGuardarUsuario.addEventListener("click", async function guardar() {

        let respuesta;
    
        let dataForm = new FormData(ficha1);
        const formJSON = Object.fromEntries(dataForm.entries());
        JSON.stringify(formJSON);
    
        respuesta = await fetch('/api/usuarios/insertar', {
            headers: {'Access-Control-Allow-Origin':'*', 'Accept': 'application/json', 'Content-Type':'application/json; charset=utf-8'},
            method: 'POST',
            body: JSON.stringify(formJSON)
        });

        await respuesta.json();
		document.querySelector(".mensajeConfirmacion1").innerHTML = 'REGISTRO CORRECTO';
    
    });

    let botonGuardarProtectora = document.querySelector(".botonGuardarProtectora");

    botonGuardarProtectora.addEventListener("click", async function guardar() {

        let respuesta;
    
        let dataForm = new FormData(ficha2);
        const formJSON = Object.fromEntries(dataForm.entries());
        JSON.stringify(formJSON);
    
        respuesta = await fetch('/api/protectoras/insertar', {
            headers: {'Access-Control-Allow-Origin':'*', 'Accept': 'application/json', 'Content-Type':'application/json; charset=utf-8'},
            method: 'POST',
            body: JSON.stringify(formJSON)
        });

		if(respuesta) document.querySelector(".mensajeConfirmacion2").innerHTML = 'REGISTRO CORRECTO';
    
    });

};