const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAdmin,isCaja} = require('../middleware');
const EstacionDeCobro = require('../models/estaciondecobro');




const roleADM = 'ADMINISTRADOR';
const roleCaja = 'CAJA';

// isLoggedIn,isAdmin(roleADM),

// mostrar las estaciones
router.get('/', async(req, res) => {
console.log(req.user.funcion)
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
    res.redirect(`/administrador/estacionesdecobro/${nuevaEstacion._id}`)
 }))


//  agregar datos a la estación 


router.get('/:id', catchAsync(async (req,res)=>{
  try {
    const  {id}  = req.params;
  
    const estacionDeCobro = await EstacionDeCobro.findById(id);
    res.render('panelEstacionCobro/verEstacion', {estacionDeCobro})
  } catch (error) {
    res.render('errors', error)

  }

}))

router.put('/:id', catchAsync(async(req,res)=>{
  // agregar datos a la estación
}))

// mostrar el historial de ventas

router.get('/:id/historia-ventas', catchAsync(async(req,res)=>{
  const id = req.params;

  const historialVentasEstacion = await EstacionDeCobro.findById(id).populated("Venta","dineroIngresado productos").exec()
  console.log({historialVentasEstacion});
  console.log(historialVentasEstacion);

  res.render('panelEstacion/estacion-historial',{ historialVentasEstacion})

res.send('ok');
}))
// delete de estacion
router.delete('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const eliminarEstacion = await EstacionDeCobro.findByIdAndDelete(id);
  if (!eliminarEstacion) {
    req.flash('error', 'No se puede eliminar la estación');
    return res.redirect('/administrador/estacionesdecobro');
}
req.flash('sucess', 'Estación eliminada correctamente');

  res.redirect('/administrador/estacionesdecobro');
}))


// editar mas info de la estación

// agregar ofertas a la estación
module.exports = router;