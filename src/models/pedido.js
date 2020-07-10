const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const { ObjectId } = require('mongoose/lib/schema');
const UsuarioSchema = require('../models/usuario');
var AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
    numero: Number,
    usuario: {
        type: ObjectId,
        ref: 'usuario'
    }, 
    pizzas: [{
        nombre: String,
        cantidad: Number
    }],
    total: {
        type: Number,
    }
})

PedidoSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'numero'});
module.exports = mongoose.model('pedido', PedidoSchema);