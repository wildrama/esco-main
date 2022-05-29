const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAdmin} = require('../middleware');
const EstacionDeCobro = require('../models/estaciondecobro');




const roleADM = 'ADMINISTRADOR';

// isLoggedIn,isAdmin(roleADM),
router.get('/', async(req, res) => {

  try {
    const estacionesDeCobro = await EstacionDeCobro.find({});

    res.render('panelEstacionCobro/verTodasLasEstaciones', {estacionesDeCobro})
  } catch (error) {
    console.log(error)
    res.redirect('/administrador')
  }
  
});


// crear estacion

        // render formulario
router.get('/nuevaestacion',  (req, res) => {
    console.log(req.user, 'req.user....');

    res.render('panelEstacionCobro/crearEstacion');
  });

        // enviar formulario para la creacion de la estacion
  router.post('/nuevaestacion', catchAsync(async (req, res) => {
   const dineroEnEstacion = req.body.dineroEnEstacion;
   const ubicacionDeEstacion = req.body.ubicacionDeEstacion
    const nuevaEstacion = new EstacionDeCobro({dineroEnEstacion: dineroEnEstacion,ubicacionDeEstacion:ubicacionDeEstacion});
    await nuevaEstacion.save();

    req.flash('success', 'Estación de cobro creada');
    res.redirect('/administrador/estacionesdecobro/')
 }))


//  agregar datos a la estación 


router.get('/:id', catchAsync(async (req,res)=>{
  try {
    const  {id}  = req.params;
    console.log('asdasd')
  
    const estacionDeCobro = await EstacionDeCobro.findById(id);
  
  console.log({estacionDeCobro})
  } catch (error) {
    res.render('errors', error)

  }

}))

router.put('/:id', catchAsync(async(req,res)=>{
  // agregar datos a la estación
}))
module.exports = router;