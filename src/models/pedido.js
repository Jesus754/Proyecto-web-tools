const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const { ObjectId } = require('mongoose/lib/schema');
const UsuarioSchema = require('../models/usuario');
var AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema;

let estado = {
    values: ['pendiente', 'aceptado', "enviado"],
    message: '{VALUE} no es un estado válido'
};

const PedidoSchema = new Schema({
    user_id: {
        type: ObjectId,
        ref: 'usuario'
    }, 
    pedido: [{
        nombre: String,
        precio: Number,
        total: Number,
        cantidad: Number
    }],
    fecha: {
        type: String,
    },
    total: {
        type: Number,
    },
    
    estado: { 
        type:String,
        default: 'pendiente',
        enum: estado
    }
})

module.exports = mongoose.model('pedido', PedidoSchema);