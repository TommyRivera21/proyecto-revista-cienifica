// declaracion de los inputs como variables
const inputs = document.querySelectorAll("form input"),
  // declaracion del contenedor (p) para los mensajes de alerta
    adver = document.getElementById("warning");

// declaracion de las expresiones regulares para la validacion
const expresionesRegulares = {
    numeros: /([0-9])/,
    text: /([a-zA-Z])/,
    caracteres: /[^a-zA-Z\d\s]/,
    correo:
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    espacios: /\s/g,
};
//   codigo que valida el contenido de los inputs
inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    let valueInput = e.target.value;
    let style = e.target.style;

    switch (e.target.id) {
        case "email":
        input.value = valueInput.replace(expresionesRegulares.espacios, "");
        if (expresionesRegulares.correo.test(valueInput)) {
            style.border = " 2px solid #008f39";
            message("Correo electronico correcto");
        } else {
            style.border = "2px solid #ce1212";
            message("El correo que ingreso no es correcto");
        }
        break;

        case "password":
        input.value = valueInput.replace(expresionesRegulares.espacios, "");
        if (valueInput.length < 8) {
            message("Solo se permiten contraseñas mayor a 8 caracteres");
                style.border = "2px solid #ce1212";
        } else {
            message("Longitud de contraseña aceptable");
            style.border = "2px solid #008f39";
        }
        break;
    }
    });
});
// funcion que valida el login
function login() {
    // variables donde guardaremos los valores consultados desde la BD
    let nameDB = "Tommy Rivera";
    let userDB = "tomyrivera_@hotmail.com";
    let passDB = "12345678";
    //   capturamos los valores que ingresa el usuario
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;

    //   comprobamos si algun input esta vacio
    if (blank(emailInput) || blank(passwordInput)) {
        alert("Llene todos los campos para poder ingresar");
    } else {
      //   comprobamos si la contraseña tiene mas de 8 caracteres y si el formato del correo es el correcto
        if (
        passwordInput.length >= 8 &&
        expresionesRegulares.correo.test(emailInput)
        ) {
        //   comprobamos si las contraseñas y el correo coinciden
        if (validate(userDB, emailInput) && validate(passDB, passwordInput)) {
            alert("Bienvenido " + nameDB);
            window.open("/Inicio");
        } else {
            alert("El correo o la contraseña estan incorrectas");
        }
        } else {
            alert(
                "La contraseña es muy corta o el formato del correo no es el correcto"
            );
        }
    }
}
// funcion que comprueba si un input esta vacio
function blank(par) {
    if (par === "") {
        return true;
    } else {
    return false;
    }
}
// funcion que compara las contraseñas
function validate(pass1, pass2) {
    if (pass1 === pass2) {
        return true;
    } else {
        return false;
    }
}
// funcion que muestra un mensaje de alerta
function message(val) {
    adver.innerHTML = val;
}

