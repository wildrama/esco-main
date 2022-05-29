const mongoose = require('mongoose');
const EstacionDeCobro = require('./estaciondecobro');
const Producto = require('./productos');
const { Schema } = mongoose;
const Usuario = require('./usuario')
// fecha de salida
const ventasEfectuadasSchema = new Schema({
    dineroIngresado: {
        type: Number
    },
    dineroDeSalida: {
        type: Number
    },
    productos: [
        {
            valorDelProductoEnLaCompra:
            {
                type: Number
            },
            identificadorDeProducto:
            {
                type: Schema.Types.ObjectId,
                ref: Producto
            }, 
            precioEnLaVenta:{
                type: Number
            }
        }
    ]
    ,
    ticketEntregado: {
        type: String,
        enum:['SI', 'NO'],
        required:true,
    },

    cantidadDeProductosTotales: {
        type: Number
    },
    estacionDeCobro: [
        {
            type: Schema.Types.ObjectId,
            ref: 'EstacionDeCobro'
        }
    ],


}, { timestamps: true });

const Venta = mongoose.model('Venta', ventasEfectuadasSchema);

module.exports = Venta