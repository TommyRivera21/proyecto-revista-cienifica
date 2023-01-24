// declaracion de variables
const inputs = document.querySelectorAll("form input"),
    adver = document.getElementById("warning");
// console.log(inputs);
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

        case "last-name":
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

        case "ID":
        input.value = valueInput
            .replace(expresionesRegulares.caracteres, "")
            .replace(expresionesRegulares.espacios, "")
            .replace(expresionesRegulares.text, "");
        if (expresionesRegulares.numeros.test(valueInput)) {
            if (valueInput.length < 10) {
            message("Debe ingresar los 10 numeros de su CI");
            style.border = "2px solid #ce1212";
            } else {
            message("Numero de CI aceptable");
            style.border = "2px solid #008f39";
        }
        } else {
            message(
            "Debes ingresar su numero de cedula sin signos especiales ni letras"
            );
            style.border = "2px solid #ce1212";
        }
        break;

        case "edad":
        input.value = valueInput
            .replace(expresionesRegulares.caracteres, "")
            .replace(expresionesRegulares.espacios, "")
            .replace(expresionesRegulares.text, "");
        if (expresionesRegulares.numeros.test(valueInput)) {
            if (valueInput.length > 2) {
            message("Esta ingresando una edad no permitida");
            style.border = "2px solid #ce1212";
            } else {
            message("Edad aceptable");
            style.border = "2px solid #008f39";
            }
        } else {
            message("Debes ingresar su edad en nuxmeros");
            style.border = "2px solid #ce1212";
        }
        break;

        case "tel":
        input.value = valueInput
            .replace(expresionesRegulares.caracteres, "")
            .replace(expresionesRegulares.espacios, "")
            .replace(expresionesRegulares.text, "");
        if (expresionesRegulares.numeros.test(valueInput)) {
            if (valueInput.length < 10) {
            message("Debe ingresar los 10 numeros de su telefono");
            style.border = "2px solid #ce1212";
        } else {
            message("Numero de telefono aceptable");
            style.border = "2px solid #008f39";
        }
        } else {
            message(
            "Debes ingresar solo numeros sin signos especiales ni letras"
            );
            style.border = "2px solid #ce1212";
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
        if (valueInput.length < 8 || valueInput.length >12) {
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
function update() {
  // funcion para crear objetos de tipo cliente
    function Client(
        name,
        lastname,
        id,
        date,
        age,
        genero,
        tel,
        country,
        city,
        address,
        email,
        password
) {
    //   atributos del objeto cliente
    this.name = name;
    this.lastName = lastname;
    this.id = id;
    this.date = date;
    this.age = age;
    this.genero = genero;
    this.tel = tel;
    this.country = country;
    this.city = city;
    this.address = address;
    this.email = email;
    this.password = password;
}
  // declaramos un array para guardar temporalmente los datos de los usuarios
    let dataBase = [];
  //   se capturan los valores ingresados por el usuario en los input
    let nameInput = document.getElementById("name").value;
    let lastNameInput = document.getElementById("last-name").value;
    let idInput = document.getElementById("ID").value;
    let dateInput = document.getElementById("date").value;
    let ageInput = document.getElementById("edad").value;
    let generoInputSelect = document.getElementById("sex");
    let generoInput =
        generoInputSelect.options[generoInputSelect.selectedIndex].text;
    let telInput = document.getElementById("tel").value;
    let countryInputSelect = document.getElementById("country");
    let countryInput =
        countryInputSelect.options[countryInputSelect.selectedIndex].text;
    let cityInputSelect = document.getElementById("city");
    let cityInput = cityInputSelect.options[cityInputSelect.selectedIndex].text;
    let addressInput = document.getElementById("direction").value;
    let emailInput = document.getElementById("email").value;
    let passwordInput = document.getElementById("password").value;
    let passwordConfiInput = document.getElementById("password-confir").value;

  // comprueba si algun input obligatorio esta vacio
    if (
    blank(passwordInput) ||
    blank(passwordConfiInput) ||
    blank(nameInput) ||
    blank(lastNameInput) ||
    blank(emailInput)
) {
    alert(
        "No puede dejar en blanco los campos importantes de su cuenta: \nNombre, Apellido, Correo y contraseña "
    );
    } else {
    // se comprueba si las contraseÃ±as coinciden y que sea mayor de 8 caracteres, ademas se comprueba el formato del correo electronico para proceder al registro
    if (
        passwordInput.length >= 8 &&
        passwordConfiInput.length >= 8 &&
        expresionesRegulares.correo.test(emailInput) &&
        validate(passwordInput, passwordConfiInput)
    ) {
      //  instanciamos un nuevo objeto y llamamos a la funcion que crea el objeto, le pasamos como parametros las variables donde se guardaron los valores ingresados
        let newClient = new Client(
            nameInput,
            lastNameInput,
            idInput,
            dateInput,
            ageInput,
            generoInput,
            telInput,
            countryInput,
            cityInput,
            addressInput,
            emailInput,
            passwordInput
        );
      // agregamos nuestro objeto al array donde se guardara temporalmente
            dataBase.push(newClient);
            console.log(dataBase);
            alert(
            newClient.name +
            "hemos enviado sus datos para la actualizacion de su perfil"
            );
            window.open("/");
            } else {
            alert(
        "Revise que la contraseña sea mayor de 8 caracteres y que coincidan, ademas de que el formato del correo electronico sea el correcto"
        );
    }
}
}

// funcion para previsualizar la imagen
function previewImage() {
    var file = document.getElementById("file").files;
    if (file.length > 0) {
        var fileReader = new FileReader();

        fileReader.onload = function (event) {
        document
        .getElementById("preview")
        .setAttribute("src", event.target.result);
    };
        fileReader.readAsDataURL(file[0]);
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

// bloque de codigo que genera las opciones de los select de manera de dinamina desde un archivo json
var selectorGenero = document.getElementById("sex");
var selectorPais = document.getElementById("country");
var selectorCiudad = document.getElementById("city");

function enlistar() {
    fetch("/json/datos.json")
    .then((res) => res.json())
    .then((datos) => {
        selectorPais.addEventListener("change", cargarCiudades);

        datos[0].forEach(function (genero) {
        let opcion = document.createElement("option");
        opcion.value = genero.nombre;
        opcion.text = genero.nombre;
        selectorGenero.add(opcion);
        });

        datos[1].forEach(function (pais) {
        let opcion = document.createElement("option");
        opcion.value = pais.id;
        opcion.text = pais.nombre;
        selectorPais.add(opcion);
        });

        function cargarCiudades() {
        selectorCiudad.options.length = 1;
        datos[2]
            .filter(function (ciudad) {
            return ciudad.idPais == this;
            }, selectorPais.value)
            .forEach(function (ciudad) {
            let opcion = document.createElement("option");
            opcion.value = ciudad.id;
            opcion.text = ciudad.nombre;
            selectorCiudad.add(opcion);
            });
        }
    })
    .catch(function (error) {
        console.log("Hubo un problema con la peticion Fetch:" + error.message);
    });
}
enlistar();