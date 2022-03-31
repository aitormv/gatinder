window.onload = function () {

    const contenedorMostrar = document.querySelector(".contenedor-mostrar");

    fetchGatos();

    //FUNCIÓN FETCH

    function fetchGatos() {
        fetch("http://localhost:8888/gatos")
        .then(response => response.json())
        .then(gatos => fichasGatos(gatos));
    };

    //FUNCIÓN DE GENERAR FICHAS

    function fichasGatos(gatos) {
        for(gato of gatos) {
            let descripcion = document.createElement("p");
            descripcion.innerHTML = "Descripción: " + gato.descripcion;
            let edad = document.createElement("p");
            edad.innerHTML = "Edad: " + gato.edad;
            let nombre = document.createElement("p");
            nombre.innerHTML = "Nombre: " + gato.nombre;
            contenedorMostrar.appendChild(descripcion);
            contenedorMostrar.appendChild(edad);
            contenedorMostrar.appendChild(nombre);
        }
    };

    botonActualizar = document.querySelector(".botonActualizar");

    botonActualizar.addEventListener("click", editarGato);

    //FUNCIÓN UPDATE

    async function editarGato(e) {
        let id = 1;//e.target.parentNode.getAttribute("data-id");
        let contenedorMostrar = document.querySelector(".contenedor-form");
        contenedorMostrar.style.visibility = "visible";

        let datos = await fetch(`http://localhost:8888/gatos/${id}`);
        let gatos = await datos.json();

        contenedorMostrar.ficha.nombre.value = gatos[0].nombre;

        document.querySelector(".botonGuardar").addEventListener("click", guardar);

        async function guardar() {
            let id = document.ficha.id.value;

            let dataForm = new FormData(document.ficha);

            const formJSON = Object.fromEntries(dataForm.entries());
            console.log("Form a JSON... ", JSON.stringify(formJSON));

            let respuesta = await fetch(`/alumnos/${id}`, {
                headers: {"Content-Type":"application/json; charset=utf-8"},
                method: "PUT",
                body: JSON.stringify(formJSON)
            });
        }

        console.log("Data en data... ", await response.json());
        let data = await respuesta.json();
    };

};