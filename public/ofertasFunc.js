const ul = document.querySelector('#ulparaprod');
const buscarproducto = document.querySelector('#buscarproducto');
const formSearch = document.querySelector('#formSearch');
const formSearchCodigo = document.querySelector('#formSearchCodigo');

const inputBuscar = document.querySelector('#inputBuscar');
const buscarcodigo = document.querySelector('#buscarcodigo');

const searchBarOfertas = document.querySelector('#searchBarOfertas')
const tableBody = document.querySelector('.tableBody');

searchBarOfertas.addEventListener('keyup',(e)=>{
    console.log(e.target.value)
})

searchBarOfertas.addEventListener('keyup', async function(event){
  event.preventDefault();
  const query_buscar = event.target.value;
  try {
    
    const res = await axios.post('/administrador/buscar',
     {
         buscar: query_buscar 
        
    }); 
    const productos = res.data;
    
    console.log(productos);  
    productos.forEach(prod => {
        console.log(prod.nombre)
        console.log(prod.marca)

    });
    // for (let producto of productos){

    //   const td0 = document.createElement('td');
    //   const td1 = document.createElement('td');

    //   const td2 = document.createElement('td');

    //   const td3 = document.createElement('td');

    //   const td4 = document.createElement('td');

    //   const tr = document.createElement('tr');

    //   const ul = document.createElement('ul');
    //   const li = document.createElement('li');
    //   const li2 = document.createElement('li');
    //   const accion1 = document.createElement('a');
    //   const imgButton1 = document.createElement('img');
    //   const accion2 = document.createElement('a');

        
    //   td1.textContent= producto.precioMinorista;
    //   td0.textContent= producto.nombre;
    //   td2.textContent= producto.marca;
    //   td3.textContent= producto.cantidad;
    //   accion1.append(imgButton1);
    //   tr.append(td0,td1,td2,td3,accion1)
    //   tableBody.append(tr);
    //   console.log(producto);  

    // }




    // formSearch.elements.buscar.value = '';
    // inputBuscar.focus();
      } catch (error) {
    console.error(error);
  }
 
})


// formSearchCodigo.addEventListener('submit', async function(event){
//   event.preventDefault();
//   const query_buscar_codigo = formSearchCodigo.elements.buscarcodigo.value;
//   console.log(query_buscar_codigo)
//   try {
    
//     const res = await axios.post('/administrador/productos/buscar-codigo', {buscar: query_buscar_codigo }); 
//     const productosDeCodigo = res.data;

//     console.log(productosDeCodigo);  

//     // for (let producto of productosDeCodigo){

//     //   const td0 = document.createElement('td');
//     //   const td1 = document.createElement('td');

//     //   const td2 = document.createElement('td');

//     //   const td3 = document.createElement('td');

//     //   const td4 = document.createElement('td');

//     //   const tr = document.createElement('tr');

//     //   const ul = document.createElement('ul');
//     //   const li = document.createElement('li');
//     //   const li2 = document.createElement('li');
//     //   const accion1 = document.createElement('a');
//     //   const accion2 = document.createElement('a');

//     //   td1.textContent= producto.precioMinorista;
//     //   td0.textContent= producto.nombre;
//     //   td2.textContent= producto.marca;
//     //   td3.textContent= producto.cantidad;

//     //   tr.append(td0,td1,td2,td3)
//     //   tableBody.append(tr);
//     //   console.log(producto);  

//     // }




//     formSearchCodigo.elements.buscarcodigo.value = '';
//     buscarcodigo.focus();
//       } catch (error) {
//     console.error(error);
//   }
 
// })
const agregarPeeroducto = (producto)=>{
    const td0 = document.createElement('td');
    const td1 = document.createElement('td');

    const td2 = document.createElement('td');

    const td3 = document.createElement('td');

    const td4 = document.createElement('td');

    const tr = document.createElement('tr');

    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const li2 = document.createElement('li');
    const accion1 = document.createElement('a');
    const accion2 = document.createElement('a');

    td0.textContent= producto.precioMinorista;
    td1.textContent= producto.nombre;
    td2.textContent= producto.marca;
    td3.textContent= producto.cantidad;

    tr.append(td0,td1,td2,td3)
    tableBody.append(tr);

  }
