// invocamos los modulos necesarios
const express = require("express");
// modulo de subida de archivos
const fileUpload = require("express-fileupload");
// modulo de control de sessiones
const session = require("express-session");

// declaramos la app para usar express
const app = express();

// seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// carga de archivos con express
app.use(fileUpload());

// configuramos el directorio public
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

// configuramos el directorio upload para subir los articulos
app.use("/articulos ", express.static("upload"));
app.use("/articulos", express.static(__dirname + "/upload"));

// establecemos  el motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// establecemos las variables de sesion
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// declaramos el archivo de las rutas
app.use("/", require("./router"));

// middleware para rutas no configuradas
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/html/404.html");
});

// declaramos el puerto de escucha del servidor
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), (req, res) => {
  console.log("Servidor corriendo en puerto: " + app.get("port"));
});
