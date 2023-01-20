// ----- ENDPOINT -----

const endpoint = 'https://todo-api-production-64af.up.railway.app/api'

// ----- VALIDACIONES -----

const validarEmail = email => {
  return RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email.value)
}

function validarPassword(pass) {
  return pass.value.length >= 8
}

function compararPasswords(pass_1, pass_2) {
  return pass_1.value === pass_2.value
}

// ----- ERRORES -----

const errores = (errors, email, pass_1, pass_2) => {
  if (!validarEmail(email)) errors.innerHTML += `<p class="errors">Debes ingresar un email válido.</p>`
  if (!validarPassword(pass_1)) errors.innerHTML += `<p class="errors">La contraseña debe tener al menos 8 caracteres.</p>`
  if (!compararPasswords(pass_1, pass_2)) errors.innerHTML += `<p class="errors">Las contraseñas ingresadas deben ser iguales.</p>`
}