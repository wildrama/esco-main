const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,logAdmin,logCaja} = require('../middleware');
const EstacionDeCobro = require('../models/estaciondecobro');
const User = require('../models/usuario');

const passport = require('passport');
const Oferta = require('../models/ofertas');

router.get('/administrador', async (req, res) => {
    
    res.render('adminicio');
    
  });

  router.get('/crearOferta',(req,res)=>{
    const oferta1 = new Oferta({precioOferta:200,cantidadDeProductosParaOferta:3,estacionDeCobroParaLaOferta:"629c08e964c1213565a4dfd51"})
    oferta1.save();
    console.log(oferta1)
    res.send(oferta1)
  })
  router.get('/ingreso-administrador', async(req,res)=>{
    res.render('home');
  });


//   ingreso a caja
  router.get('/ingreso-caja',catchAsync( async(req,res)=>{
      try {
        // const sesionDeUsuario = req.user;
        const estacionesDeCobro = await EstacionDeCobro.find({});

        res.render('inicioCajas',{estacionesDeCobro});
      } catch (error) {
        req.flash('error', 'No hay cajas activas');
          res.redirect('/');
      }
   

  }));
  router.get('/ingreso-caja/:id/login',(req,res)=>{
    const estacionDeCobroId = req.params.id;
    res.render('ingresoCaja',{estacionDeCobroId});

  });
// post del ingreso del usuario
  router.post('/ingreso-caja/:id/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/ingreso-caja' }),async (req, res) => {
    const estacionDeCobroId = req.params.id;

       try {
        const checkearSiExisteCaja = await EstacionDeCobro.findById(estacionDeCobroId)
        
        res.redirect(`/caja/${checkearSiExisteCaja._id}/inicio`);
        
    } catch (error) {
      req.flash('error', ' Intenta de nuevo');
        res.redirect('/ingreso-caja');
    }
    
    
    })




module.exports = router;
