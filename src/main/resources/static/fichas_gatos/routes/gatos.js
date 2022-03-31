const router = require("express").Router();
const mysql  = require("mysql");
const connectionParams = require("../config/connection");

router.get("/gatos", (req, res) => {
    connection = mysql.createConnection(connectionParams);
    
    connection.connect((error) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Conexión correcta");
        }
    });

    var query = connection.query("SELECT * FROM gatos", (error, result) => {
        if(error) {
            console.log(error);
        } else {
            if(result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(400).json("Registro no encontrado");
            }
        }
    });

    connection.end();

});

router.put("/gatos/:id", (req, res) => {
    console.log("Ruta PUT...");
    let id = req.params.id;
    let datos = req.body;
    console.log("Datos en el servidor... ", datos);
    let {nombre} = datos;

    connection = mysql.createConnection(connectionParams);
    
    connection.connect((error) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Conexión correcta");
        }
    });

    let cadenaUpdate = `UPDATE gatos SET nombre = "${nombre}" WHERE id = "${id}"`;

    let query = connection.query(cadenaUpdate, (error, result) => {
        if(error) {
            console.log(error);
        } else {
            res.json({
                "ok": true,
                "mensaje": "Actualización correcta"
            });
        }
    });

});

module.exports = router;