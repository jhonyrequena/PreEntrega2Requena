// Buscar el producto en el array de productos
let elementosCarrito = document.getElementById('carrito')
//Funcion Principal
function peluqueria (){
  //Array de productos
    let productos = [
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
    ]
    console.log(productos)
    let buscador = document.getElementById('search')
    buscador.addEventListener('input', () => {
    filtro(productos, buscador.value.toLowerCase())
  })
    
    // Guardar el carrito en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(productos))
    // Obtener el carrito del almacenamiento local
    let carritoJSON = JSON.parse(localStorage.getItem('carrito'))
    let carrito = carritoJSON ? carritoJSON : []

    let botonCarrito = document.getElementById('botonCarrito')
    botonCarrito.addEventListener('click', carrito)
    
    cards (productos, carrito)
}

  //Llamado de la Funcion principal
  peluqueria()

  //Funcion para crear las tarjetas de los productos de manera dinamica
  function cards (productos, carrito){

    let contenedor = document.getElementById('productos')
    contenedor.innerHTML = ''
    
    productos.forEach (tarjeta => {
      let producto = document.createElement('div')
      producto.classList.add('tarjetaProducto')
      producto.innerHTML =`
        <div class = 'card-body'>
          <div class= 'd-flex flex-column justify-content-between align-items-center my-3'>
            <h3 class = 'card-title'>${tarjeta.nombre}</h3>
            <img class = 'imagenTarjeta img-fluid text-center' src='img/${tarjeta.rutaImagen}'>
            <h3 class = 'card-text'>Precio: $${tarjeta.precio}</h3>
            <button id='${tarjeta.id}' class = 'btn btn-secondary'>Agregar al carrito</button>
          </div>
        </div>
        `
      contenedor.appendChild(producto) 
    })
    // Obtener los elementos del carrito y el botón "Agregar al carrito"
    let botonesAgregar = document.querySelectorAll('.btn-secondary')
    // Agregar evento click a los botones "Agregar al carrito"
    botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', (e) => {
    // Obtener el ID del producto seleccionado
    agregarAlCarrito(e.target.id)
    })
  })
}

  //Funcion que permite filtrar productos por nombre y categoria
  function filtro(productos, busqueda) {
    let filtroArray = productos.filter(tarjeta => tarjeta.nombre.toLowerCase().includes(busqueda) || tarjeta.categoria.toLowerCase().includes(busqueda))
    cards(filtroArray)
  }

  
  let productoEncontrado = carritoJSON.find((p) => p.id === carritoJSON.id)
  
function agregarAlCarrito(id){
    
  // Verificar si el producto ya está en el carrito
  let productoEnCarrito = carrito.find((p) => p.id === producto.id)

  if (productoEnCarrito) {
    // El producto ya está en el carrito, incrementar las unidades y actualizar el subtotal
    productoEnCarrito.unidades++
    productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precio
  } else {
    // El producto no está en el carrito, agregarlo al carrito con una unidad y subtotal inicial
    let nuevoProducto = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      unidades: 1,
      subtotal: producto.precio,
    }
    carrito.push(nuevoProducto)
  }
}

//Función para renderizar el carrito
function renderizarCarrito(nuevoProducto, carrito) {
  elementosCarrito.innerHTML = ''

//Recorrer los productos en el carrito
  carrito.forEach((producto) => {
    let elementoProducto = document.createElement('div')
    elementoProducto.classList.add('elementoDelCarrito')
    elementoProducto.innerHTML = `
      <p>${producto.nombre}</p>
      <p>${producto.precio}</p>
      <p>${producto.subtotal}</p>
    `
    elementosCarrito.appendChild(elementoProducto)
  })
}