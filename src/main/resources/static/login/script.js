window.onload = function() {

	// DECLARACIÓN DE CONSTANTES Y VARIABLES
	
	const nombreUsuario = document.querySelector("input[type='text']");

	// FUNCIÓN QUE RECOGE EL NOMBRE DE USUARIO DEL INPUT DE LOGIN Y LO GUARDA EN LOCALSTORAGE
	
	nombreUsuario.addEventListener("blur", function mandarUsuario() {
		localStorage.setItem("nombreUsuario", nombreUsuario.value);
	});
	
};