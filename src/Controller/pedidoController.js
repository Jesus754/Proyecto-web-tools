const Pedido = require('../models/pedido');
const Usuario = require('../models/usuario');
const Pizza = require('../models/pizza')

exports.createPedido = async function createPedido(req,res) {

    let body = req.body;
    
    let usuario = await Usuario.findOne(body.usuario, (err,usuario) => {
        console.log(usuario);
    })
    console.log(usuario);
    let pizzas = body.pizzas;
    let total = 0;
    for (var i = 0; i < Object.keys(pizzas).length;i++){
        pizza = await Pizza.find({nombre: pizzas[i].nombre});
        total = total + pizza[0].precio * pizzas[i].cantidad;
    }

    let pedido = new Pedido({
         usuario: {
            userId: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            direccion: usuario.direccion,
            telefono: usuario.telefono
         },
         pizzas: pizzas,
         total: total
    })
    console.log(pedido);

    pedido.save((err) => {
        if (err) {
            res.status(400).json({
                ok:false,
                err:err,
            })
        }else {
            res.json({
                ok:true,
                message: 'Pedido registrado'
            })
        }
    })
}


exports.getAllPedidos = function getAllPedidos(req,res) {
    Pedido.find({},(err, pedidos) => { 
        if (err) {
            res.status(400).json({
                ok:false,
                err:err,
            })
        }else { 
            res.status(200).json({
            ok:true,
            pedidos: pedidos
        })}
    })

}

exports.deleteAll = function deleteAll(req,res) { 
    Pedido.deleteMany({}, (err,pedidos) => {
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
                pedidos:pedidos
            })
        }
    })
}


exports.getPedidos = function getPedidos(req,res) {
    let id = req.params.id;
    Pedido.find({usuario: id},(err, pedidos) => { 
        if (err) {
            res.status(400).json({
                ok:false,
                err:err,
            })
        }else { 
            res.status(200).json({
            ok:true,
            pedidos: pedidos
        })}
    })
}