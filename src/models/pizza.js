const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PizzaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('Pizza', PizzaSchema);