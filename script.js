//Aqui comenzare a crear el script para que las potenciales clientas conozcan los montos de los
//posibles trabajos que se quieran realizar

function calcularPrecio (servicio, largoPelo, formaPago) {
    let precioBase = 0

    //Determinar el precio base segun el servicio seleccionado
    switch (servicio) {
        case "color":
            precioBase = 500
            break
        case "mechas":
            precioBase = 600
            break
        case "balayage":
            precioBase = 700
            break
        case "reflejos":
            precioBase = 400
            break
        case "alisado":
            precioBase = 800
            break
        case "hidratacion":
            precioBase = 300
            break
        case "corte":
            precioBase = 200
            break
        default:
            return "Servicio invalido"
    }

    //Aplicar ajuste de precio segun el largo del pelo
    switch (largoPelo) {
        case "corto":
            precioBase += 0
            break
        case "mediano":
            precioBase += 100
            break
        case "largo":
            precioBase += 200
            break
        default:
            return "Largo de pelo invalido"
    }

    //Aplicar descuento del 10% si el pago es en efectivo
    if (formaPago === "efectivo"){
        let descuento = precioBase * 0.1
        precioBase -= descuento
        }

    return precioBase
}

let nombreCliente = prompt("Ingresa tu nombre:")
alert("Hola" + " " +  nombreCliente + "," + " Bienvenido(a)")

//Pidiendo las opciones al cliente
//Mas adelante quisiera que estas opciones se puedan elegir de una lista desplegable y que se puedan elegir opciones varias en servicios
let largoPelo = prompt("Ingresa el largo de Pelo: Corto, Mediano o Largo")
let formaPago = prompt("Forma de Pago: Efectivo o Transferencia?")
let numServicios = parseInt(prompt("Cuantos servicios desea seleccionar?"))

let precioTotal = 0

for (let i = 0; i < numServicios; i++) {
    let servicio = prompt("Selecciona un Servicio: Color, Mechas, Balayage, Reflejos, Hidratación, Alisado o Corte")
    let precioServicio = calcularPrecio(servicio, largoPelo, formaPago)
    precioTotal += precioServicio
}

alert (nombreCliente + " " + "el precio a pagar es de: $" + precioTotal)


