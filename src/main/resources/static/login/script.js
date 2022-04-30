window.onload = function() {
	
	const nombreUsuario = document.querySelector("input[type='text']");
	
	nombreUsuario.addEventListener("blur", function mandarUsuario() {
		localStorage.setItem("nombreUsuario", nombreUsuario.value);
	});
	
};