const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAdmin,isCaja} = require('../middleware');
const EstacionDeCobro = require('../models/estaciondecobro');




const roleADM = 'ADMINISTRADOR';
const roleCaja = 'CAJA';

// isLoggedIn,isAdmin(roleADM),

// mostrar las estaciones y ultimas ventas
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
    const  id  = req.params.id;
    const estacionDeCobro = await EstacionDeCobro.findById(id).populate("ventasRealizadasEnLaEstacion").exec()
    console.log(estacionDeCobro)
    res.render('panelEstacionCobro/verEstacion', {estacionDeCobro})
  } catch (error) {
    res.render('errors', error)

  }

}))

router.put('/:id', catchAsync(async(req,res)=>{
  // agregar datos a la estación
}))

// mostrar el historial de ventas

router.get('/:id/historial-ventas', catchAsync(async(req,res)=>{
const id = req.params.id;

const historialVentasEstacion = await EstacionDeCobro.findById(id).populate("ventasRealizadasEnLaEstacion").exec()
console.log(historialVentasEstacion)

res.render('panelEstacionCobro/estacion-historial')

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

// Ingresar efectivo a la estación de cobro
router.get('/:id/ingreso-efectivo', catchAsync(async(req,res)=>{
  const estacionId = req.params.id;
 
  dineroDeIngreso = req.body.dineroDeIngreso;

  const estacionDeCobro = await EstacionDeCobro.findById(estacionId);
  estacionDeCobro.ingresosDeEfectivoManual.push(dineroDeIngreso) 
  
  await estacionDeCobro.save()

  req.flash('success', `Se ingreso ${dineroDeIngreso}`);

res.redirect(`/administrador/estacionesdecobro/${estacionDeCobro._id} `)
}))
// Retirar efectivo a la estación de cobro

router.get('/:id/egreso-efectivo', catchAsync(async(req,res)=>{
  const estacionId = req.params.id;
  dineroDeEgreso = req.body.dineroDeEgreso;

  const estacionDeCobro = await EstacionDeCobro.findById(estacionId);
  estacionDeCobro.egresoDeEfectivoManual.push(dineroDeEgreso) 
  await estacionDeCobro.save();
  
  req.flash('success',`Se realizo un retiro de efectivo de ${dineroDeEgreso}`);

res.redirect(`/administrador/estacionesdecobro/${estacionDeCobro._id} `)
}))





// historial de usuarios
router.get('/:id/historial-usuario', catchAsync(async(req,res)=>{
  const estacionId = req.params.id;
  const estacionDeCobro = await EstacionDeCobro.findById(estacionId);
  
   dayUserInEstacion
res.render('panelEstacionCobro/estacion-historial',{estacionDeCobro})
}))
// agregar ofertas a la estación
module.exports = router;