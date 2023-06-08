const regExMayusculas = /(^[A-ZÑÁÉÍÓÚÜ][a-zñáéíóúü]+)(\s[A-ZÑÁÉÍÓÚÜ]{1}[a-zñáéíóúü]*)?$/g
const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const regExSueldo = /^\d+$/g
const dolar = 243.54
const euro = 260.77

var enviarBtn = document.querySelector("#enviarBtn")
var reestablecerButton = document.querySelector("#reestablecerBtn")
var ordenarBtn = document.querySelector("#ordenarBtn")
var modal = new bootstrap.Modal(document.querySelector('#modal'))
var tituloModal = document.querySelector('.modal-title')
var cuerpoModal = document.querySelector('.modal-body')
var form = document.querySelector("#contacto")
var cuerpoTabla = document.querySelector("#cuerpoTabla")
var tabla = document.querySelector('.table-striped')
var contenidoTabla = []
var apellido, nombre, email, modalidad, sueldoMinimo, mensaje, filaTabla, celdaTabla, sueldoMinimoDolar, sueldoMinimoEuro, campos

validacion = () => {
    apellido = document.querySelector('#apellido')
    nombre = document.querySelector('#nombre')
    email = document.querySelector('#email')
    modalidad = document.querySelector('#modalidad')
    sueldoMinimo = document.querySelector('#sueldoMinimo')
    mensaje = document.querySelector('#mensaje')
    campos = [apellido, nombre, email, modalidad, sueldoMinimo, mensaje]
    //Validación de campos OBLIGATORIOS
    vacios = false
    campos.map((e) => e.value === "" ? vacios = true : vacios)
    if (vacios) {
        tituloModal.textContent = "Error!"
        cuerpoModal.textContent = "Por favor, complete todos los campos OBLIGATORIOS!"
    } else {
        //Validación de Apellido/Nombre iniciando con MAYUSCULA (Valida hasta dos nombres y dos apellidos)
        if (apellido.value.match(regExMayusculas) === null || nombre.value.match(regExMayusculas) === null) {
            tituloModal.textContent = "Error!"
            cuerpoModal.textContent = "Por favor, ingrese su Apellido/Nombre iniciando con MAYÚSCULA!"
        } else {
            //Validación de formato de Email VALIDO
            if (email.value.match(regExEmail) === null) {
                tituloModal.textContent = "Error!"
                cuerpoModal.textContent = "Por favor, ingrese un Email VÁLIDO!"
            } else {
                //Validación de Modalidad SELECCIONADA
                if (modalidad.value === "Seleccione una opción...") {
                    tituloModal.textContent = "Error!"
                    cuerpoModal.textContent = "Por favor, seleccione indique la MODALIDAD"
                } else {
                    //Validación de Sueldo Mínimo numérico superior a $100.000
                    if (sueldoMinimo.value.match(regExSueldo) === null || sueldoMinimo.value < 100000) {
                        tituloModal.textContent = "Error!"
                        cuerpoModal.textContent = "Solo se recibirán propuestan con un sueldo mínimo de $100000"
                    } else {
                        //Validación de cantidad de caracteres para el MENSAJE
                        if (mensaje.value.length < 50 || mensaje.value.length > 500) {
                            tituloModal.textContent = "Error!"
                            cuerpoModal.textContent = "El campo MENSAJE debe contener entre 50 y 500 caracteres"
                        } else {
                            //Pasadas todas las validaciones
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
                            cargarTabla()
                            limpiarFormulario()
                        }
                    }
                }
            }
        }
    }
    modal.show()
}

cargarTabla = () => {
    cuerpoTabla.remove()
    cuerpoTabla = document.createElement("tbody")
    for (var i = 0; i < contenidoTabla.length; i++) {
        filaTabla = document.createElement("tr")
        for (var j = 0; j < campos.length; j++) {
            celdaTabla = document.createElement("td")
            celdaTabla.textContent = contenidoTabla[i][j]
            filaTabla.appendChild(celdaTabla)
        }
        cuerpoTabla.appendChild(filaTabla)
    }
    tabla.appendChild(cuerpoTabla)

}

ordenarTabla = () => {
    contenidoTabla.sort()
    cargarTabla()
}

limpiarFormulario = () => {
    form.reset()
}

enviarBtn.addEventListener("click", validacion)
reestablecerButton.addEventListener("click", limpiarFormulario)
ordenarBtn.addEventListener("click", ordenarTabla)