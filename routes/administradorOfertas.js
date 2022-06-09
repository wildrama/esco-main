const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAdmin} = require('../middleware');
const Producto = require('../models/productos');
const Oferta = require('../models/ofertas');

const User = require('../models/usuario');




const roleADM = 'ADMINISTRADOR';
// menu inicio ofertas
router.get('/', (req,res)=>{

    res.render('panelOfertas/ofertaInicio')
})
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

// agregar-oferta-conjunto

router.get('/agregar-oferta-conjunto', (req,res)=>{
    res.render('panelOfertas/crearOfertaConjunto')
})

router.post('/agregar-oferta-conjunto', (req,res)=>{
    res.render('panelOfertas/crearOfertaConjunto')
})

// agregar oferta de un mismo producto

router.get('/agregar-oferta-individual', (req,res)=>{
    res.render('panelOfertas/crearOfertaIndividualP1')
})

router.post('/agregar-oferta-individual', (req,res)=>{
    res.redirect('/administrador/ofertas/:id/oferta-individual')
})
// ver ofertas vigentes de cada tipo


// sin edit oferta
module.exports = router;