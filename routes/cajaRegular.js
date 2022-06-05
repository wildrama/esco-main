const express = require('express');
const router = express.Router();
const catchAsync =require('../utils/catchAsync');
// const {isLoggedIn} = require('../middleware');
const Producto = require('../models/productos');
const Venta = require('../models/ventas');
const Oferta = require('../models/ofertas');
const {isLoggedIn,isCaja} = require('../middleware');
const EstacionDeCobro = require('../models/estaciondecobro');

const rolecAJA= 'CAJA';


// isCaja(rolecAJA)
// isCaja(rolecAJA)
// isCaja(rolecAJA)

// READ PRODUCT {
  // isLoggedIn,

// inicio de la estacion
router.get('/:id/inicio',isLoggedIn, catchAsync( async (req, res) => {
  const estacionDeCobroId = req.params.id;
  const usuario = req.user
  const estacionDeCobro = await EstacionDeCobro.findById(estacionDeCobroId);

  res.render('caja/cajainicio',{estacionDeCobro,usuario});

}));

// ir a la caja y llevar las ofertas
router.get('/:id/cajaActiva', isLoggedIn,catchAsync( async (req, res) => {
  const estacionDeCobroId = req.params.id;
  const usuarioID = req.user.id;
  try {
    const estacionDeCobro = await EstacionDeCobro.findById(estacionDeCobroId);
    const ofertasParaEstacion = await Oferta.find({estacionDeCobroParaLaOferta:estacionDeCobroId})
    console.log(ofertasParaEstacion);
    res.render('caja/cajacobro',{ofertasParaEstacion,usuarioID,estacionDeCobro});
  } catch (error) {
    req.flash('error','Intenta de nuevo');
    res.redirect(`/caja/${estacionDeCobroId}/inicio`)
  }

}));




router.post('/buscar', isLoggedIn, async (req, res) => {
  try {
    const codigo = req.body.codigo;
    console.log(codigo);
     const producto = await Producto.findOne({codigo: codigo });
    res.json(producto);    
  } catch (error) {
      res.send('error')
  } 


})

router.post('/finalizar-compra', isLoggedIn, async (req, res) => {
    const {compraFinalizada} = req.body;
    const producto = await Producto.findOne({codigo: codigoInput})
    
    res.json(producto);
        
  })
// }


// ENVIAR DATOS DEL FORMULARIO A LA BBDD

router.post('/',isLoggedIn, catchAsync( async (req,res)=>{
 const nuevoProducto = new Producto (req.body);
 await nuevoProducto.save();
  res.redirect(`/administrador/productos/${nuevoProducto._id}`)
} ))

// }




module.exports = router;
