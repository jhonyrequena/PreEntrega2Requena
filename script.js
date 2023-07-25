let productos = []

// Obtener el contenedor de productos y carrito del DOM
const contenedorProductos = document.getElementById('contenedorProductos')
const contenedorCarrito = document.getElementById('contenedorCarrito')

// Obtener el carrito almacenado en el localStorage o crear uno vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || []

// Cargar los productos usando fetch desde el archivo JSON
function cargarProductos() {
    fetch('productos.json')
      .then(response => response.json())
      .then(data => {
        // Guardar los productos en la variable productos
        productos = data.productos
        // Mostrar los productos en el contenedor
        mostrarProductos(productos)
      })
      .catch(error => console.error('Error al cargar los productos:', error))
}


const inputBusqueda = document.getElementById('search')
inputBusqueda.addEventListener('input', buscarProductos)

function buscarProductos() {
    const textoBusqueda = inputBusqueda.value.toLowerCase() // Obtener el texto de búsqueda y convertirlo a minúsculas

    const productosFiltrados = productos.filter((producto) => {
          // Filtrar los productos por nombre y categoría
          const nombre = producto.nombre.toLowerCase()
          const categoria = producto.categoria.toLowerCase()
          
          return nombre.includes(textoBusqueda) || categoria.includes(textoBusqueda)
        })

    mostrarProductos(productosFiltrados) // Mostrar los productos filtrados en el contenedor
}

// Mostrar los productos en el contenedor
function mostrarProductos(productos) {
    contenedorProductos.innerHTML = ''

    productos.forEach((producto) => {
      // Crear la tarjeta del producto
      const tarjeta = document.createElement('div')
      tarjeta.classList.add('tarjetaProducto')
      
      // Crear el contenido de la tarjeta
      const contenido = ` 
        <h3>${producto.nombre}</h3>
        <img src="img/${producto.rutaImagen}" alt="${producto.nombre}" />
        <p>Precio: $${producto.precio}</p>
        <button class="btnComprar" data-id="${producto.id}">Comprar</button>
      `
      
      // Agregar el contenido a la tarjeta
      tarjeta.innerHTML = contenido
      
      // Agregar evento al botón de comprar
      const btnComprar = tarjeta.querySelector('.btnComprar')
      btnComprar.addEventListener('click', agregarAlCarrito)
      
      // Agregar la tarjeta al contenedor
      contenedorProductos.appendChild(tarjeta)
    })
}

// Agregar un producto al carrito
function agregarAlCarrito(event) {
    const productoId = parseInt(event.target.dataset.id)
    const producto = productos.find((p) => p.id === productoId)

    const productoEnCarrito = carrito.find((p) => p.id === productoId)

      if (productoEnCarrito) {
          productoEnCarrito.cantidad++
      } else {
          producto.cantidad = 1
          carrito.push(producto)
      }

    guardarCarritoEnStorage()

    mostrarContadorCarrito()

    avisoAgregado()

    mostrarCarrito()
}


const btnCarrito = document.getElementById('botonCarrito')
const modalCarrito = document.getElementById('modalCarrito')
const modalCerrar = document.querySelector('.modalCerrar')

// Mostrar el modal del carrito al hacer clic en el botón del carrito
btnCarrito.addEventListener('click', mostrarModalCarrito)

// Cerrar el modal del carrito al hacer clic en la X
modalCerrar.addEventListener('click', cerrarModalCarrito)

// Mostrar el modal del carrito
function mostrarModalCarrito() {
    modalCarrito.style.display = 'block'
    mostrarCarrito()
}

// Cerrar el modal del carrito
function cerrarModalCarrito() {
    modalCarrito.style.display = 'none'
}

// Renderizar los productos del carrito
function mostrarCarrito() {
    contenedorCarrito.innerHTML = ''

    carrito.forEach((productos) => {
      // Crear la tarjeta del producto en el carrito
      const tarjetaCarrito = document.createElement('div')
      tarjetaCarrito.classList.add('productoCarrito')
      
      // Calcular el subtotal
      const subtotal = productos.cantidad * productos.precio

      // Crear el contenido de la tarjeta del carrito
      const contenidoCarrito = `
            <img src="img/${productos.rutaImagen}" alt="${productos.nombre}" />
            <h3>${productos.nombre}</h3>
            <p>Precio: $${productos.precio}</p>
            <p>Cantidad: ${productos.cantidad}</p>
            <p>Subtotal: $${subtotal}</p>
            <button class='btnMasMenos' data-id="${productos.id}" onclick="decrementarCantidad(event)">-</button>
            <button class="btnEliminar btnCarrito" data-id="${productos.id}">Eliminar</button>
            <button class='btnMasMenos' data-id="${productos.id}" onclick="incrementarCantidad(event)">+</button>
          `
      
      // Agregar el contenido a la tarjeta del carrito
      tarjetaCarrito.innerHTML = contenidoCarrito
      
      // Agregar evento al botón de eliminar
      const btnEliminar = tarjetaCarrito.querySelector('.btnEliminar')
      btnEliminar.addEventListener('click', eliminarDelCarrito)
      
      // Agregar la tarjeta del carrito al contenedor del carrito
      contenedorCarrito.appendChild(tarjetaCarrito)
})
}

function incrementarCantidad(event) {
  const productoId = parseInt(event.target.dataset.id)
  const productoEnCarrito = carrito.find((producto) => producto.id === productoId)

  if (productoEnCarrito) {
      productoEnCarrito.cantidad += 1
      guardarCarritoEnStorage()
      mostrarContadorCarrito()
      mostrarCarrito()
  }
}

function decrementarCantidad(event) {
  const productoId = parseInt(event.target.dataset.id);
  const productoEnCarrito = carrito.find((producto) => producto.id === productoId)

  if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
      productoEnCarrito.cantidad -= 1
      guardarCarritoEnStorage()
      mostrarContadorCarrito()
      mostrarCarrito()
  }
}

// Eliminar productos del carrito
function eliminarDelCarrito(event) {
    const productoId = parseInt(event.target.dataset.id)
    //carrito = carrito.filter((producto) => producto.id !== productoId)
    const productoEliminar = carrito.findIndex ((producto) => producto.id === productoId)
    
      if (productoEliminar !== -1){
          carrito.splice(productoEliminar, 1)
          guardarCarritoEnStorage()
          avisoEliminado()
          mostrarContadorCarrito()

          if (carrito.length === 0){
            localStorage.removeItem('carrito')
            AvisoSinProductos()
            cerrarModalCarrito()
          } else {
            mostrarCarrito()
          }
      } else {
        mostrarCarrito()
      }
}

//Función para mostrar el contador del carrito
function mostrarContadorCarrito() {
  const contadorCarrito = document.getElementById('contadorCarrito')
  const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0)
  contadorCarrito.textContent = cantidadTotal.toString()
}

// Guardar el carrito en el localStorage
function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Vaciar el carrito y el localStorage
function finalizarCompra() {
    carrito = []
    localStorage.removeItem('carrito')

    AvisoFinalizarCompra()
    cerrarModalCarrito()
}

// Mostrar los productos y el carrito inicialmente
cargarProductos()
mostrarCarrito()

// Agregar evento al botón de finalizar compra
const btnFinalizarCompra = document.getElementById('btnFinalizarCompra')
btnFinalizarCompra.addEventListener('click', finalizarCompra)


//Funcion para mostrar las secciones de la pagina cuando se haga click en cada boton de navegacion.
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav')
  const introSection = document.querySelector('header.home')
  const serviciosSection = document.getElementById('servicios')
  const productosSection = document.getElementById('productos')
  const contactoSection = document.getElementById('contacto')

  nav.style.display = 'block'
  introSection.style.display = 'block'
  serviciosSection.style.display = 'none'
  productosSection.style.display = 'none'
  contactoSection.style.display = 'none'

  //Agregar evento click al boton de Servicios.
  const btnServicio = document.getElementById('btnServicio')
  btnServicio.addEventListener('click', () => {
    serviciosSection.style.display = 'block'
    introSection.style.display = 'none'
    productosSection.style.display = 'none'
    contactoSection.style.display = 'none'
  })

  //Agregar evento click al boton de Productos.
  const btnProducto = document.getElementById('btnProducto')
  btnProducto.addEventListener('click', () => {
    productosSection.style.display = 'block'
    serviciosSection.style.display = 'none'
    introSection.style.display = 'none'
    contactoSection.style.display = 'none'
  })

  //Agregar evento click al boton de Contacto.
  const btnContacto = document.getElementById('btnContacto')
  btnContacto.addEventListener('click', () => {
    contactoSection.style.display = 'block'
    productosSection.style.display = 'none'
    serviciosSection.style.display = 'none'
    introSection.style.display = 'none'
  })
})

function avisoAgregado(){
  Toastify({
    text: "Producto Agregado",
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #F0A00C, #D8AD5C)",
    },
    duration: 2000
  }).showToast();
}

function avisoEliminado(){
  Toastify({
    text: "Producto Eliminado",
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #F60E07, #F1534E)",
    },
    duration: 2000
  }).showToast();
}

function AvisoFinalizarCompra(){
  Swal.fire({
    template: '#my-template'
  })
}

function AvisoSinProductos(){
  Swal.fire({
    template: '#sinProductos'
  })
}