const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAdmin} = require('../middleware');
const Producto = require('../models/productos');
const Oferta = require('../models/ofertas');

const User = require('../models/usuario');




const roleADM = 'ADMINISTRADOR';

router.get('/', (req,res)=>{

    res.render('stock/ofertaInicio')
})
router.get('/:id', (req,res)=>{
    const {id} =req.params.id;
    const producto = Producto.findById(id);

    res.render('stock/ofertaTest',{producto});
})

router.post('/', (req,res)=>{
    console.log(req.body);
    res.send('oferta cargada');
})




module.exports = router;