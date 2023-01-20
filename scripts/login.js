if (localStorage.jwt) {
  window.location.replace('mis-tareas.html')
}

window.addEventListener('load', () => {

  const form = document.querySelector('.container form')
  const email = document.querySelector('#inputEmail')
  const pass = document.querySelector('#inputPassword')

  form.addEventListener('submit', event => {
    event.preventDefault()
    mostrarSpinner()
    user = {
      email : email.value,
      password: pass.value
    }
    realizarLogin(user)
  })

  const realizarLogin = settings => {
    fetch(`${endpoint}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(settings)
    })
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        return response.text()
      }
    })
    .then(data => {
      console.log(data)
      if (data.token) {
        localStorage.setItem('jwt', data.token)
        ocultarSpinner()
        window.location.replace('mis-tareas.html')
      } else {
        Swal.fire(
          'Error de logueo',
          'Credenciales incorrectas',
          'error'
        )
        .then(({ isConfirmed }) => {
          if(isConfirmed) {
            ocultarSpinner()
            pass.value = ''
          }
        })
      }
    })
  }
  
})