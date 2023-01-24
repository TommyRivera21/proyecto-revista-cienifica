// declaracion de variables
var inputsForm = document.getElementsByClassName("formulario__input");
var textarea = document.getElementsByClassName("special-textarea");

// ciclo para animar  los label de los input
for (var i = 0; i < inputsForm.length; i++) {
  inputsForm[i].addEventListener("keyup", function () {
    if (this.value.length >= 1) {
      this.nextElementSibling.classList.add("fijar");
    } else {
      this.nextElementSibling.classList.remove("fijar");
    }
  });
}

// declaracion de variables
const inputs = document.querySelectorAll("form input"),
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

      case "tel":
        input.value = valueInput
          .replace(expresionesRegulares.caracteres, "")
          .replace(expresionesRegulares.espacios, "")
          .replace(expresionesRegulares.text, "");
        if (expresionesRegulares.numeros.test(valueInput)) {
          if (valueInput.length < 10) {
            message("Debe ingresar los 10 números de su teléfono");
            style.border = "2px solid #ce1212";
          } else {
            message("Número de telefóno aceptable");
            style.border = "2px solid #008f39";
          }
        } else {
          message(
            "Debes ingresar solo números sin signos especiales ni letras"
          );
          style.border = "2px solid #ce1212";
        }
        break;

      case "email":
        input.value = valueInput.replace(expresionesRegulares.espacios, "");
        if (expresionesRegulares.correo.test(valueInput)) {
          style.border = " 2px solid #008f39";
          message("Correo electrónico correcto");
        } else {
          style.border = "2px solid #ce1212";
          message("El correo que ingreso no es correcto");
        }
        break;
    }
  });
});

// funcion que permite el registro de un nuevo usuario
function send() {
  // funcion para crear objetos de tipo cliente
  function Message(name, email, tel, content) {
    //   atributos del objeto cliente
    this.name = name;
    this.email = email;
    this.tel = tel;
    this.content = content;
  }
  // declaramos un array para guardar temporalmente los datos de los usuarios
  let dataBase = [];
  //   se capturan los valores ingresados por el usuario en los input
  let nameInput = document.getElementById("name").value;
  let emailInput = document.getElementById("email").value;
  let telInput = document.getElementById("tel").value;
  let contentInput = document.getElementById("mesage").value;

  // comprueba si algun input obligatorio esta vacio
  if (
    blank(telInput) ||
    blank(contentInput) ||
    blank(nameInput) ||
    blank(emailInput)
  ) {
    alert("Debe llenar todos los campos para enviar un mensaje");
  } else {
    // se comprueba que el numero de telefono sea mayor de 10 caracteres, ademas se comprueba el formato del correo electronico para enviar el mensaje
    if (telInput.length >= 10 && expresionesRegulares.correo.test(emailInput)) {
      //  instanciamos un nuevo objeto y llamamos a la funcion que crea el objeto, le pasamos como parametros las variables donde se guardaron los valores ingresados
      let newMessage = new Message(
        nameInput,
        emailInput,
        telInput,
        contentInput
      );
      // agregamos nuestro objeto al array donde se guardara temporalmente
      dataBase.push(newMessage);
      console.log(dataBase);
      alert("Su mensaje se ha enviado exitosamente");
    } else {
      alert(
        "Revise que el numero de telefono tenga mas de 10 digitos, además de que el formato del correo electrónico sea el correcto"
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
// funcion que envia un mensaje de informacion al usuario
function message(val) {
  adver.innerHTML = val;
}

// ciclo para animar el label del textarea
for (var i = 0; i <= textarea.length; i++) {
  textarea[i].addEventListener("keyup", function () {
    if (this.value.length >= 1) {
      this.nextElementSibling.classList.add("fijar-special");
    } else {
      this.nextElementSibling.classList.remove("fijar-special");
    }
  });
}
