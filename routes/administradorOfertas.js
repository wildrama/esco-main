const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAdmin} = require('../middleware');
const Producto = require('../models/productos');
const Oferta = require('../models/ofertas');
const OfertaSingular = require('../models/ofertaSingular');
const User = require('../models/usuario');




const roleADM = 'ADMINISTRADOR';

 router.get('/crearOfertaConjunto',(req,res)=>{
    const oferta1 = new Oferta({nombreOferta: "Combo pizza",precioOferta:200,estacionDeCobroParaLaOferta:"629c08e964c1213565a4dfd51"})
    oferta1.save();
    console.log(oferta1)
    res.send(oferta1)
  })
  router.get('/crearOfertaIndividual',(req,res)=>{
    const oferta1 = new Oferta({precioOferta:200,cantidadDeProductosParaOferta:3,estacionDeCobroParaLaOferta:"629c08e964c1213565a4dfd51"})
    oferta1.save();
    console.log(oferta1)
    res.send(oferta1)
  })

// menu inicio ofertas
router.get('/',catchAsync( async (req,res)=>{
    const ofertasConjunto =  [2];
    const ofertasIndividuales = [1];
    res.render('panelOfertas/ofertaInicio',{ofertasConjunto,ofertasIndividuales})
}))
router.get('/text-search-bar', (req,res)=>{
    const searchQuery = req.params;
    res.json(searchQuery)
})
// ver oferta individual
// router.get('/:id', async(req,res)=>{

//     const {id} =req.params;
//     const producto = await Producto.findById(id);

//     res.render('panelOfertas/ofertaTest',{producto});
// })

router.post('/', (req,res)=>{
    console.log(req.body);
    res.send('oferta cargada');
})

// ver todas las ofertas en dos tablas



// agregar-oferta-conjunto

// render form para crear la oferta de conjunto
router.get('/agregar-oferta-conjunto', (req,res)=>{
    res.render('panelOfertas/crearOfertaConjunto')
})

router.post('/agregar-oferta-conjunto', (req,res)=>{
    res.render('panelOfertas/crearOfertaConjunto')
})

// ver oferta de conjunto
router.get('/oferta-conjunto/:id', (req,res)=>{
    const ofertaConjuntoId= req.params.id;
    res.render('panelOfertas/verOfertaConjunto')
})




// agregar oferta de un mismo producto

// PANTALLA 1 DE OFERTA INDIVIDIDUAL
// RENDER de buscador por codigo y obtención del resultado en pantalla
router.get('/agregar-oferta-individual/', (req,res)=>{

    
    res.render('panelOfertas/crearOfertaIndividualP1')
})

// render de la 2da pantalla con el formulario
router.get('/agregar-oferta-individual/nueva', (req,res)=>{
    res.render('panelOfertas/crearOfertaIndividualP1')
})
// post del form para crear la oferta individual
router.post('/agregar-oferta-individual', (req,res)=>{
    res.redirect('/administrador/ofertas/oferta-individual/:id')
})

// mostrar la oferta creada del producto individual/ mostrar oferta individual
router.get('/oferta-individual/:id', (req,res)=>{
    res.render('panelOfertas/verOfertaIndividual')
})









// ver ofertas vigentes de cada tipo


// sin edit oferta
module.exports = router;