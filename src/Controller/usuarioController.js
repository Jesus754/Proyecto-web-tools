const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

exports.getUsuarios = function getUsuarios(req,res) {
    Usuario.find({},["nombre","apellido", "direccion", "telefono", "email"],(err,usuarios) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err
            })
        } else {
            res.json({
                ok:true,
                usuarios:usuarios
            })
        }
    } )
}

exports.getUsuario = function getUsuario(req,res) {
    let id = req.params.id;
    Usuario.findById(id, (err,usuaio ) => {
        if (err) {
            res.status(400).json({
                ok:false,
                message: 'Ocurrio un error al buscar'
            })
        } else { 
            if (usuario === null) {
                res.json({
                    ok:true,
                    messaje: 'El usuario no se encuentra en la coleccion'
                })
            } else {
                res.json({
                    ok:true,
                    usuario:usuario
                })
            }
        }
    })
}

exports.createUsuario = function createUsuario(req,res) {
   let body = req.body;
   let usuario = new Usuario({
       nombre: body.nombre,
       apellido: body.apellido,
       direccion: body.direccion,
       telefono: body.telefono,
       contraseña: body.contraseña
   })
   usuario.save((err, usuario ) =>{
       if(err) {
           res.status(400).json({
               ok:false,
               err:err
           })
       } else {
           res.json({
               ok:true,
               messaje: 'El usuario se creo correctamente'
           })
       }
   } )
}

exports.deleteUsuario = function deleteUsuario(req,res) {
    let id = req.params.id;
    Usuario.deleteOne(id, (err,usuario) => {
        if (err) {
            res.status(400).json({
                ok:false,
                message:'La eliminacion fallo'
            })
        } else {
            res.json({
                ok:true, 
                message: 'La eliminacion se realizo con exito',
                usuario: usuario
            })
        }
    })
}

exports.createAll = function createAll(req,res) {
       let usuarios = req.body;
       Usuario.insertMany(usuarios,(err)=> {
           if(err) {
                res.status(400).json({
                    ok:false,
                    err:err,
                    message: 'Fallo al insertar'
                })
           } else {
               res.json({
                   ok:true,
                   message: 'Se insertaron los datos correctamente',
               })
           }
       })
}

exports.deleteAll = function deleteAll(req,res) { 
       Usuario.deleteMany({}, (err,usuarios) => {
           if (err) {
               res.status(400).json({
                   ok:false,
                   err:err,
                   message: 'La eliminacion de los elementos fallo'
               })
           } else {
               res.json({
                   ok: true,
                   message: 'La eliminacion se realizo correctamente',
                   usuario:usuarios
               })
           }
       })
}

exports.updateUsuario = function updateUsuario(req,res) {
    let id = req.params.id;
    let body = req.body;  
    Pizza.updateOne(id, body, (err,usuario) => {
        if (err) {
            res.status(400).json({
                ok:false,
                err: err
            })
        }else {
            if (usuario.nModified == 0) {
                res.json({
                    ok:true,
                    message: 'El documento no fue encontrado',
                })
            }else {
                res.json({
                    ok:true,
                    message: 'Actualizacion correcta',
                    usuario: usuario,
                })
            }
        }

    })
}