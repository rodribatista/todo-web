const renderizarSkeletons = (cantidad, contenedor) => {
  const contenedorTareas = document.querySelector(contenedor)
  const skeletons = Array.from({ length: cantidad })
              
  skeletons.forEach(() => {
    const template = `
      <li class="skeleton-container ${contenedor.replace(".", "")}-child">
        <div class="skeleton-card">
          <p class="skeleton-text"></p>
          <p class="skeleton-text"></p>
        </div>
      </li>
    `
    contenedorTareas.innerHTML += template
  })
}

const removerSkeleton = contenedor => {
  const contenedorTareas = document.querySelector(contenedor)
  const skeletons = document.querySelectorAll(`${contenedor}-child`)
  
  skeletons.forEach((skeleton) => contenedorTareas.removeChild(skeleton))
}