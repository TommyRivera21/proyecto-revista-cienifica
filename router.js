const express = require("express");
const router = express.Router();
// llamamos a nuestra conexion de base de datos 
const conexion = require("./database/db");
// declaramos el modulo para encriptar la contraseña
const bcryptjs = require("bcryptjs");



//  <----------RUTAS CONFIGURADAS---------->

//  <-----Seccion de usuario sin loguear----->

// ruta raiz del sitio web
router.get("/",(req,res)=>{
    res.render("index")
})


// ruta de los articulos
router.get("/articles", (req, res) => {
  conexion.query("select * from ARTICULOS", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("articulos", {
        results: results,
      });
    }
  });
});

// ruta para ver un producto selecionado de la pagina de articulos
router.get("/datos-articulo/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "select * from ARTICULOS where AR_ID=?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("datos-articulo", {
          ARTICULOS: results[0],
        });
      }
    }
  );
});

// ruta del registro de los usuarios
router.get("/registro",(req,res)=>{
  res.render("registro")
})

// peticion de envio de registro de usuario
router.post("/registro-usuario", (req, res) => {
  //   console.log(req.body);
  const { name, lastName, email, password, date } = req.body;
  //  declaramos una variable para almacenar la contraseña encriptada
  var passHash = bcryptjs.hashSync(password, 8); 
  conexion.query(
    "insert into USUARIO  SET ?",
    {
      US_NOMBRE: name,
      US_APELLIDO: lastName,
      US_EMAIL: email,
      US_CONTRASENA: passHash,
      US_FECHA_NACIMIENTO: date,    
    },
    (error, results) => {
      if (error) {
        console.log("fallo el registro");
        console.log(error);
      } else {
        console.log("Registro almacenado en la base de datos");
        res.redirect("/login");
      }
    }
  );
});

// ruta del login de los usuarios
router.get("/login", (req,res)=>{
  if(req.session.loggedin){
    res.redirect("/Inicio");
  } else {
    res.render("login_user");
  }
});

// peticion de acceso a login
var datauser = [];
router.post("/login-auth", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email && password) {
    conexion.query(
      "SELECT * FROM USUARIO WHERE US_EMAIL = '" + email + "'",
      async (error, results) => {
        if (error) throw error;
        datauser = results;
        if (datauser.length == 0) {
          res.render("login_user", {
            alert: true,
            alertTitle: "Error",
            alertMessage: "!No eres un Usuario Registrado!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login",
          });
        } else {
          if (bcryptjs.compareSync(password,  datauser[0].US_CONTRASENA)) {
            req.session.loggedin = true;
            req.session.name = datauser[0].US_NOMBRE;
            req.session.codigo = datauser[0].US_ID;
            res.render("login_user", {
              alert: true,
              alertTitle: "Conexión Exitosa",
              alertMessage: "!LOGIN CORRECTO!",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 1500,
              ruta: "Inicio",
            });
          } else {
            res.render("login_user", {
              alert: true,
              alertTitle: "Error",
              alertMessage: "!Contraseña Incorrecta!",
              alertIcon: "error",
              showConfirmButton: true,
              timer: false,
              ruta: "login",
            });
          }
        }
      }
    );
  } else {
    res.render("login_user", {
      alert: true,
      alertTitle: "Advertencia",
      alertMessage: "!Por favor ingrese un correo y/o contraseña!",
      alertIcon: "warning",
      showConfirmButton: true,
      timer: false,
      ruta: "login",
    });
  }
});

// ruta para la vista contactenos
router.get("/contactenos",(req,res)=>{
  res.render("contact")
})

// ruta para la vista sobre nosotros
router.get("/sobre-nosotros",(req,res)=>{
  res.render("about_us")
})

// peticion de ingreso de registro de usuario
router.post("/envio-contacto", (req, res) => {
  //   console.log(req.body);
  const { name, user, email, tel, content } = req.body;
  conexion.query(
    "insert into CONTACTO SET ?",
    {
      C_NAME: name,
      US_ID: user,
      C_CORREO: email, 
      C_TELEFONO: tel, 
      C_MENSAJE: content,
    },
    (error, result) => {
      res.redirect("/");
    }
  );
  console.log("Registro almacenado en la base de datos");
});

//  <-----Fin de seccion de usuario sin loguear----->


//  <-----Seccion de usuario logueado----->

// inicio usuario logueado
router.get("/Inicio", (req, res) => {
  if (req.session.loggedin) {
    conexion.query("select * from USUARIO", (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("index-user-log", {
          login: true,
          name: req.session.name,
          results: results,
        });
      }
    });
  } else {
    res.render("index-user-log", {
      login: false,
      name: "Debes Iniciar Sesión",
    });
  }
});

//ruta de vista para los articulos
router.get("/articles-log", (req, res) => {
  if (req.session.loggedin) {
    conexion.query("select * from ARTICULOS", (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("articulos-log", {
          login: true,
          name: req.session.name,
          results: results,
        });
      }
    });
  } else {
    res.render("articulos", {
      login: false,
      name: "Debes Iniciar Sesión",
    });
  }
});

// ruta para la vista subir archivos
router.get("/subir",(req,res)=>{
  res.render("subirarchivos")
})


// ruta de vista articulos de usuario
router.get("/user-articulos", (req, res) => {
  if (req.session.loggedin) {
    conexion.query("select * from ARTICULOS", (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("crud_articles", {
          login: true,
          name: req.session.name,
          results: results,
        });
      }
    });
  } else {
    res.render("crud_articles", {
      login: false,
      name: "Debes Iniciar Sesión",
    });
  }
});

// Ruta para crear registros de articulos
router.get("/create", (req, res) => {
  if (req.session.loggedin) {
    res.render("create", {
      login: true,
      name: req.session.name,
      codigo: req.session.codigo,
    });
  } else {
    res.render("create", {
      login: false,
      name: "Debes Iniciar Sesión",
    });
  }
});

// ruta para guardar un articulo
router.post("/save", (req, res) => {
  var articleFile;
  var uploadPath;  

 // el name del input es articleFile
  articleFile = req.files.articleFile;
  uploadPath = __dirname + "/upload/" + articleFile.name;

  // Usamos el metodo mv() para subir el archivo al servidor
  articleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
  });

  

  const user = req.body.user;
  const titulo = req.body.titulo;
  const nameautor = req.body.nameautor;
  const yearpublication = req.body.yearpublication;
  const idioma = req.body.idioma;
  const isbn = req.body.isbn;
  const editorial = req.body.editorial;
  const temas = req.body.temas;
  const npaginas = req.body.npaginas;
  const subidopor = req.body.subidopor;
  const articulo = articleFile.name;
  

  conexion.query(
    "insert into ARTICULOS  SET ?",
    {
      US_ID: user,
      AR_TITULO: titulo,
      AR_AUTOR: nameautor,
      AR_YEAR_PUBLICACION: yearpublication,
      AR_IDIOMA: idioma,     
      AR_ISBN: isbn, 
      AR_EDITORIAL: editorial,     
      AR_TEMAS: temas,     
      AR_NUMERO_PAGINAS: npaginas,
      AR_SUBUDIO_POR: subidopor,
      AR_FILE: articulo,
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/user-articulos");
      }
    }
  );
});

// Ruta para editar registros de articulos
router.get("/edit/:id", (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    conexion.query(
      "select * from ARTICULOS where AR_ID=?",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          res.render("edit", {
            login: true,
            name: req.session.name,
            ARTICULOS: results[0],
            codigo: req.session.codigo,
          });
        }
      }
    );
  } else {
    res.render("edit", {
      login: false,
      name: "Debes Iniciar Sesión",
    });
  }
});

// ruta para actualizar un articulo
var dataupdate = [];
router.post("/update", (req, res) => {
  var articleFile;
  var uploadPath;
  var consulta;

  var idConsulta = req.body.id;

  if (!req.files || Object.keys(req.files).length === 0) {
    conexion.query(
      "select * from ARTICULOS where AR_ID=?",
      [idConsulta],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          dataupdate = results;
          consulta = dataupdate[0].AR_FILE;
        }
      }
    );
  } else {
    // input del articulo
    if (req.files.articleFile) {
      // el name del input es articleFile
      articleFile = req.files.articleFile;
      uploadPath = __dirname + "/upload/" + articleFile.name;
      // Usamos el metodo mv() para subir el archivo al servidor
      articleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
      consulta = articleFile.name;
    } else {
      conexion.query(
        "select * from ARTICULOS where AR_ID=?",
        [idConsulta],
        (error, results) => {
          if (error) {
            throw error;
          } else {
            dataupdate = results;
            consulta = dataupdate[0].AR_FILE;
          }
        }
      );
    }
  }

  setTimeout(function () {
    const id = req.body.id;
    const user = req.body.user;
    const titulo = req.body.titulo;
    const nameautor = req.body.nameautor;
    const yearpublication = req.body.yearpublication;
    const idioma = req.body.idioma;
    const isbn = req.body.isbn;
    const editorial = req.body.editorial;
    const temas = req.body.temas;
    const npaginas = req.body.npaginas;
    const subidopor = req.body.subidopor;
    const articulo = articleFile.name;

    conexion.query(
      "update ARTICULOS SET ? where AR_ID = ?",
      [
        {
          US_ID: user,
          AR_TITULO: titulo,
          AR_AUTOR: nameautor,
          AR_YEAR_PUBLICACION: yearpublication,
          AR_IDIOMA: idioma,     
          AR_ISBN: isbn, 
          AR_EDITORIAL: editorial,     
          AR_TEMAS: temas,     
          AR_NUMERO_PAGINAS: npaginas,
          AR_SUBUDIO_POR: subidopor,
          AR_FILE: articulo,
        },
        id,
      ],
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/user-articulos");
        }
      }
    );
  }, 1000);
});

// Ruta para eliminar registros de productos
router.get("/delete/:id", (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    conexion.query(
      "delete from ARTICULOS where AR_ID = ?",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          res.redirect("/user-articulos");
        }
      }
    );
  } else {
    res.redirect("/login");
  }
});

// ruta para la vista editar perfil
router.get("/perfil-usuario", (req, res) => {
  if (req.session.loggedin) {
    conexion.query("select * from USUARIO", (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("perfil", {
          login: true,
          name: req.session.name,
          results: results,
        });
      }
    });
  } else {
    res.render("perfil", {
      login: false,
      name: "Debes Iniciar Sesión",
    });
  }
});

// ruta para la vista editar perfil
router.get("/editar-perfil", (req, res) => {
  if (req.session.loggedin) {
    conexion.query("select * from USUARIO", (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("editarperfil", {
          login: true,
          name: req.session.name,
          results: results,
        });
      }
    });
  } else {
    res.render("editarperfil", {
      login: false,
      name: "Debes Iniciar Sesión",
    });
  }
});

// ruta para cerrar la sesion del usuario
router.get("/user-logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

//  <-----Fin de seccion de usuario logueado----->

module.exports = router;