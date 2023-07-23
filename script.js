//Array de productos
/*let productos = [
  {id: 10, nombre: 'Mascara Hidro-Nutritiva Fidelite Caviar', categoria: 'Reparación Capilar', precio: 1600, rutaImagen: 'mascara01.webp'},
  {id: 11, nombre: 'Master Crema Acida Fidelite Color', categoria: 'Reparación Capilar', precio: 1330, rutaImagen: 'mascara02.webp'},
  {id: 12, nombre: 'Mascara Argan Mythical Fidelite', categoria: 'Reparación Capilar', precio: 2500, rutaImagen: 'mascara03.webp'},
  {id: 13, nombre: 'Mascara Renovadora Coco y Vainilla Fidelite', categoria: 'Reparación Capilar', precio: 1490, rutaImagen: 'mascara04.webp'},
  {id: 14, nombre: 'Tijera de Metal Dayo - Navaja 5 1/2', categoria: 'Utensilios', precio: 7680, rutaImagen: 'tijera01.webp'},
  {id: 15, nombre: 'Jessamy Paleta para Reflejos XL', categoria: 'Utensilios', precio: 280, rutaImagen: 'paleta01.webp'},
  {id: 16, nombre: 'Tijera para Pulir Royal - 5.5"', categoria: 'Utensilios', precio: 4430, rutaImagen: 'tijera02.webp'},
  {id: 17, nombre: 'Cepillo Denman - (Alisado)Todo tipo de Cabello', categoria: 'Utensilios', precio: 3960, rutaImagen: 'cepillo02.webp'},
  {id: 18, nombre: 'Cepillo Termico Profesional Jessamy 36mm', categoria: 'Utensilios', precio: 1490, rutaImagen: 'cepillo01.webp'},
  {id: 19, nombre: 'Pincel para Tintura Profesional Jessamy', categoria: 'Utensilios', precio: 260, rutaImagen: 'pincel01.webp'},
  {id: 20, nombre: 'Schwarzkopf Blond me activador premium x 1lt', categoria: 'Color', precio: 7200, rutaImagen: 'oxidante20v01.webp'},
  {id: 21, nombre: 'Kostume Máscara Matizadora Nacre 250gr', categoria: 'Color', precio: 4350, rutaImagen: 'matizador01.webp'},
  {id: 22, nombre: 'Mascara Matizadora Blue - La Puissance', categoria: 'Color', precio: 4600, rutaImagen: 'matizador02.webp'},
  {id: 23, nombre: 'Polvo Decolorante Issue - Professional Blanc Nature x 700gr', categoria: 'Color', precio: 5150, rutaImagen: 'deco01.webp'},
  {id: 24, nombre: 'Polvo Decolorante Schwarzkopf Professional Blondme', categoria: 'Color', precio: 23000, rutaImagen: 'deco02.webp'},
  {id: 25, nombre: 'Polvo Decolorante Issue - Professional Sin Amoniaco', categoria: 'Color', precio: 6050, rutaImagen: 'deco03.webp'},
]*/

// Obtener el contenedor de productos y carrito del DOM
const contenedorProductos = document.getElementById('contenedorProductos')
const contenedorCarrito = document.getElementById('contenedorCarrito')


// Obtener el carrito almacenado en el localStorage o crear uno vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || []

const inputBusqueda = document.getElementById('search')
inputBusqueda.addEventListener('input', buscarProductos)


// Cargar los productos usando fetch desde el archivo JSON
function cargarProductos() {
  fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      // Guardar los productos en la variable productos
      productos = data;
      // Mostrar los productos en el contenedor
      mostrarProductos();
    })
    .catch(error => console.error('Error al cargar los productos:', error));
}


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
function mostrarProductos() {
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
const producto = producto.find((p) => p.id === productoId)

const productoEnCarrito = carrito.find((p) => p.id === productoId)

  if (productoEnCarrito) {
      productoEnCarrito.cantidad++
  } else {
      producto.cantidad = 1
      carrito.push(producto)
  }

guardarCarritoEnStorage()

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
    <button class="btnEliminar" data-id="${productos.id}">Eliminar</button>
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

// Eliminar un producto del carrito
function eliminarDelCarrito(event) {
const productoId = parseInt(event.target.dataset.id)
carrito = carrito.filter((producto) => producto.id !== productoId)
guardarCarritoEnStorage()

mostrarCarrito()
}

// Guardar el carrito en el localStorage
function guardarCarritoEnStorage() {
localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Vaciar el carrito y el localStorage
function finalizarCompra() {
carrito = []
localStorage.removeItem('carrito')

mostrarCarrito()
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