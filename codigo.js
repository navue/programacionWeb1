enviarBtn = document.querySelector("#enviarBtn")
reestablecerButton = document.querySelector("#reestablecerBtn")
apellido = document.querySelector('#apellido')
nombre = document.querySelector('#nombre')
email = document.querySelector('#email')
modalidad = document.querySelector('#modalidad')
sueldoMinimo = document.querySelector('#sueldoMinimo')
mensaje = document.querySelector('#mensaje')
modal = new bootstrap.Modal(document.querySelector('#modal'))
tituloModal = document.querySelector('.modal-title')
cuerpoModal = document.querySelector('.modal-body')
form = document.querySelector("#contacto")
campos = [apellido, nombre, email, sueldoMinimo, mensaje]
regExMayusculas = /(^[A-ZÑÁÉÍÓÚÜ][a-zñáéíóúü]+)(\s[A-ZÑÁÉÍÓÚÜ]{1}[a-zñáéíóúü]*)?$/g
regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
regExSueldo = /^\d+$/g

validacion = () => {
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
                        cuerpoModal.textContent = "Solo se recibirán propuestan con un sueldo mínimo equivalente a $100.000"
                    } else {
                        //Validación de cantidad de caracteres para el MENSAJE
                        if (mensaje.value.length < 50 || mensaje.value.length > 500) {
                            tituloModal.textContent = "Error!"
                            cuerpoModal.textContent = "El campo MENSAJE debe contener entre 50 y 500 caracteres"
                        } else {
                            //Pasadas todas las validaciones
                            tituloModal.textContent = "Enviado!"
                            cuerpoModal.textContent = "Muchas gracias, su mensaje ha sido enviado con ÉXITO!"
                            limpiarFormulario()
                        }
                    }
                }
            }
        }
    }
    modal.show()
}

limpiarFormulario = () => {
    form.reset();
}

enviarBtn.addEventListener("click", validacion);
reestablecerButton.addEventListener("click", limpiarFormulario);