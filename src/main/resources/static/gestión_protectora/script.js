window.onload = function () {

    const contenedorMostrar = document.querySelector(".contenedor-mostrar");
    const contenedorForm = document.querySelector(".contenedor-form");
    const ficha = document.querySelector(".ficha");
    var operacion = "";

    fetchGatos();

    function fetchGatos() {
        fetch("http://localhost:8888/gatos")
        .then(response => response.json())
        .then(gatos => fichasGatos(gatos));
    };

    function fichasGatos(gatos) {

        for(gato of gatos) {

            if(gato.idgato == undefined) {
                return;
            }

            let titulo = document.createElement("h1");
            titulo.innerHTML = "FICHA DE GATO";
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
            let botonEliminar = document.createElement("button");
            botonEliminar.innerHTML = "ELIMINAR";
            let botonActualizar = document.createElement("button");
            botonActualizar.innerHTML = "ACTUALIZAR";
        
            let fichaGato = document.createElement("div");
            fichaGato.classList.add("fichaGato");
            fichaGato.appendChild(titulo);
            fichaGato.appendChild(id);
            fichaGato.appendChild(nombre);
            fichaGato.appendChild(descripcion);
            fichaGato.appendChild(edad);
            fichaGato.appendChild(foto);
            fichaGato.appendChild(botonEliminar);
            fichaGato.appendChild(botonActualizar);
            contenedorMostrar.appendChild(fichaGato);

            botonActualizar.addEventListener("click", async function editarGato(e) {
                operacion = "update";
                id = e.target.parentNode.children[1].innerHTML.slice(22, 24);
                contenedorForm.style.visibility = "visible";

                document.querySelector("#id").classList.add("edit-id-disabled");
        
                let datos = await fetch(`http://localhost:8888/gatos/${id}`);
                let gatos = await datos.json();
        
                ficha.id.value = gatos[0].idgato;
                ficha.acogido.value = gatos[0].acogido.data;
                ficha.adoptado.value = gatos[0].adoptado.data;
                ficha.descripcion.value = gatos[0].descripcion;
                ficha.edad.value = gatos[0].edad;
                ficha.foto.value = gatos[0].foto;
                ficha.nombre.value = gatos[0].nombre;
                ficha.sexo.value = gatos[0].sexo;
            });

            botonEliminar.addEventListener("click", async function eliminarGato(e) {
                id = e.target.parentNode.children[1].innerHTML.slice(22, 24);
                if(confirm("¿Confirmas el borrado de la ficha?")) {
                    respuesta = await fetch(`/gatos/${id}`, {
                        method: "DELETE"
                    });
                    console.log("Borrado correcto...", await respuesta.json());
                    window.open("/");
                }
            });

        };

    };

    document.querySelector(".botonInsertar").addEventListener("click", function insertarGato() {
        operacion = "insert";
        contenedorForm.style.visibility = "visible";
        document.querySelector("#id").classList.remove("edit-id-disabled");
    });

    let botonGuardar = document.querySelector(".botonGuardar");

    botonGuardar.addEventListener("click", async function guardar() {
        let respuesta;
        let id = ficha.id.value;
    
        let dataForm = new FormData(ficha);
        const formJSON = Object.fromEntries(dataForm.entries());
        console.log("Form a JSON...", JSON.stringify(formJSON));
    
        switch(operacion) {
            case "update":
                respuesta = await fetch(`/gatos/${id}`, {
                    headers: {"Access-Control-Allow-Origin":"*", "Content-Type":"application/json; charset=utf-8"},
                    method: "PUT",
                    body: JSON.stringify(formJSON)
                });
                break;
        
            case "insert":
                respuesta = await fetch(`/gatos`, {
                    headers: {"Access-Control-Allow-Origin":"*", "Content-Type":"application/json; charset=utf-8"},
                    method: "POST",
                    body: JSON.stringify(formJSON)
                });
                break;
        };
        console.log("Insert/update correcto...", await respuesta.json());
    
    });

};