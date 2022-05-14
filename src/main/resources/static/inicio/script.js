window.onload = function() {

	// DECLARACIÓN DE CONSTANTES Y VARIABLES
	
	const menuDesplegable = document.querySelector(".menuDesplegable");

	// FUNCIÓN QUE HACE VISIBLE Y OCULTA EL MENÚ DESPLEGABLE AL HACER CLICK EN EL BOTÓN

	document.querySelector(".botonMenu").addEventListener("click", function abrirMenu() {
		if (menuDesplegable.style.visibility == "visible") menuDesplegable.style.visibility = "hidden";
		else menuDesplegable.style.visibility = "visible";
	});

	// FUNCIONES DE MENÚ ABIERTO Y DESPLEGABLE QUE ABREN UNA VENTANA
	// CON EL GESTOR DE CORREO ELECTRÓNICO PREDETERMINADO PARA ENVIAR UN MENSAJE DE REPORTE DE ERRORES
	
	document.querySelector(".bugReport1").addEventListener("click", function mandarCorreo1() {
        window.open("mailto:gatinder@app.com?subject=bug");
    });

	document.querySelector(".bugReport2").addEventListener("click", function mandarCorreo2() {
        window.open("mailto:gatinder@app.com?subject=bug");
    });

};