const Pedido = require('../models/pedido');
const Usuario = require('../models/usuario');
const Pizza = require('../models/pizza')

exports.getAllPedidos = function getAllPedidos(req, res) {
    Pedido.find({}, (err, pedidos) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err,
            })
        } else {
            res.status(200).json({
                ok: true,
                pedidos: pedidos
            })
        }
    })

}

exports.deleteAll = function deleteAll(req, res) {
    Pedido.deleteMany({}, (err, pedidos) => {
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
                pedidos: pedidos
            })
        }
    })
}

exports.getUsuarios = function getUsuarios(req, res) {
    Usuario.find({}, ["nombre", "apellido", "direccion", "telefono", "email"])
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
    Usuario.findById(id, ["nombre", "apellido", "direccion", "telefono", "email"])
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
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        contraseña: req.body.contraseña
    })
    usuario.save()
        .then((usuario) => {
            res.status(201).json({
                ok: true,
                mensaje: 'El usuario se creo correctamente',
                usuario: {
                    _id: usuario._id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    direccion: usuario.direccion,
                    telefono: usuario.telefono,
                    email: usuario.email
                }
            })
        })
        .catch((err) => {
            res.status(400).json({
                err: err
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
    Pedido.find({ "usuarioId": req.params.id }, (err, pedidos) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err,
            })
        } else {
            res.status(200).json({
                ok: true,
                pedidos: pedidos
            })
        }
    })
}

exports.createPedido = async function createPedido(req, res) {
    let pizzas = req.body.pizzas;
    try {
        usuario = await Usuario.findById(req.params.id);
        if (usuario == null) {
            res.status(404).json({
                ok: false,
                mensaje: 'El usuario no existe en la coleccion'
            })
            return;
        }
    } catch (err) {
        res.status(400).json({
            ok: false,
            err: err,
        })
        return;
    }
    let total = 0;
    for (var i = 0; i < Object.keys(req.body.pizzas).length; i++) {
        try {
            pizza = await Pizza.findOne({ nombre: pizzas[i].nombre })
            if (pizza === null) {
                res.status(404).json({
                    ok: false,
                    mensaje: 'Alguna de las pizzas pedidas no se encuentra en la coleccion',
                })
                return;
            } else {
                total = total + pizza.precio * pizzas[i].cantidad;
            }
        }
        catch (err) {
            res.status(400).json({
                ok: false,
                err: err,
            })
            return;
        }

    }
    let pedido = new Pedido({
        usuarioId: req.params.id,
        pizzas: pizzas,
        total: total
    })
    pedido.save((err) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err,
            })
        } else {
            res.json({
                ok: true,
                mensaje: 'Pedido registrado',
                pedido: pedido
            })
        }
    })
}