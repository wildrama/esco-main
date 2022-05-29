const mongoose = require('mongoose');
const { Schema } = mongoose;
const Producto = require('./productos')
// fecha de salida
const ofertasDeProductosSchema = new Schema({


    fechaDeVigencia: {
        type: String,
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

    productoEnOferta: [
        {
            type: Schema.Types.ObjectId,
            ref: Producto
        }
    ]


});

const Oferta = mongoose.model('Oferta', ofertasDeProductosSchema);

module.exports = Oferta