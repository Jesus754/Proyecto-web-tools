const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
})

PizzaSchema.plugin(uniqueValidator, {
    message: 'el campo {PATH} debe ser único'
})

module.exports = mongoose.model('Pizza', PizzaSchema);