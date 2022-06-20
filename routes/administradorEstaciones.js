const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAdmin,isCaja} = require('../middleware');
const EstacionDeCobro = require('../models/estaciondecobro');
const Venta = require('../models/ventas');




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
   const dineroDeInicio = req.body.dineroEnEstacion;
   const ubicacionDeEstacion = req.body.ubicacionDeEstacion
    const nuevaEstacion = new EstacionDeCobro({dineroDeInicio: dineroDeInicio,dineroEnEstacion: dineroDeInicio,ubicacionDeEstacion:ubicacionDeEstacion});
    await nuevaEstacion.save();
    
    req.flash('success', 'Estación de cobro creada');
    res.redirect(`/administrador/estacionesdecobro/${nuevaEstacion._id}`)
 }))


// subtotal1 Dinero de inicio- Subtotal2- dinero de ventas-  dinero que debe haber en caja: TOTAL
//  agregar datos a la estación 

router.get('/:id', catchAsync(async (req,res)=>{
  let dineroParcialSumado = 0;
  try {
    const  id  = req.params.id;
    const estacionDeCobro = await EstacionDeCobro.findById(id).populate("ventasRealizadasEnLaEstacion").exec()
    // const ventasDeEstaEstacion = await Venta.find({estacionDeCobro:mongoose.Types.ObjectId(id)}).
    console.log(estacionDeCobro)
    let dineroTotal = 0;
    let arrayVentas = estacionDeCobro.ventasRealizadasEnLaEstacion;
    arrayVentas.map( datoVenta =>{
      dineroTotal = dineroTotal + datoVenta.dineroIngresado;
dineroParcialSumado = dineroTotal
    })
    res.render('panelEstacionCobro/verEstacion', {estacionDeCobro,dineroParcialSumado})
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


       // render formulario ingreso-efectivo-inicio

router.get('/:id/ingreso-efectivo-inicio', async  (req, res) => {
      const estacionDeCobroId = req.params.id;
      const estacionDeCobro = await EstacionDeCobro.findById(estacionDeCobroId);
 res.render('panelEstacionCobro/ingreso-efectivo-inicio',{estacionDeCobro});
      });

// post de ingreso efectivo-inicio
router.post('/:id/ingreso-efectivo-inicio', catchAsync(async(req,res)=>{
 
  const estacionId = req.params.id;
  const cantidad = req.body.dineroDeIngresoInicio;
 
 
  const estacionDeCobro = await EstacionDeCobro.findByIdAndUpdate(estacionId,{$set:{ dineroDeInicio: cantidad}, $inc:{dineroEnEstacion :cantidad }}).exec();
  

  req.flash('success', `Se ingreso $${cantidad} al inicio de la caja`);

res.redirect(`/administrador/estacionesdecobro/${estacionDeCobro._id}`)
}))

// render de ingreso efectivo 
router.get('/:id/ingreso-efectivo', async  (req, res) => {
  const estacionDeCobroId = req.params.id;
  const estacionDeCobro = await EstacionDeCobro.findById(estacionDeCobroId);
res.render('panelEstacionCobro/ingreso-efectivo',{estacionDeCobro});
  });
// post de
// Ingresar efectivo a la estación de cobro
router.post('/:id/ingreso-efectivo', catchAsync(async(req,res)=>{
 
  const estacionId = req.params.id;
  const cantidad = req.body.dineroDeIngreso;
  const fecha = Date.now();
 
  const ingresoEfectivo = {
    cantidad: cantidad,
    fecha:fecha
  }
  const estacionDeCobro = await EstacionDeCobro.findByIdAndUpdate(estacionId,{$push:{ ingresosDeEfectivoManual: ingresoEfectivo},$inc:{dineroEnEstacion :cantidad }}).exec();
  

  req.flash('success', `Se ingreso $ ${cantidad}`);

res.redirect(`/administrador/estacionesdecobro/${estacionDeCobro._id}`)
}))
// render de egreso efectivo 
router.get('/:id/egreso-efectivo', async  (req, res) => {
  const estacionDeCobroId = req.params.id;
  const estacionDeCobro = await EstacionDeCobro.findById(estacionDeCobroId);
res.render('panelEstacionCobro/egreso-efectivo',{estacionDeCobro});
  });
// post de
// Retirar efectivo a la estación de cobro

router.post('/:id/egreso-efectivo', catchAsync(async(req,res)=>{
  const estacionId = req.params.id;
  const cantidad = req.body.dineroDeEgreso;
  const fecha = Date.now();
 
  const egresoEfectivo = {
    cantidad:cantidad,
    fecha:fecha
  }
  const estacionDeCobro = await EstacionDeCobro.findByIdAndUpdate(estacionId,{$push:{ egresosDeEfectivoManual: egresoEfectivo},$inc:{dineroEnEstacion :-cantidad }}).exec();

  
  req.flash('success',`Se realizo un retiro de efectivo de $${cantidad}`);

res.redirect(`/administrador/estacionesdecobro/${estacionDeCobro._id}`)
}))



// reiniciar el dia



router.post('/:id/reset', catchAsync( async(req, res) => {
    const estacionDeCobroId = req.params.id;
    if(req.body.dineroDeInicio){
      
      const estacionDeCobro = await EstacionDeCobro.findByIdAndUpdate(estacionDeCobroId,{dineroDeInicio:req.body.dineroDeInicio,dineroEnEstacion:req.body.dineroDeInicio}).exec();

      req.flash('success',`Se reseteo el dia correctamente`);

      res.redirect(`/administrador/estacionesdecobro/${estacionDeCobro._id}`);
    }else{
      const estacionDeCobro1 = await EstacionDeCobro.findByIdAndUpdate(estacionDeCobroId,{dineroDeInicio:0,dineroEnEstacion:0}).exec();

      req.flash('success',`Se reseteo el dia correctamente`);

      res.redirect(`/administrador/estacionesdecobro/${estacionDeCobro1._id}`);
    }


    
    }));



// historial de usuarios
router.get('/:id/historial-usuario', catchAsync(async(req,res)=>{
  const estacionId = req.params.id;
  const estacionDeCobro = await EstacionDeCobro.findById(estacionId);
  
   dayUserInEstacion
res.render('panelEstacionCobro/estacion-historial',{estacionDeCobro})
}))

router.get('/:id/cierre-caja', async  (req, res) => {
  const estacionDeCobroId = req.params.id;
  const estacionDeCobro = await EstacionDeCobro.findById(estacionDeCobroId);
res.render('panelEstacionCobro/cierre-caja',{estacionDeCobro});
  });


// delete de estacion

router.get('/:id/eliminar-caja', catchAsync(async  (req, res) => {
  const estacionDeCobroId = req.params.id;
  const estacionDeCobro = await EstacionDeCobro.findById(estacionDeCobroId);
res.render('panelEstacionCobro/eliminar-caja',{estacionDeCobro});
  }));



router.delete('/:id/eliminar-caja', catchAsync(async (req, res) => {
  const { id } = req.params;
  const eliminarEstacion = await EstacionDeCobro.findByIdAndDelete(id);
  if (!eliminarEstacion) {
    req.flash('error', 'No se puede eliminar la estación');
    return res.redirect('/administrador/estacionesdecobro');
}
req.flash('sucess', 'Estación eliminada correctamente');

  res.redirect('/administrador/estacionesdecobro');
}))
// agregar ofertas a la estación
module.exports = router;

