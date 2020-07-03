const Pedido = require('../models/pedido');
const Usuario = require('../models/usuario');
const Pizza = require('../models/pizza')

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


