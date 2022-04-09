window.onload = function () {

    const contenedorMostrar = document.querySelector(".contenedor-mostrar");

    fetchGatos();

    function fetchGatos() {
        fetch("http://localhost:8181/api/gatos")
        .then(response => response.json())
        .then(gatos => fichasGatos(gatos));
    };

    function fichasGatos(gatos) {

        for(gato of gatos) {

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
        
            let fichaGato = document.createElement("div");
            fichaGato.classList.add("fichaGato");
            fichaGato.appendChild(foto);
            fichaGato.appendChild(id);
            fichaGato.appendChild(nombre);
            fichaGato.appendChild(descripcion);
            fichaGato.appendChild(edad);
            contenedorMostrar.appendChild(fichaGato);
        
        }

    }

}