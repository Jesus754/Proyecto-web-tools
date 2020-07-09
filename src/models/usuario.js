const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROL', 'USER_ROL'],
    message: '{VALUE} no es un rol válido'
};

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
    rol: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    contraseña: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },

})

UsuarioSchema.plugin(uniqueValidator, {
    message: 'el {PATH} ya se encuentra registrado en el sistema'
})

UsuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.contraseña;
    return userObject;
}

module.exports = mongoose.model('usuario', UsuarioSchema);