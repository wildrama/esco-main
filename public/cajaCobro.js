import {iniciar} from "./edit.js";
import {agregarArriba} from "./agregarProducto.js"
import {arrEliminar} from './eliminarDeCaja.js'
//Elementos
export const textBuscar = document.getElementById("textBuscar");
const cajaCobroForm = document.getElementById("cajaCobroForm");
const sbBuscar = document.getElementById("sbBuscar");
const tablaCajaCobro = document.getElementById("tablaCajaCobro");
const totalHTML = document.getElementById("total");
const dineroIngresado = document.getElementById("dineroIngresado");
const vuelto = document.getElementById("vuelto");
const imprimirTicketC = document.getElementById("imprimirTicketC");
const cancelarCompra = document.getElementById("cancelarCompra");
const cambiarPrecio = document.getElementById("cambiarPrecio");
const imprimirTicketA = document.getElementById("imprimirTicketA");
const eliminarProductos = document.getElementById("eliminarProductos");
const agregarProducto = document.getElementById("agregarProducto");
const finalizarCompra = document.getElementById("finalizarCompra");
const bBody = document.getElementsByTagName("body")
bBody[0].classList.add("body")
textBuscar.focus()
//Variables globales

export let productosAgregados = [{nombre: "vacio", precio: 0, cantidadAgregada: 1, impuestoPrecio: 0, borrado: false}];
let cantidad;
let index;
let totalGlobal;
let vueltoGlobal; 
let ingresoDinero;
//Funciones

export const eliminar = () => {
		console.log(productosAgregados)
		console.log("Los productos que estan agregados son:")
		console.log(productosAgregados)
		console.log("Los productos que se van a intentar eliminar son:")
		console.log(arrEliminar)

	arrEliminar.map(arr => {
	for(let i = 0; i < productosAgregados.length; i++) {
		console.log(`Se va a comparar ${arr} con ${productosAgregados[i].nombre}`)	
		if(arr == productosAgregados[i].nombre) {
			productosAgregados[i].borrado = true;
			console.log(productosAgregados)
			const trEspecifico = document.getElementsByClassName(productosAgregados[i].idArr)
			console.log(trEspecifico)
			trEspecifico[0].style.display = "none"

			productosAgregados[i].cantidadAgregada = 0;
			sumarConImpuesto()			
	
		}
	}

	})
 
	console.log(productosAgregados)
}

export const importar = () => {
	agregarArriba.map(importando => {
		let aAg = {
			nombre: importando.nombre,
			precio: importando.precio,
			cantidadAgregada : importando.cantidadAgregada,
			impuestoPrecio: importando.impuestoPrecio,
			borrado: false
		}
		
		let check = false;
		const tr = document.createElement("tr");
		sumarConImpuesto()
		productosAgregados.map(prod => {
			
		sumarConImpuesto()
			if (prod.nombre == aAg.nombre || (prod.nombre == aAg.nombre && prod.borrado == true )) {
				check = true;
				prod.cantidadAgregada = prod.cantidadAgregada + 1;
				let fila = document.getElementsByClassName(prod.idArr);
				fila[0].children[1].innerHTML = prod.cantidadAgregada;
				fila[0].children[3].innerHTML = prod.cantidadAgregada * prod.impuestoPrecio;
				fila[0].style.display = "table-row"
				sumarConImpuesto()
		textBuscar.focus()	

			}

			





		})
		
		if (check == false) {
		productosAgregados.push(aAg);
		sumarConImpuesto()	
		
		const tdNombre = document.createElement("td")
		const tdPrecio = document.createElement("td")
		const tdCantidad = document.createElement("td")
		const tdSubtotal = document.createElement("td")
		const pSubtotal = document.createElement("p")
		const divPrecio = document.createElement("div")
		const pSigno = document.createElement("p")

		tdNombre.innerHTML = aAg.nombre
		tdCantidad.innerHTML = aAg.cantidadAgregada
		//tdPrecio.innerHTML = aAg.impuestoPrecio
		tdPrecio.appendChild(pSigno)
		tdPrecio.appendChild(divPrecio)
		divPrecio.innerHTML = aAg.impuestoPrecio
		divPrecio.style.width = "100px"
		divPrecio.style.height = "30px"
		divPrecio.style.display = "flex"
		divPrecio.style.justifyContent = "center";
		tdPrecio.style.display = "flex"
		tdPrecio.style.justifyContent = "space-between"
		pSigno.innerHTML = "$"
		tdPrecio.appendChild(pSigno)
		tdPrecio.appendChild(divPrecio)
		pSubtotal.innerHTML = `$${aAg.impuestoPrecio * aAg.cantidadAgregada}`;
		tdSubtotal.appendChild(pSubtotal);

		tr.appendChild(tdNombre);
		tr.appendChild(tdCantidad)
		tr.appendChild(tdPrecio)
		tr.appendChild(tdSubtotal)
		tr.style.display = "table-row"	
		tablaCajaCobro.appendChild(tr)
		tr.classList.add(productosAgregados.length - 1)
		aAg.idArr = productosAgregados.length - 1;

		tdPrecio.style.cursor = "pointer"

		let yaNo = false;
		tdPrecio.onclick = () => {
			if (yaNo == false) {
				divPrecio.style.border = "1px solid #f9f9f9"
				divPrecio.style.borderRadius = "5px"
					let precioACambiar =  (aAg.precioMinorista + aAg.impuestoAplicado * aAg.precioMinorista / 100).toFixed(2);
			divPrecio.innerHTML = ""
			const nuevoPrecioText = document.createElement("input");
			nuevoPrecioText.classList.add("nuevoPrecio")
			nuevoPrecioText.type = "text";
			nuevoPrecioText.placeholder = productosAgregados[tr.classList].impuestoPrecio
				
			divPrecio.appendChild(nuevoPrecioText)
			nuevoPrecioText.focus()	
			yaNo = true;
	tr.style.display = "table-row"	
	nuevoPrecioText.addEventListener("keypress", e => {
					if (e.key == "Enter") {
				
						productosAgregados[tr.classList].impuestoPrecio = e.target.value;
						productosAgregados[tr.classList].impuestoPrecio = parseFloat(productosAgregados[tr.classList].impuestoPrecio).toFixed(2)
						let aMostrar =  (productosAgregados[tr.classList].impuestoPrecio *  productosAgregados[tr.classList].cantidadAgregada) 					
						aMostrar = aMostrar.toFixed(2)
						sumarConImpuesto()
						tdSubtotal.innerHTML = "$" + aMostrar	
						

					}
				})
	nuevoPrecioText.addEventListener("focusout", () => {
				yaNo = false;
					divPrecio.innerHTML = productosAgregados[tr.classList].impuestoPrecio
				divPrecio.style.border = "none"
	textBuscar.focus()
				
			})

			}
		}
	}}) 
}



const buscarLetras = str => {
  return false;
}

const sumarTotal = () => {
	
	let sum = 0; 

	for (let i = 0; i < productosAgregados.length; i++) {
		 sum +=  productosAgregados[i].precio * productosAgregados[i].cantidadAgregada;

	return sum.toFixed(2);
	
}
}
const sumarConImpuesto = () => {
	let sum = 0.00; 

	for (let i = 0; i < productosAgregados.length; i++) {
		sum = sum + productosAgregados[i].impuestoPrecio * productosAgregados[i].cantidadAgregada;
			
	totalGlobal = sum.toFixed(2);
	totalHTML.innerHTML = "TOTAL: $" + sum.toFixed(2);
}

}


//Eventos

dineroIngresado.addEventListener('keypress', e => {
	if (e.key === "Enter") {
	ingresoDinero = e.target.value;
	let totalMenosVuelto = e.target.value - totalGlobal;
	vueltoGlobal = totalMenosVuelto.toFixed(2);
	vuelto.innerHTML = "$" + vueltoGlobal;
	
}})


const updateTotalConVuelto = () => {
	letTotalMenosVuelto = ingresoDinero.value - totalGlobal;
	vueltoGlobal = totalMenosVuelto.toFixed(2);
	vuelto.innerHTML = "$" + vueltoGlobal;

}


textBuscar.addEventListener("input", () => {
	textBuscar.style.backgroundColor = "#c4c4c4";
})


//Axios

cajaCobroForm.addEventListener('submit', async e => {
	e.preventDefault();
	const codigoactual = textBuscar.value;
	
	if (buscarLetras(codigoactual) == true) {
		textBuscar.value = "";
		textBuscar.style.backgroundColor = "#ffd6db";
		return;
	}
	try {
		const res = await axios.post('/caja/buscar', {codigo: codigoactual});
		const producto = res.data;
		if(producto.nombre == undefined) {
			textBuscar.value = "";
			textBuscar.style.backgroundColor = 'pink'
			return
		}
		textBuscar.value = "";
	
		const tr = document.createElement("tr");
	const thNombre = document.createElement("td");
		thNombre.innerHTML = producto.nombre;
		const thPrecio =  document.createElement("td");
		const divPrecio = document.createElement("div");
		const signoPrecio = document.createElement("p");
		signoPrecio.innerHTML = "$"
		divPrecio.innerHTML = (producto.precioMinorista + producto.impuestoAplicado * producto.precioMinorista / 100).toFixed(2);
		divPrecio.style.width = "100px"
		divPrecio.style.height = "30px"
		divPrecio.style.display = "flex"
		divPrecio.style.justifyContent = "center";
		thPrecio.style.display = "flex";
		thPrecio.style.justifyContent = "space-between";
		thPrecio.appendChild(signoPrecio)
		thPrecio.appendChild(divPrecio)
		const thCantidad =  document.createElement("td");
		const thSubtotal = document.createElement("td");
		thSubtotal.innerHTML = `$${(producto.precioMinorista + producto.impuestoAplicado * producto.precioMinorista / 100).toFixed(2)}`;
		tr.appendChild(thNombre)
		tr.appendChild(thCantidad)

		tr.appendChild(thPrecio)
		tr.appendChild(thSubtotal);
		thPrecio.style.cursor = "pointer"
		let yaNo = false;
		thPrecio.addEventListener("click", () => {
			if (yaNo == false) {
			divPrecio.style.border = "1px solid #F9F9F9"
			divPrecio.style.borderRadius = "5px"
			let precioACambiar =  (producto.precioMinorista + producto.impuestoAplicado * producto.precioMinorista / 100).toFixed(2);
			divPrecio.innerHTML = ""
			const nuevoPrecioText = document.createElement("input");
			nuevoPrecioText.classList.add("nuevoPrecio")
			nuevoPrecioText.type = "text";
			nuevoPrecioText.placeholder = productosAgregados[tr.classList].impuestoPrecio
				
			divPrecio.appendChild(nuevoPrecioText)
			nuevoPrecioText.focus()	
			yaNo = true;

				nuevoPrecioText.addEventListener("keypress", e => {
					if (e.key == "Enter") {
					
						productosAgregados[tr.classList].impuestoPrecio = e.target.value;
						productosAgregados[tr.classList].impuestoPrecio = parseFloat(productosAgregados[tr.classList].impuestoPrecio).toFixed(2)
						let aMostrar =  (productosAgregados[tr.classList].impuestoPrecio *  productosAgregados[tr.classList].cantidadAgregada) 					
						aMostrar = aMostrar.toFixed(2)
						sumarConImpuesto()
						thSubtotal.innerHTML = "$" + aMostrar	
						

					}
				})
				
			nuevoPrecioText.addEventListener("focusout", () => {
				yaNo = false;
					divPrecio.innerHTML = productosAgregados[tr.classList].impuestoPrecio
				divPrecio.style.border = "none"

				
			})

	

		}})

	


			tr.onclick = () => {
			window.sessionStorage.setItem("codigo", producto.codigo)
						
		}	


		// esta?
		
		let check = false;
		productosAgregados.map(itemProducto => {
			if (itemProducto.nombre == producto.nombre) {
				check = true;
			
				const trEspecifico = document.getElementsByClassName(itemProducto.idArr)
				itemProducto.cantidadAgregada = itemProducto.cantidadAgregada + 1;
				trEspecifico[0].childNodes[1].innerHTML = itemProducto.cantidadAgregada;
				trEspecifico[0].childNodes[3].innerHTML = (itemProducto.cantidadAgregada * itemProducto.impuestoPrecio).toFixed(2)
				trEspecifico[0].style.display = "table-row"
				sumarConImpuesto()	
			}
		})

			if (check == false) {
		
				productosAgregados.push({
						nombre: producto.nombre, 
						precio: producto.precioMinorista,
						impuestoPrecio: (producto.precioMinorista + producto.impuestoAplicado * producto.precioMinorista / 100).toFixed(2),
						marca: producto.marca,
						cantidadAgregada: 1,
						idArr: productosAgregados.length,
						borrado: false
					})
				thCantidad.innerHTML = 1;
				tablaCajaCobro.appendChild(tr)
				tr.classList.add(productosAgregados.length - 1) 
				sumarConImpuesto()

				

			}	

			productosAgregados.map(productoArray => {
			index = productosAgregados.findIndex(() => productoArray.nombre == producto.nombre);
		})
	
	

	} catch (error) {
		if(error == "TypeError: producto is null") {
			textBuscar.value = "";
			textBuscar.style.backgroundColor = "#ffd6db";
				}
	}
})

//Botonena

cancelarCompra.onclick = () => {
	textBuscar.style.backgroundColor = "#c4c4c4";
	tablaCajaCobro.innerHTML = "";
	productosAgregados = [{nombre: "vacio", precio: 0, cantidadAgregada: 1, impuestoPrecio: 0}]
	totalGlobal = 0;
	totalHTML.innerHTML = "TOTAL: $"
	vueltoGlobal = 0;
	dineroIngresado.value = "";
	vuelto.innerHTML = "$"
	textBuscar.focus()
	
}


//datos a pushear 

finalizarCompra.onclick = () => {

	if(productosAgregados.length < 2) {
		alert("No agregaste productos")
		textBuscar.focus()
		return
	}
	if (vueltoGlobal == undefined || vueltoGlobal < 0) {
		alert("monto ingresado invalido")
		textBuscar.focus()
		return
	}
	

//Maqueta de datos, remotamente la definitiva.

let cantidadTotal = 0;
productosAgregados.map(p => {
	cantidadTotal = p.cantidadAgregada + cantidadTotal
})
cantidadTotal = cantidadTotal - 1;


const stringValorDelProducto = () => {
	let stringBase = ""
	productosAgregados.map(p => {
		if (p.nombre != "vacio") {
		stringBase = stringBase + `${p.nombre}x${p.cantidadAgregada}: $${p.impuestoPrecio * p.cantidadAgregada}\n`
			
		
	}})
	textBuscar.focus()
	return stringBase;



}
	const venta = {
		dineroIngresado: ingresoDinero,
		dineroDeSalida: vueltoGlobal,
		codigosDeBarra: [],
		fechaDeEmision: new Date().toString(),
		valorDelProducto: stringValorDelProducto(),
		ticket: false,
		cantidadDeProductosTotales: cantidadTotal,
		turnoCaja: "Mañana o tarde"
	}
	alert("Venta finalizada, ver Consola JavaScript")	
	console.log("EL OBJETO QUE SE VA A IMPORTAR:")
	console.log(venta)
	console.log("LO QUE DICE LA PROPIEDAD valorDelProducto EN EL OBJETO:")
	console.log(venta.valorDelProducto)
textBuscar.focus()



}


