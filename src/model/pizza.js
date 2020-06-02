const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PizzaSchema = new Schema({
    id: Number,
    nombre: String,
    descripcion: String,
})

module.exports = mongoose.model('Pizza', PizzaSchema);