const { Router } = require('express');
const router = Router();

const Pedido = require('../models/pedido');
const pedidoController = require('../Controller/pedidoController')



router.post('/pedido', pedidoController.createPedido);
router.get('/pedidos', pedidoController.getAllPedidos);
router.get('/pedidos/deleteAll',pedidoController.deleteAll);
router.get('/pedidos/getPedidos/:id', pedidoController.getPedidos);


module.exports = router;