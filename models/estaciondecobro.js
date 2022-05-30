const mongoose = require('mongoose');
const { Schema } = mongoose;
const Usuario = require('./usuario')
const Venta = require('./ventas');

EstacionDeCobroSchema = new Schema({
    ubicacionDeEstacion:{
        type: String
    },
    dineroEnEstacion: {
        type: Number,
        required: true,

    },

    cantComprasRealizadas: {
        type: Number
    },
    montosIngresados: [
        {
            type: Number
        }
    ],
    ingresosDeEfectivoManual: [
        {
            type: Number
        }
    ],
    egresoDeEfectivoManual: [
        {
            type: Number
        }
    ],
    historialDeUsuarios:[
        {
            type: String
        }
    ],
    usuarioActual:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    comprasRealizadasEnLaEstacion:[
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