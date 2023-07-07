function miProgramaPrincipal() {
    let productos = [
      { id: 2, nombre: "pelota de futbol", categoria: "deportes", stock: 2, precio: 5000, rutaImagen: "pelota-futbol.jpg" },
      { id: 5, nombre: "gorra 1", categoria: "indumentaria", stock: 7, precio: 2650, rutaImagen: "gorra.jpg" },
      { id: 7, nombre: "remera mangas cortas", categoria: "indumentaria", stock: 4, precio: 4500, rutaImagen: "remera.jpg" },
      { id: 9, nombre: "pelota de voley", categoria: "deportes", stock: 1, precio: 2800, rutaImagen: "pelota-voley.jpg" },
      { id: 12, nombre: "remera mangas largas", categoria: "indumentaria", stock: 3, precio: 7300, rutaImagen: "remera-ml.jpeg" },
      { id: 15, nombre: "short de basquet", categoria: "indumentaria", stock: 8, precio: 5600, rutaImagen: "short.jpg" },
      { id: 17, nombre: "gorra 2", categoria: "otros", stock: 7, precio: 2650, rutaImagen: "gorra2.jpg" },
    ]
    
    let carritoJSON = JSON.parse(localStorage.getItem("carrito"))
    let carrito = carritoJSON ? carritoJSON : []
    
    let contenedor = document.getElementById("contenedor")
    renderizar(productos, contenedor, carrito)
    renderizarCarrito(carrito)
  
    let botonFinalizarCompra = document.getElementById("finalizarCompra")
    botonFinalizarCompra.addEventListener("click", () => finalizarCompra(carrito))
  }
  
  miProgramaPrincipal()
  
  function finalizarCompra(carrito) {
    let carritoFisico = document.getElementById("carrito")
    carritoFisico.innerHTML = ""
    localStorage.removeItem("carrito")
    carrito = []
    renderizarCarrito([])
  }
  
  
  function renderizar(arrayDeElementos, contenedor, carrito) {
  
    contenedor.innerHTML = ""
  
    arrayDeElementos.forEach(({ nombre, rutaImagen, stock, id }) => {
      let tarjetaProducto = document.createElement("div")
  
      tarjetaProducto.classList.add("tarjetaProducto")
      tarjetaProducto.innerHTML = `
        <h2>${nombre}</h2>
        <div class=imagen style="background-image: url(./images/${rutaImagen})"></div>
        <p>Quedan ${stock} unidades</p>
        <button id=${id}>Agregar al carrito</button>
      `
      contenedor.appendChild(tarjetaProducto)
      let botonAgregarAlCarrito = document.getElementById(id)
      botonAgregarAlCarrito.addEventListener("click", () => agregarAlCarrito(arrayDeElementos, id, carrito))
    })
  }
  
  function agregarAlCarrito(arrayDeElementos, id, carrito) {
    let productoBuscado = arrayDeElementos.find(producto => producto.id === id)
    let posicionProductoEnCarrito = carrito.findIndex(producto => producto.id === id)
  
    if (posicionProductoEnCarrito !== -1) {
      carrito[posicionProductoEnCarrito].unidades++
      carrito[posicionProductoEnCarrito].subtotal = carrito[posicionProductoEnCarrito].unidades * carrito[posicionProductoEnCarrito].precioUnitario
    } else {
      carrito.push({
        id: productoBuscado.id,
        nombre: productoBuscado.nombre,
        precioUnitario: productoBuscado.precio,
        unidades: 1,
        subtotal: productoBuscado.precio
      })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
  }
  
  function renderizarCarrito(carritoJSON) {
    let carritoFisico = document.getElementById("carrito")
    carritoFisico.innerHTML = `
      <div id=encabezadoCarrito>
        <p>Nombre</p>
        <p>Precio Unitario</p>
        <p>Unidades</p>
        <p>Subtotal</p>
      </div>
    `
  
    carritoJSON.forEach(({ nombre, precioUnitario, unidades, subtotal }) => {
      let elementoDelCarrito = document.createElement("div")
      elementoDelCarrito.classList.add("elementoDelCarrito")
      elementoDelCarrito.innerHTML = `
        <p>${nombre}</p>
        <p>${precioUnitario}</p>
        <p>${unidades}</p>
        <p>${subtotal}</p>
      `
      carritoFisico.appendChild(elementoDelCarrito)
    })
  }
  
  let botonCarrito = document.getElementById("botonCarrito")
  botonCarrito.addEventListener("click", mostrarOcultar)
  
  function mostrarOcultar() {
    let padreContenedor = document.getElementById("productos")
    let carrito = document.getElementById("contenedorCarrito")
    padreContenedor.classList.toggle("oculto")
    carrito.classList.toggle("oculto")
  }