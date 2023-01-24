const mysql = require("mysql");

// creamos la conexion con la base de datos local
// const conexion = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "rcientifica",
// });

// conexion a base de datos online en db4free.net
const conexion = mysql.createConnection({
    host: "db4free.net",
    user: "rcientifica123",
    password: "123rcientifica123",
    database: "rcientifica",
});

// conectamos con la base de datos
conexion.connect((error) => {
    if (error) {
    console.log("El error de conexion es: " + error);
    return;
    } else {
    console.log("Conexion a la Base de Datos Exitosa");
    }
});

module.exports = conexion;



