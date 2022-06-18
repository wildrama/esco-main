const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAdmin,isCaja} = require('../middleware');
const EstacionDeCobro = require('../models/estaciondecobro');
const Venta = require('../models/ventas');
const Producto = require('../models/productos');




const roleADM = 'ADMINISTRADOR';
const roleCaja = 'CAJA';
    // const ventaRealizada = {
    //     dineroIngresado : req.body.dineroIngresado,
    //     dineroDeSalida : req.body.dineroDeSalida,
    //     productos:[
    //         {
    //             valorDelProductoEnLaCompra: req.body.productoIndividual.precio,
    //             identificadorDeProducto: req.body.productoIndividual.id
    //         }
    //     ],
    //     estacionDeCobro: req.body.estacionDeCobro.id
    // }; 
       // const ventaEfectuada = new Venta({
    //     dineroIngresado : 300,
    //     dineroDeSalida : 200,
    //     productos:[
    //         {
    //             valorDelProductoEnLaCompra: 299,
    //             identificadorDeProducto: "624488cac68a3c3a7b2df4ec"
    //         }
    //     ],
    //     ticketEntregado: "SI",
    //     cantidadDeProductosTotales: 4,
    //     estacionDeCobro: "62966a1ba25b27a2c062578d"
    // });
router.post('/saves-ventas', catchAsync(async(req,res)=>{

    // guardar la venta
    // guardar el id de la venta en 'ventasRealizadasEnLaEstacion'
    //actualizar la cantidad de ventas realizadas- cantidad de montos ingresados- dinero en caja actual-
      const ventaRealizada = {
        dineroIngresado : req.body.dineroIngresado,
        dineroDeSalida : req.body.dineroDeSalida,
        productosDeStock:[

            {
                valorDelProductoEnLaCompra: req.body.productoIndividual.precio,
                identificadorDeProducto: req.body.productoIndividual.id
            }
        ],
        productosSinStock:[

            {
                valorDelProductoEnLaCompra: req.body.productoIndividual.precio,
                identificadorDeProducto: req.body.productoIndividual.identificador
            }
        ],
        ticketEntregado: req.body.ticket,
        cantidadDeProductosTotales: req.body.cantidadDeProductosTotales,
        estacionDeCobro: req.body.estacionDeCobroId
    }; 
    const ventaEfectuada = await new Venta(ventaRealizada)

    await ventaEfectuada.save();
    const estacionId = req.body.estacionDeCobroId;
    const ventaID= ventaEfectuada._id;
    const agregarVentaALaEstacion= await EstacionDeCobro.findById(estacionId)
    agregarVentaALaEstacion.ventasRealizadasEnLaEstacion.push(ventaID);
    agregarVentaALaEstacion.save()
    console.log(ventaEfectuada);
    console.log({ventaEfectuada});
    res.json(ventaEfectuada,agregarVentaALaEstacion)
}))

router.get('/try-save', async(req,res)=>{
    const datos = await EstacionDeCobro.find({});
    console.log(datos);
    res.json(datos);
    // asdas
})
router.get('/p', async(req,res)=>{
    const datos = await Producto.find({});
    console.log(datos);
    res.json(datos);
    
})


router.get('/ventasEstacion', async(req,res)=>{
    const estacionId = "62966a1ba25b27a2c062578d";

    const datos = await EstacionDeCobro.findById(estacionId);
 await datos.populate("ventasRealizadasEnLaEstacion")
  datos.populated('ventasRealizadasEnLaEstacion')
 const idDeUnproducto = datos.ventasRealizadasEnLaEstacion[0].productos[0].identificadorDeProducto;
    console.log(datos);
    const buscarOtroProd = await Producto.findById(idDeUnproducto);

    res.json(buscarOtroProd);


})        
module.exports = router;