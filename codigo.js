enviarBtn = document.querySelector("#enviarBtn")
apellido = document.querySelector('#apellido')
nombre = document.querySelector('#nombre')
email = document.querySelector('#email')
modalidad = document.querySelector('#modalidad')
sueldoMinimo = document.querySelector('#sueldoMinimo')
mensaje = document.querySelector('#mensaje')
campos = [apellido, nombre, email, sueldoMinimo, mensaje]
regExMayusculas = /(^[A-ZÑÁÉÍÓÚÜ][a-zñáéíóúü]+)(\s[A-ZÑÁÉÍÓÚÜ]{1}[a-zñáéíóúü]*)?$/g
regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
regExSueldo = /^\d+$/g

validacion = () => {
    //Validación de campos OBLIGATORIOS
    vacios = false
    campos.map((e) => e.value === "" ? vacios = true : vacios)
    if (vacios) {
        alert("Por favor, complete todos los campos OBLIGATORIOS!")
        return false
    } else {
        //Validación de Apellido/Nombre iniciando con MAYUSCULA (Valida hasta dos nombres y dos apellidos)
        if (apellido.value.match(regExMayusculas) === null || nombre.value.match(regExMayusculas) === null) {
            alert("Por favor, ingrese su Apellido/Nombre iniciando con MAYÚSCULA!")
            return false
        } else {
            //Validación de formato de Email VALIDO
            if (email.value.match(regExEmail) === null) {
                alert("Por favor, ingrese un Email VÁLIDO!")
                email.focus()
                return false
            } else {
                //Validación de Modalidad SELECCIONADA
                if (modalidad.value === "Seleccione una opción...") {
                    alert("Por favor, seleccione indique la MODALIDAD")
                    modalidad.focus()
                    return false
                } else {
                    //Validación de Sueldo Mínimo numérico superior a $100.000
                    if (sueldoMinimo.value.match(regExSueldo) === null || sueldoMinimo.value < 100000) {
                        alert("Solo se recibirán propuestan con un sueldo mínimo equivalente a $100.000")
                        sueldoMinimo.focus()
                        return false
                    } else {
                        //Validación de cantidad de caracteres para el MENSAJE
                        if (mensaje.value.length < 50 || mensaje.value.length > 500) {
                            alert("El campo MENSAJE debe contener entre 50 y 500 caracteres")
                            mensaje.focus()
                            return false
                        } else {
                            //Pasadas todas las validaciones
                            alert("Muchas gracias, su mensaje ha sido enviado con ÉXITO!")
                            return true
                        }
                    }
                }
            }
        }
    }
}

enviarBtn.addEventListener("click", validacion);

reestablecerButton = document.querySelector("#reestablecerBtn")