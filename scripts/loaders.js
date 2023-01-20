const mostrarSpinner = () => {
  const body = document.querySelector("body")
  const form = document.querySelector("form")
  const spinnerContainer = document.createElement("div")
  const spinner = document.createElement("div")
  
  spinnerContainer.setAttribute("id", "contenedor-carga")
  spinner.setAttribute("id", "carga")
  form.classList.add("hidden")
  spinnerContainer.appendChild(spinner)
  body.appendChild(spinnerContainer)
}

const ocultarSpinner = () => {
  const body = document.querySelector("body")
  const form = document.querySelector("form")
  const spinnerContainer = document.querySelector("#contenedor-carga")

  body.removeChild(spinnerContainer)
  form.classList.remove("hidden")
}