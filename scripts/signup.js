window.addEventListener('load', () => {

  const form = document.querySelector('.container form')
  const name = document.querySelector('#inputNombre')
  const last = document.querySelector('#inputApellido')
  const email = document.querySelector('#inputEmail')
  const pass_1 = document.querySelector('#inputPassword')
  const pass_2 = document.querySelector('#inputPasswordRepetida')
  
  const errorsContainer = document.querySelector('#errors')

  form.addEventListener('submit', function (event) {
    event.preventDefault()
    errorsContainer.innerHTML = ''
    errores(errorsContainer, email, pass_1, pass_2)
    if (validarEmail(email) && validarPassword(pass_1) && compararPasswords(pass_1, pass_2)) {
      mostrarSpinner()
      user = {
        firstName: name.value.trim(),
        lastName: last.value.trim(),
        email: email.value.trim(),
        password: pass_2.value.trim()
      }
      realizarRegistro(user)
    }
  })

  const realizarRegistro = settings => {
    fetch(`${endpoint}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(settings)
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (data.message !== 'Usuario registrado correctamente') {
        Swal.fire(
          'Error de registro',
          data.message,
          'error'
        )
        .then(({ isConfirmed }) => {
          if(isConfirmed) {
            ocultarSpinner()
            pass_1.value = ''
            pass_2.value = ''
          }
        })
      } else {
        Swal.fire(
          'Registro exitoso',
          data.message,
          'success'
        )
        .then(({ isConfirmed }) => {
          if(isConfirmed) {
            window.location.replace('index.html')
          }
        })
      }
    })
  }

})