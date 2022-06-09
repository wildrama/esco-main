const mongoose = require('mongoose');
const { Schema } = mongoose;
const Producto = require('./productos')
// fecha de salida
const ofertasDeProductosSchema = new Schema({
    nombreOferta:{
        type: String,
        required: true
    }
    ,
    fechaDeVigencia: {
        type: Date,
    },
    precioOferta: {
        type: Number,
        required: true

    },
    cantidadDeProductosParaOferta: {
        type: Number,
        required: true

    }
    ,
    
    productosEnOfertaConCodigo: [
        {
            type: Schema.Types.ObjectId,
            ref: Producto
        }
    ]
    ,
    estacionDeCobroParaLaOferta: [
        {
            type: String
        }
    ]

});

const Oferta = mongoose.model('Oferta', ofertasDeProductosSchema);

module.exports = Oferta