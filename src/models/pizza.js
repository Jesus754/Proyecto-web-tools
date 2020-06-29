const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { validate } = require('mongoose/lib/model');


let Schema = mongoose.Schema;


let PizzaSchema = new Schema({
    nombre: {
        unique: true,
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    }
})

PizzaSchema.plugin(uniqueValidator, {
    message: 'el campo {PATH} debe ser único'
})


module.exports = mongoose.model('pizza', PizzaSchema);