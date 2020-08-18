const Pedido = require('../models/pedido');
const Usuario = require('../models/usuario');
const Pizza = require('../models/pizza');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.getUsuarios = function getUsuarios(req, res) {
    Usuario.find({})
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err: err
                })
            } else {
                res.json({
                    ok: true,
                    usuarios: usuarios
                })
            }
        })
}

exports.getUsuario = function getUsuario(req, res) {
    let id = req.params.id;
    Usuario.findById(id)
        .exec((err, usuario) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    mensaje: 'Ocurrio un error al buscar'
                })
            } else {
                if (usuario === null) {
                    res.json({
                        ok: true,
                        mensaje: 'El usuario no se encuentra en la coleccion'
                    })
                } else {
                    res.json({
                        ok: true,
                        usuario: usuario
                    })
                }
            }
        })
}

exports.createUsuario = function createUsuario(req, res) {
    let usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        email: req.body.email,
        rol: req.body.rol,
        contraseña: bcrypt.hashSync(req.body.contraseña, 10)
    })
    usuario.save()
        .then((usuario) => {
            const expiresIn = 60 * 60 * 24 * 30;
            const token = jwt.sign({ id: usuario.id },
                'secret', {
                expiresIn: expiresIn
            }        
        )
    res.status(201).json({
        ok: true,
        mensaje: 'El usuario se creo correctamente',
        usuario: {
            _id: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            direccion: usuario.direccion,
            telefono: usuario.telefono,
            email: usuario.email,
            rol: usuario.rol
        },
        token: token,
        espiresIn: expiresIn
    })
})
        .catch ((err) => {
                console.log(err)
                res.status(400).json({
        err: err, 
        
    })
})
}

exports.deleteUsuario = function deleteUsuario(req, res) {
    Usuario.deleteOne({ _id: req.params.id })
        .then((resp) => {
            if (resp.deletedCount === 0) {
                res.status(404).json({
                    ok: false,
                    mensaje: 'El usuario no se encuentra en la coleccion',
                    resp: resp
                })
            }
            res.json({
                ok: true,
                mensaje: 'La eliminacion se realizo con exito',
                resp: resp
            })
        })
        .catch((err) => {
            res.status(400).json({
                ok: false,
                mensaje: 'La eliminacion fallo',
                resp: resp
            })
        })
}

exports.createAll = function createAll(req, res) {
    let usuarios = req.body;

    Usuario.insertMany(usuarios, (err) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err,
                mensaje: 'Fallo al insertar'
            })
        } else {
            res.json({
                ok: true,
                mensaje: 'Se insertaron los datos correctamente',
            })
        }
    })
}

exports.deleteAll = function deleteAll(req, res) {
    Usuario.deleteMany({}, (err, usuarios) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err,
                mensaje: 'La eliminacion de los elementos fallo'
            })
        } else {
            res.json({
                ok: true,
                mensaje: 'La eliminacion se realizo correctamente',
                usuario: usuarios
            })
        }
    })
}

exports.updateUsuario = function updateUsuario(req, res) {
    Usuario.updateOne({ _id: req.params.id }, req.body)
        .exec((err, resp) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err: err
                })
            } else {
                if (resp.nModified === 0 && resp.ok === 1 && resp.n != 0) {
                    res.status(200).json({
                        ok: true,
                        mensaje: ' No se tiene ninguna actualizacion en el body ',
                        resp: resp
                    })
                } else if (resp.n === 0) {
                    res.status(404).json({
                        ok: false,
                        mensaje: ' El usuario no se encuentra en la coleccion ',
                        resp: resp
                    })
                }
                else {
                    res.json({
                        ok: true,
                        mensaje: 'Actualizacion correcta',
                        resp: resp,
                    })
                }
            }
        })
}


exports.getPedidos = function getPedidos(req, res) {
    console.log("pedidos",req.params.id)
    Pedido.find({ "user_id": req.params.id })
        .populate('pedidos.pedido', 'nombre')
        .exec((err, pedidos) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err: err,
                })
            } else {
                if (pedidos == undefined ){
                    res.status(404).json({
                        ok:true,
                        mensaje: 'No hay pedidos del usuario'
                    }) 
                }
                res.status(200).json({
                    ok: true,       
                    pedidos : pedidos,
                    user_id: pedidos[0].user_id,

                    
                })
            }
        })
}

exports.createPedido = async function createPedido(req, res) {
    let pedido = req.body.pedido;
    let idUsuario = req.body.user_id;
    let total = req.body.total_pedido;
    try {
        usuario = await Usuario.findById(idUsuario);
        if (usuario == null) {
            res.status(404).json({
                ok: false,
                mensaje: 'El usuario no existe en la coleccion'
            })
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            ok: false,
            err: err,
        })
        return;
    }

    let data = new Pedido({
        pedido: pedido,
        user_id : idUsuario,
        total: total,
        fecha: getDateTime()

    })
    data.save((err) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err,
            })
        } else {
            res.json({
                ok: true,
                mensaje: 'Pedido registrado',
                pedido: data
            })
        }
    })
}

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    
    return day + "/" + month + "/" + year + "-" + hour + ":" + min + ":" + sec;
}