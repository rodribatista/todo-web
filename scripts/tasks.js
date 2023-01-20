if (!localStorage.jwt) {
  window.location.replace('index.html')
}

window.addEventListener('load', () => {

  renderizarSkeletons(5, ".tareas-pendientes")

  setTimeout(() => {
    
    const userName = document.querySelector('.user-info p')
    const btnCerrarSesion = document.querySelector('#closeApp')
    const tareasPendientes = document.querySelector('.tareas-pendientes')
    const tareasTerminadas = document.querySelector('.tareas-terminadas')

    const formCrearTarea = document.querySelector('.nueva-tarea')
    const inputTarea = document.querySelector('#nuevaTarea')
    const contadorPendientes = document.querySelector('#cantidad-pendientes')
    const contadorTerminadas = document.querySelector('#cantidad-finalizadas')
    
    const consultarTareas = () => {
      fetch(`${endpoint}/tasks`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
      .then(response => {
        if (response.status !== 204) {
          return response.json()
        }
      })
      .then(data => {
        console.log(data)
        if (data !== undefined) {
          return renderizarTareas(data)
        } else {
          tareasTerminadas.innerHTML = ''
          tareasPendientes.innerHTML = `
            <li class="tarea" data-aos="fade-down">
              <div class="descripcion">
                <p class="nombre">No hay tareas para mostrar</p>  
              </div>
            </li>
          `
        }
      })
    }

    const renderizarTareas = array => {

      tareasPendientes.innerHTML = ''
      tareasTerminadas.innerHTML = ''
      
      const arrayPendientes = array.filter(element => !element.done)
      const arrayTerminadas = array.filter(element => element.done)

      contadorPendientes.innerHTML = arrayPendientes.length
      contadorTerminadas.innerHTML = arrayTerminadas.length
      
      arrayPendientes.forEach(element => {
        tareasPendientes.innerHTML += `
          <li class="tarea" data-aos="fade-down">
            <button class="change" id="${element.id}"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${element.description}</p>
              <p class="timestamp">Creada: ${element.createdAt}</p>
            </div>
          </li>
        `
      })

      arrayTerminadas.forEach(element => {
        tareasTerminadas.innerHTML += `
          <li class="tarea" data-aos="fade-up">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${element.description}</p>
              <p class="timestamp">Completa: ${element.completedAt}</p>
              <div class="cambios-estados">
                <button class="change completa" id="${element.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${element.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>
        `
      })

      const buttonsCambiarEstado = document.querySelectorAll('.change')
      const buttonsBorrarTarea = document.querySelectorAll('.borrar')

      buttonsCambiarEstado.forEach(element => {
        element.addEventListener('click', event => {
          event.preventDefault()
          cambiarEstado(element)
        })
      })

      buttonsBorrarTarea.forEach(element => {
        element.addEventListener('click', event => {
          event.preventDefault()
          borrarTarea(element)
        })
      })
      
    }

    consultarTareas()

    const cambiarEstado = element => {
      fetch(`${endpoint}/tasks/${element.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then( () => {
        return consultarTareas()
      })
    }

    const borrarTarea = element => {
      fetch(`${endpoint}/tasks/${element.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then( () => {
        return consultarTareas()
      })
    }

    formCrearTarea.addEventListener('submit', event => {
      event.preventDefault()
      fetch(`${endpoint}/tasks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          description: inputTarea.value
        }),
      })
      .then( () => {
        inputTarea.value = ''
        return consultarTareas()
      })
    })

    btnCerrarSesion.addEventListener('click', () => {
      Swal.fire({
        title: '¿Desea cerrar la sesión?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cerrar!'
      })
      .then(({ isConfirmed }) => {
        if(isConfirmed) {
          localStorage.clear()
          window.location.reload()
        }
      })
    })
    
  }, 500)
  
})