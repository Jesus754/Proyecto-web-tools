var mongoose = require('mongoose');
var Schema = mongoose.Schema

var usuarioSchema = new Schema({
    id: Number,
    nombre:String,
    apellido: String,  
    contraseña: String,
})

module.exports = mongoose.model('usuario', usuarioSchema);