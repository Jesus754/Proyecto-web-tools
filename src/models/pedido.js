var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var pedidoSchema = new Schema({
    numero: Number,
    usuario: [{id: usuario.id, nombre: usuario.nombre, apellido: usuario.apellido, direccion: String}],
    pedido : [{pizzaSchema}],
})


module.exports = mongoose.model('pedido', pedidoSchema);