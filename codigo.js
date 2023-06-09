const regExMayusculas = /(^[A-ZÑÁÉÍÓÚÜ][a-zñáéíóúü]+)(\s[A-ZÑÁÉÍÓÚÜ]{1}[a-zñáéíóúü]*)?$/g
const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const regExSueldo = /^\d+$/g
const dolar = 243.54
const euro = 260.77

var enviarBtn = document.querySelector("#enviarBtn")
var reestablecerBtn = document.querySelector("#reestablecerBtn")
var ordenarBtn = document.querySelector("#ordenarBtn")
var modal = new bootstrap.Modal(document.querySelector('#modal'))
var tituloModal = document.querySelector('.modal-title')
var cuerpoModal = document.querySelector('.modal-body')
var form = document.querySelector("#contacto")
var cuerpoTabla = document.querySelector("#cuerpoTabla")
var tabla = document.querySelector('.table-striped')
var contenidoTabla = []
var apellido, nombre, email, modalidad, sueldoMinimo, mensaje, filaTabla, celdaTabla, sueldoMinimoDolar, sueldoMinimoEuro, campos, ordenarAscDescBtn, ordenarCampoBtn

validacion = () => {
    //Se seleccionan los elementos del DOM (Campos del Formulario).
    apellido = document.querySelector('#apellido')
    nombre = document.querySelector('#nombre')
    email = document.querySelector('#email')
    modalidad = document.querySelector('#modalidad')
    sueldoMinimo = document.querySelector('#sueldoMinimo')
    mensaje = document.querySelector('#mensaje')
    //Array con dichos elementos.
    campos = [apellido, nombre, email, modalidad, sueldoMinimo, mensaje]
    //Validación de campos OBLIGATORIOS.
    vacios = false
    //Se recorre el array "campos" y si uno de los elementos es "" la variable "vacios" pasa de FALSE a TRUE.
    campos.map((e) => e.value === "" ? vacios = true : vacios)
    //Si "vacios" es true se personaliza el elemento MODAL, sino pasa a la siguiente validación.
    if (vacios) {
        tituloModal.textContent = "Error!"
        cuerpoModal.textContent = "Por favor, complete todos los campos OBLIGATORIOS!"
    } else {
        //Validación de Apellido/Nombre iniciando con MAYUSCULA (Valida hasta dos nombres y dos apellidos).
        //Si el valor de "apellido" o "nombre" no matchea con la regEx (tener solo letras y la primera en mayúscula) se personaliza el elemento MODAL, sino pasa a la siguiente validación.
        if (apellido.value.match(regExMayusculas) === null || nombre.value.match(regExMayusculas) === null) {
            tituloModal.textContent = "Error!"
            cuerpoModal.textContent = "Por favor, ingrese su Apellido/Nombre iniciando con MAYÚSCULA!"
        } else {
            //Validación de formato de Email VALIDO.
            //Si el valor de "email" no matchea con la regEx (tener un formato válido de email) se personaliza el elemento MODAL, sino pasa a la siguiente validación.
            if (email.value.match(regExEmail) === null) {
                tituloModal.textContent = "Error!"
                cuerpoModal.textContent = "Por favor, ingrese un Email VÁLIDO!"
            } else {
                //Validación de Modalidad SELECCIONADA.
                //Si el valor de "modalidad" no se modificó en el formulario se personaliza el elemento MODAL, sino pasa a la siguiente validación.
                if (modalidad.value === "Seleccione una opción...") {
                    tituloModal.textContent = "Error!"
                    cuerpoModal.textContent = "Por favor, seleccione indique la MODALIDAD"
                } else {
                    //Validación de Sueldo Mínimo numérico superior a $100.000.
                    //Si el valor de "sueldoMínimo" no matchea con la regEx (tener solo dígitos) o es menor a 100000 se personaliza el elemento MODAL, sino pasa a la siguiente validación.
                    if (sueldoMinimo.value.match(regExSueldo) === null || sueldoMinimo.value < 100000) {
                        tituloModal.textContent = "Error!"
                        cuerpoModal.textContent = "Solo se recibirán propuestan con un sueldo mínimo de $100000"
                    } else {
                        //Validación de cantidad de caracteres para el MENSAJE.
                        //Si el valor de "mensaje" tiene menos de 50 o más de 500 caracteres se personaliza el elemento MODAL, sino terminan las validaciones.
                        if (mensaje.value.length < 50 || mensaje.value.length > 500) {
                            tituloModal.textContent = "Error!"
                            cuerpoModal.textContent = "El campo MENSAJE debe contener entre 50 y 500 caracteres"
                        } else {
                            /*Pasadas todas las validaciones: 
                            Se personaliza el elemento MODAL.
                            Se calculan y guardan los equivalentes a dolares y euros de sueldoMinimo. 
                            Se asignan a las variables los valores de los elementos (para facilitar el manejo del array campos).
                            Se carga en contenidoTabla los elementos del array campos.
                            Se ordena el array contenidoTabla alfabeticamente por el campo Apellido automaticamente.
                            Se ejecuta la función limpiarFormulario().*/
                            tituloModal.textContent = "Enviado!"
                            cuerpoModal.textContent = "Muchas gracias, su mensaje ha sido enviado con ÉXITO!"
                            apellido = apellido.value
                            nombre = nombre.value
                            email = email.value
                            modalidad = modalidad.value
                            sueldoMinimoDolar = (sueldoMinimo.value/dolar).toFixed(2)
                            sueldoMinimoEuro = (sueldoMinimo.value/euro).toFixed(2)
                            sueldoMinimo = "$" + sueldoMinimo.value + " US$" + sueldoMinimoDolar + " €" + sueldoMinimoEuro
                            mensaje = mensaje.value
                            campos = [apellido, nombre, email, modalidad, sueldoMinimo, mensaje]
                            contenidoTabla.push(campos)
                            ordenarTabla()
                            limpiarFormulario()
                        }
                    }
                }
            }
        }
    }
    //Se muestra el MODAL con las valores seteados en las validaciones.
    modal.show()
}

cargarTabla = () => {
    //Se elimina el elemento "tbody" actual
    cuerpoTabla.remove()
    //Se crea un nuevo elemento "tbody"
    cuerpoTabla = document.createElement("tbody")
    for (var i = 0; i < contenidoTabla.length; i++) {
        //Se crea un elemento "tr" por cada elemento que contiene el array "contenidoTabla"
        filaTabla = document.createElement("tr")
        for (var j = 0; j < campos.length; j++) {
            //Se crea un elemento "td" por cada elemento que contiene el array "campos"
            celdaTabla = document.createElement("td")
            celdaTabla.textContent = contenidoTabla[i][j]
            //Se insertan los elementos "td" dentro de cada elemento "tr"
            filaTabla.appendChild(celdaTabla)
        }
        //Se insertan los elementos "tr" dentro del elemento "tbody"
        cuerpoTabla.appendChild(filaTabla)
    }
    //Se inserta el nuevo elementos "tbody" dentro del elemento "table"
    tabla.appendChild(cuerpoTabla)
}

ordenarTabla = () => {
    ordenarCampoBtn = document.querySelector("#ordenarCampoBtn")
    //Se ordena el array "contenidoTabla" según el campo seleccionado en el formulario
    switch (ordenarCampoBtn.value) {
        case "Ordenar por Apellido":
            contenidoTabla.sort(ordenarPorCampo(0))
            break
        case "Ordenar por Modalidad":
            contenidoTabla.sort(ordenarPorCampo(3))
            break
        case "Ordenar por Sueldo Mínimo":
            contenidoTabla.sort(ordenarPorCampo(4))
            break
        default:
            contenidoTabla.sort(ordenarPorCampo(0))
            break
    }
    //Se realiza la carga de la tabla
    cargarTabla()
}

ordenarPorCampo = (indiceElemento) => {
    ordenarAscDescBtn = document.querySelector("#ordenarAscDescBtn")
    return function(a, b) {
        var elementoA
        var elementoB
        //En caso de querer ordenar por "sueldoMinimo" se parsea a Int el contenido despues del "$"
        if (indiceElemento === 4){
            elementoA = parseInt(a[indiceElemento].slice(1))
            elementoB = parseInt(b[indiceElemento].slice(1))
        } else {
            elementoA = a[indiceElemento]
            elementoB = b[indiceElemento]
        }
        //Dependiendo de la selección del formulario, se ordena el array de forma Ascendente o Descendente
        if (ordenarAscDescBtn.value === "Orden Descendente") {
            if (elementoA < elementoB) return 1
            else if (elementoA > elementoB) return -1
            else return 0
        } else if (ordenarAscDescBtn.value === "Orden Ascendente") {
            if (elementoA < elementoB) return -1
            else if (elementoA > elementoB) return 1
            else return 0
        }
    }
}

limpiarFormulario = () => {
    form.reset()
}

enviarBtn.addEventListener("click", validacion)
reestablecerBtn.addEventListener("click", limpiarFormulario)
ordenarBtn.addEventListener("click", ordenarTabla)