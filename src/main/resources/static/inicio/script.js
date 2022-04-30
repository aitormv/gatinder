window.onload = function() {
	
    document.querySelector(".bugReport").addEventListener("click", function mandarCorreo() {
        window.open("mailto:gatinder@app.com?subject=bug");
    });

	document.querySelector(".botonMenu").addEventListener("click", function abrirMenu() {
		document.querySelector(".menuDesplegable").style.display = "flex";
	});

};