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

      let buscador = document.getElementById('search')
      buscador.addEventListener('input', () => {
      filtro(productos, buscador.value.toLowerCase())
    })
  
  // Obtener el carrito del almacenamiento local
  let carritoJSON = JSON.parse(localStorage.getItem('carrito'))
  let carrito = carritoJSON ? carritoJSON : []

  cards (productos, carrito)
  renderizarCarrito(carritoJSON)

  let btnFinalizarCompra = document.getElementById('finalizarCompra')
  btnFinalizarCompra.addEventListener('click', () => btnFinalizarCompra(carrito))
}

//Llamado de la Funcion principal
peluqueria()

//Funcion para finalizar la compra, modificar el DOM y vaciar el storage
function finalizarCompra (carrito){
  let mostrarCarrito = document.getElementById('carrito')
  mostrarCarrito.innerHTML = ''
  localStorage.removeItem('carrito')
  carrito = []
  renderizarCarrito([])
}

//Funcion para crear las tarjetas de los productos de manera dinamica
function cards (arrayProductos, carrito){
  //Contenedor donde se alojan los productos
  let contenedor = document.getElementById('tarjetas')
  contenedor.innerHTML = ''
  //Para cada tarjeta se agregan las propiedades correspondientes
  arrayProductos.forEach (({nombre, rutaImagen, precio, id}) => {
    let tarjeta = document.createElement('div')
    tarjeta.classList.add('tarjetaProducto')
    tarjeta.innerHTML =`
      <div class = 'card-body'>
        <div class= 'd-flex flex-column justify-content-between align-items-center my-3'>
          <h3 class = 'card-title'>${nombre}</h3>
          <img class = 'imagenTarjeta img-fluid text-center' src='img/${rutaImagen}'>
          <h3 class = 'card-text'>Precio: $${precio}</h3>
          <button id='${id}' class = 'btn btn-outline-success'>Agregar al carrito</button>
        </div>
      </div>
      `
    contenedor.appendChild(tarjeta)

    let btnAgregarCarrito = document.getElementById(id)
    btnAgregarCarrito.addEventListener('click', () => agregarAlCarrito(arrayProductos, id, carrito))
  })
}

function agregarAlCarrito(arrayProductos, id, carrito){
  console.log(id)
  let agregarProducto = arrayProductos.find(producto => producto.id === id)
  let productoAgregado = carrito.findIndex(producto => producto.id === id)

  if (productoAgregado !== -1){
    carrito[productoAgregado].unidades++
    carrito[productoAgregado].subtotal = carrito[productoAgregado].unidades * carrito[productoAgregado].precio
  } else{
    carrito.push({
      Codigo: agregarProducto.id,
      Nombre: agregarProducto.nombre,
      PrecioUnitario: agregarProducto.precio,
      unidades: 1,
      Subtotal: agregarProducto.precio
    })
  }
  localStorage.setItem('carrito', JSON.stringify(carrito))
  renderizarCarrito(carrito)
}

function renderizarCarrito(carritoJSON){
  
  let contenedorCarrito = document.getElementById('carrito')
  contenedorCarrito.innerHTML = ''

  if (carritoJSON){
    carritoJSON.forEach(({Codigo, Nombre, PrecioUnitario, Unidades, Subtotal}) => {
     
      let mostrarCarrito = document.createElement('div')
      mostrarCarrito.classList.add('elementoDelCarrito')
      mostrarCarrito.innerHTML = `
      <ul>
      <li>${Codigo}</li>
      <li>${Nombre}</li>
      <li>${PrecioUnitario}</li>
      <li>${Unidades}</li>
      <li>${Subtotal}</li>
      </ul>
      <button id='${'finalizarCompra'}' class = 'btn btn-outline-primary'>Finalizar Compra</button>
      `
      contenedorCarrito.appendChild(mostrarCarrito)
    })
  }
}

//Funcion que permite filtrar productos por nombre y categoria
function filtro(productos, busqueda) {
  let filtroArray = productos.filter(tarjeta => tarjeta.nombre.toLowerCase().includes(busqueda) || tarjeta.categoria.toLowerCase().includes(busqueda))
  cards(filtroArray)
}