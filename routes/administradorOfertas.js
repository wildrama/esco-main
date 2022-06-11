const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAdmin} = require('../middleware');
const Producto = require('../models/productos');
const Oferta = require('../models/ofertas');
const OfertaSingular = require('../models/ofertaSingular');
const User = require('../models/usuario');
const EstacionDeCobro = require('../models/estaciondecobro');




const roleADM = 'ADMINISTRADOR';

 router.get('/crearOfertaConjunto',(req,res)=>{
    const oferta3 = new Oferta({
        nombreOferta: "Combo pizza 2",
        precioOferta: 6500,  
              estacionDeCobroParaLaOferta:"62924a4176573c035a8072b1"
    })

   
    oferta3.save();
    console.log(oferta3)
    res.send(oferta3)
  })



  router.get('/crearOfertaIndividual',(req,res)=>{
    const oferta1 = new OfertaSingular({
        cantidadDeUnidadesNecesarias:5,
        precioOferta:500,
        productoEnOferta:"6237df00fb8ae17c0d27a6d1",
        estacionDeCobroParaLaOferta:"629c08e964c1213565a4dfd51"
    })
    oferta1.save();
    console.log(oferta1)
    res.send(oferta1)
  })

// menu inicio ofertas
router.get('/',catchAsync( async (req,res)=>{
    const ofertasConjunto =  await Oferta.find({});
    const ofertasIndividuales = await OfertaSingular.find({}).populate('productoEnOferta');
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
router.get('/agregar-oferta-conjunto', async (req,res)=>{

    const estacionesDeCobro = await EstacionDeCobro.find({});

    res.render('panelOfertas/crearOfertaConjunto',{estacionesDeCobro})
})

router.post('/agregar-oferta-conjunto', catchAsync(async(req,res)=>{
    console.log(req.body)
    const nombreOferta = req.body.nombreOferta;
    const fechaDeVigencia = new Date(req.body.fechaDeVigencia);
    const precioOferta = req.body.precioOferta;
    const productosEnOfertaConCodigo = req.body.productosEnOfertaConCodigo;
    const estacionDeCobroParaLaOferta = req.body.estacionDeCobroParaLaOferta;
    const nuevaOferta = new Oferta({
            nombreOferta:nombreOferta ,
              fechaDeVigencia:fechaDeVigencia ,
            precioOferta:precioOferta ,
            productosEnOfertaConCodigo: productosEnOfertaConCodigo,
            estacionesDeCobroParaLaOferta:estacionDeCobroParaLaOferta });
            await nuevaOferta.save();
            console.log(nuevaOferta)

            req.flash('success', 'Estación de cobro creada');
            res.redirect(`/administrador/ofertas/oferta-conjunto/${nuevaOferta._id}`)
}));

// ver oferta de conjunto
router.get('/oferta-conjunto/:id',async (req,res)=>{
    const ofertaConjuntoId= req.params.id;
    const ofertaConjuntoParaVer = await Oferta.findById(ofertaConjuntoId).populate('estacionesDeCobroParaLaOferta').exec();
    console.log(ofertaConjuntoParaVer)
    res.render('panelOfertas/verOfertaConjunto',{ofertaConjuntoParaVer})
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
router.get('/oferta-individual/:id',catchAsync(async (req,res)=>{
    const ofertaIndividualId = req.params.id;
    const ofertaIndividualParaVer = await OfertaSingular.findById(ofertaIndividualId).populate('productoEnOferta','nombre').populate('estacionesDeCobroParaLaOferta').exec();
    console.log(ofertaIndividualParaVer)

    res.render('panelOfertas/verOfertaIndividual',{ofertaIndividualParaVer})
}))


// delete oferta individual

router.delete('/oferta-individual/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const ofertaIndividualParaEliminar = await OfertaSingular.findByIdAndDelete(id);
    if (!ofertaIndividualParaEliminar) {
      req.flash('error', 'No se puede eliminar la OFERTA');
      return res.redirect('/administrador/ofertas');
  }
  req.flash('success', 'Oferta eliminada correctamente');
  
    res.redirect('/administrador/ofertas');
  }))


// delete oferta conjunto
router.delete('/oferta-conjunto/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const ofertaConjuntoParaEliminar = await Oferta.findByIdAndDelete(id);
    if (!ofertaConjuntoParaEliminar) {
      req.flash('error', 'No se puede eliminar la OFERTA');
      return res.redirect('/administrador/ofertas');
  }
  req.flash('success', 'Oferta eliminada correctamente');
  
    res.redirect('/administrador/ofertas');
  }))



// ver ofertas vigentes de cada tipo


// sin edit oferta
module.exports = router;