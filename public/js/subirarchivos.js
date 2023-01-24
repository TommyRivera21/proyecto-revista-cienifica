// declaracion de variables
const inputs = document.querySelectorAll("form input"),
    adver = document.getElementById("warning");

// declaracion de las expresiones regulares para la validacion
const expresionesRegulares = {
    numeros: /([0-9])/,
    text: /([a-ñ-zA-Ñ-Z-])/,
    caracteres: /[^a-ñ-zA-Ñ-Z\d\s]/,
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
        case "titulo":
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

        case "nameautor":
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

        case "idioma":
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

        case "editorial":
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

        case "temas":
        message("Debe ingresar solo letras");
            input.value = valueInput
                .replace(expresionesRegulares.caracteres, "")
                .replace(expresionesRegulares.numeros, "");
        if (valueInput.length >= 0 )  {
            style.border = "2px solid #ce1212";
        } else {
            style.border = "2px solid #008f39";
        }
        break;

        case "npaginas":
        input.value = valueInput
            .replace(expresionesRegulares.caracteres, "")
            .replace(expresionesRegulares.espacios, "")
            .replace(expresionesRegulares.text, "");
        if (expresionesRegulares.numeros.test(valueInput)) {
            if (valueInput.length < 1) {
            message("Debe ingresar solo numero total de paginas");
            style.border = "2px solid #ce1212";
            } else {
            message("Numero de paginas aceptable");
            style.border = "2px solid #008f39";
        }
        } else {
            message(
            "Debes ingresar ingresar solo numero total de paginas sin signos especiales ni letras"
            );
            style.border = "2px solid #ce1212";
        }
        break;

        case "subidopor":
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
    }
    });
});

// funcion que permite el registro de un nuevo articulo
function subir() {
    // funcion para crear objetos de tipo articulo
    function Article(titulo, nameautor, date, idioma, isbn, editorial, temas, npaginas, subidopor) {
      //   atributos del objeto cliente
        this.titulo = titulo;
        this.nameautor = nameautor;
        this.date = date;
        this.idioma = idioma;
        this.isbn = isbn;
        this.editorial = editorial;
        this.temas = temas;
        this.npaginas = npaginas;
        this.subidopor = subidopor;
    }
    // declaramos un array para guardar temporalmente los datos del articulo
    let dataBase = [];
    //   se capturan los valores ingresados por el usuario en los input
    let tituloInput = document.getElementById("titulo").value;
    let nameautorInput = document.getElementById("name-autor").value;
    let dateInput = document.getElementById("date").value;
    let idiomaInput = document.getElementById("idioma").value;
    let isbnInput = document.getElementById("isbn").value;
    let editorialInput = document.getElementById("editorial").value;
    let temasInput = document.getElementById("temas").value;
    let npaginasInput = document.getElementById("n-paginas").value;
    let subidoporInput = document.getElementById("subidopor").value;

    // comprueba si algun input obligatorio esta vacio
    if (
        blank(tituloInput) ||
        blank(nameautorInput) ||
        blank(idiomaInput) ||
        blank(isbnInput) ||
        blank(editorialInput) ||
        blank(temasInput) ||
        blank(npaginasInput) ||
        blank(subidoporInput) ||
        !confirInput
    ) {
        alert("Llene todos los campos obligatorios para realizar el registro de su articulo");
    } else {
      // se comprueba si las contraseñas coinciden y que sea mayor de 8 caracteres, ademas se comprueba el formato del correo electronico para proceder al registro
        if (
            passwordInput.length >= 8 &&
            passwordConfiInput.length >= 8 &&
            expresionesRegulares.correo.test(emailInput) &&
            validate(passwordInput, passwordConfiInput)
        ){
        /*  instanciamos un nuevo objeto y llamamos a la funcion que crea el objeto, 
            le pasamos como parametros las variables donde se guardaron los valores ingresados */
        let newArticle = new Article(
            tituloInput,
            nameautorInput,
            dateInput,
            idiomaInput,
            isbnInput,
            editorialInput,
            temasInput,
            npaginasInput,
            subidoporInput
            );
        // agregamos nuestro objeto al array donde se guardara temporalmente
        dataBase.push(newArticle);
        console.log(dataBase);
        alert("Hola " + newClient.subidopor + "\nGracias por registrar este articulo");
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

// instruccion que permite vizualizar el articulo
document.querySelector('#pdffFile').addEventListener('change', () => {

    let pdffFile = document.querySelector('#pdffFile').files[0];
    let pdffFileURL = URL.createObjectURL(pdffFile) + "#toolbar=0";

    document.querySelector('#vistaPrevia').setAttribute('src', pdffFileURL);
});
