window.onload = function() {
    document.querySelector(".bugReport").addEventListener("click", function mandarCorreo() {
        window.open("mailto:gatinder@app.com?subject=bug");
    });
};