// declaracion de variables
const inputs = document.querySelectorAll("form input"),
    adver = document.getElementById("warning");
// declaracion de variable para guardar el valor de la contraseÃ±a
var pass;
// declaracion de las expresiones regulares para la validacion
const expresionesRegulares = {
    numeros: /([0-9])/,
    text: /([a-zA-Z])/,
    caracteres: /[^a-zA-Z\d\s]/,
    correo:
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    espacios: /\s/g,
};

// instruccion que valida la forma de ingresar los datos del usuario
inputs.forEach((input) => {
    input.addEventListener("keyup", (e) => {
        let valueInput = e.target.value;
        let style = e.target.style;

    switch (e.target.id) {
        case "name":
        message("Debe ingresar solo letras");
            input.value = valueInput
                .replace(expresionesRegulares.caracteres, "")
                .replace(expresionesRegulares.numeros, "");
        if (valueInput.length == 0) {
            style.border = "2px solid #ce1212";
        } else {
            style.border = "2px solid #008f39";
        }
        break;

        case "lastName":
        message("Debe ingresar solo letras");
            input.value = valueInput
                .replace(expresionesRegulares.caracteres, "")
                .replace(expresionesRegulares.numeros, "");
        if (valueInput.length == 0) {
            style.border = "2px solid #ce1212";
        } else {
            style.border = "2px solid #008f39";
        }
        break;

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
        pass = valueInput;
        break;

        case "password-confir":
            input.value = valueInput.replace(expresionesRegulares.espacios, "");
        if (valueInput.length < 8) {
            message("Solo se permiten contraseñas mayor a 8 caracteres");
            style.border = "2px solid #ce1212";
        } else {
            if (valueInput == pass) {
                message("Las contraseñas coinciden");
                style.border = "2px solid #008f39";
            } else {
                message("!! Las contraseñas no coinciden !!");
                style.border = "2px solid #ce1212";
            }
        }
        break;
    }
    });
});

// funcion que permite el registro de un nuevo usuario
function register() {
    // funcion para crear objetos de tipo cliente
    function Client(email, name, lastname, password, date) {
      //   atributos del objeto cliente
        this.email = email;
        this.name = name;
        this.lastName = lastname;
        this.password = password;
        this.date = date;
    }
    // declaramos un array para guardar temporalmente los datos de los usuarios
    let dataBase = [];
    //   se capturan los valores ingresados por el usuario en los input
    let emailInput = document.getElementById("email").value;
    let nameInput = document.getElementById("name").value;
    let lastNameInput = document.getElementById("lastName").value;
    let passwordInput = document.getElementById("password").value;
    let passwordConfiInput = document.getElementById("password-confir").value;
    let dateInput = document.getElementById("date").value;
    let confirInput = document.getElementById("terminos").checked;

    // comprueba si algun input obligatorio esta vacio
    if (
        blank(passwordInput) ||
        blank(passwordConfiInput) ||
        blank(nameInput) ||
        blank(lastNameInput) ||
        blank(emailInput) ||
        !confirInput
    ) {
        alert("Llene todos los campos obligatorios para realizar su registro");
    } else {
      // se comprueba si las contraseñas coinciden y que sea mayor de 8 caracteres, ademas se comprueba el formato del correo electronico para proceder al registro
        if (
            passwordInput.length >= 8 &&
            passwordConfiInput.length >= 8 &&
            expresionesRegulares.correo.test(emailInput) &&
            validate(passwordInput, passwordConfiInput)
        ){
        //  instanciamos un nuevo objeto y llamamos a la funcion que crea el objeto, le pasamos como parametros las variables donde se guardaron los valores ingresados
        let newClient = new Client(
            emailInput,
            nameInput,
            lastNameInput,
            passwordInput,
            dateInput
            );
        // agregamos nuestro objeto al array donde se guardara temporalmente
        dataBase.push(newClient);
        console.log(dataBase);
        alert("Hola " + newClient.name + "\nGracias por registrarte");
        } else {
            alert(
                "Revise que la contraseña sea mayor de 8 caracteres y que coincidan, además de que el formato del correo electrónico sea el correcto"
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
// funcion que compara las contraseñas para proceder al registro
function validate(pass1, pass2) {
    if (pass1 === pass2) {
        return true;
    } else {
        return false;
    }
}
// funcion que envia un mensaje de informacion al usuario
function message(val) {
    adver.innerHTML = val;
}
