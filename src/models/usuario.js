const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es necesaria']
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es necesario']
    },
    contraseña: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },

})

module.exports = mongoose.model('usuario', usuarioSchema);