const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const UsuarioSchema = new Schema({
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
    email: {
        type:String,
        required: [true, 'El email es necesario'],
        unique: true,
        lowercase:true

    },
    contraseña: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },

})

UsuarioSchema.plugin(uniqueValidator, {
    message: 'el {PATH} ya se encuentra registrado en el sistema'
})

module.exports = mongoose.model('usuario', UsuarioSchema);