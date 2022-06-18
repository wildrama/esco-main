const mongoose = require('mongoose');
const { Schema } = mongoose;
const Usuario = require('./usuario')
const Venta = require('./ventas');

EstacionDeCobroSchema = new Schema({
    ubicacionDeEstacion:{
        type: String
    },
    dineroDeInicio: {
        type: Number,

    }
    ,
    dineroEnEstacion: {
        
        type: Number,
        required: true
    },
    
    comprasRealizadas: {
        type: Number
    },
   
    ingresosDeEfectivoManual: [
        {
            cantidad:Number,
            fecha: Date
        }
    ],
    egresoDeEfectivoManual: [
        {
            cantidad:Number,
            fecha: Date
            
            
        }
    ],
    historialDeUsuarios:[
        {
           nombreUser:String,
           
            fechaDeLogeoEnEstación: Date
        
        }
       
    ],

  
    // usuarioActual:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Usuario'
    // },
    ventasRealizadasEnLaEstacion:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Venta'
        }
    ],
    isActive:{
        type: String,
        enum:['SI', 'NO'],
       }

},{timestamps:true})

const EstacionDeCobro = mongoose.model('EstacionDeCobro', EstacionDeCobroSchema);

module.exports = EstacionDeCobro