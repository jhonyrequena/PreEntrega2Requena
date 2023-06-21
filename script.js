/*Programa para salon de belleza donde el usuario puede visualizar el costo de diferentes servicios, 
ademas de poder filtrar por categoria segun la categoria del servicio.*/
//Array para los servicios
let servicios = [
    {nombre: 'Tintura', categoria: 'Color', precio: 5000}, //0
    {nombre: 'Reflejos', categoria: 'Color', precio: 15000}, //1
    {nombre: 'Balayage', categoria: 'Color', precio: 15000}, //2
    {nombre: 'Botox', categoria: 'Nutrición', precio: 10000}, //3
    {nombre: 'Mascarilla Capilar', categoria: 'Nutrición', precio: 5000}, //4
    {nombre: 'Ampollas Capilares', categoria: 'Nutrición', precio: 4000}, //5
    {nombre: 'Manicure', categoria: 'Manos y Pies', precio: 2000}, //6
    {nombre: 'Pedicure', categoria: 'Manos y Pies', precio: 3000}, //7
]

//Entrada para bienvenida al usuario
let nombreCliente = prompt('Ingresa tu nombre:')
alert(`Hola ${nombreCliente}, bienvenido(a) a:\n ***StyloRoss Peluqueria***`)

//Luego se hace el llamado a la funcion principal para que inicie el programa
principal()

//La idea de esta funcion es que el usuario tenga la posibilidad de elegir un servicio y ademas agregarle el factor del largo de su cabello, para que dicha funcion retorne el precio total para el servicio
function calcularPrecioPeluqueria() {
  
    let precioPeluqueria = 0
    let factorPrecioLargo = 1
  
    while (true) {
      let opcionesServicio  = Number(prompt('Elige los servicios a continuación:\n1- Tintura\n2- Reflejos\n3- Balayage\n4- Botox\n5- Mascarilla Capilar\n6- Ampollas Capilares\n9- Volver al menú anterior'))
  
      if (opcionesServicio  >= 1 && opcionesServicio  <= 6) {
        precioPeluqueria += servicios[opcionesServicio  - 1]?.precio || 0
        break
      } else if (opcionesServicio  === 9) {
        principal()
        return // Regresa a la función principal
      } else {
        alert('Opción inválida. Por favor, elige una opción válida.')
      }
    }
  
    while (true) {
        let: opciones = Number(prompt('Elige tu largo de cabello:\n1- Corto\n2- Medio\n3- Largo\n9- Regresar al menú anterior'))
    
        if (opciones === 1) {
          factorPrecioLargo = 1
          break
        } else if (opciones === 2) {
          factorPrecioLargo = 1.2
          break
        } else if (opciones === 3) {
          factorPrecioLargo = 1.4
          break
        } else if (opciones === 9) {
            principal()
            return // Regresa a la función principal
        } else {
          alert('Opción inválida. Por favor, elige una opción válida.')
        }
      }
  
    let precioTotal = precioPeluqueria * factorPrecioLargo
    alert('El precio total para los servicios elegidos sería de: $' + precioTotal)
    principal() // Regresa a la función principal
  }
  
//Con este bloque de codigo lo que busco es poder implementar el uso de funciones dentro de otras funciones
function manosPies() {
  while (true) {
    let opcion = Number(prompt('Elije los servicios a continuacion:\n1-Manicure\n2-Pedicure\n9-Regresar al menu anterior'))

    switch (opcion) {
      case 1:
        let servicioManicure = servicios.find((servicio) => servicio.nombre === 'Manicure')
        alert('El costo del servicio de Manicure es: $' + servicioManicure.precio)
        break

      case 2:
        let servicioPedicure = servicios.find((servicio) => servicio.nombre === 'Pedicure')
        alert('El costo del servicio de Pedicure es: $' + servicioPedicure.precio)
        break

      case 9:
        return principal()

      default:
        alert('Opción inválida. Por favor, elige una opción válida.')
        break
    }
  }
}

//Validacion para las opciones de la pantalla principal
function principal() {
  while (true) {
    
    let opcion = prompt('Aca puedes elegir entre las siguientes opciones: \n1- Servicios de Peluqueria\n2- Servicio de Manos y Pies\n3- Lista de Precios por Servicios de Peluqueria\n0- Salir')

    if (opcion === null) {
      continue
    }

    if (opcion === '') {
      alert('Debes ingresar una opción. Por favor, elige una opción válida.')
      continue
    }

    opcion = Number(opcion)

    if (isNaN(opcion)) {
      alert('Opción inválida. Por favor, elige una opción válida.')
      continue
    }

    switch (opcion) {
      case 1:
        calcularPrecioPeluqueria()
        break

      case 2:
        manosPies()
        break

      case 3:
        let opcionFiltro = prompt('Elige una opción:\n1- Precios de Servicios para Color\n2- Precios de Servicios para Nutrición\n9-Regresar al menu anterior')

        if (opcionFiltro === null) {
          continue
        }

        if (opcionFiltro === '') {
          alert('Debes ingresar una opción. Por favor, elige una opción válida.')
          continue
        }

        opcionFiltro = Number(opcionFiltro)

        if (isNaN(opcionFiltro)) {
          alert('Opción inválida. Por favor, elige una opción válida.')
          continue
        }

        let serviciosFiltrados = servicios.filter(servicio => {
          if (opcionFiltro === 1) {
            return servicio.categoria === 'Color'
          } else if (opcionFiltro === 2) {
            return servicio.categoria === 'Nutrición'
          }
        })

        let serviciosMostrados = serviciosFiltrados.map(servicio => `${servicio.nombre} - $${servicio.precio}`)
        alert(`Lista de precios:\n${serviciosMostrados.join('\n')}`);
        break

      case 0:
        alert('Muchas gracias por visitarnos.\nEspero vuelvas pronto.')
        return

      default:
        alert('Opción inválida. Por favor, elige una opción válida.')
    }
  }
}