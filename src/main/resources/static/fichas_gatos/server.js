const express = require("express");
const path = require("path");
const mysql  = require("mysql");
const connectionParams = require("./config/connection");

const app = express();

app.set("port", process.env.PORT || 8888);
app.set("json spaces", 2);

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static(`${__dirname}../../templates/user/fichas_gatos`));
let homePage = path.join(__dirname, "../../templates/user/fichas_gatos/index.html");

app.get("/", (req, res) => {
    res.sendFile(homePage);
});

app.use(require("./routes/gatos"));

app.listen(app.get("port"), () => {
    console.log(`Servidor en localhost:${app.get("port")}`);
});