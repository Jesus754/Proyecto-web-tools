const { Router } = require('express');
const router = Router();

const Pedido = require('../models/pedido');
const pedidoController = require('../Controller/pedidoController')



router.get('/pedidos', pedidoController.getAllPedidos);

router.delete('/pedidos/deleteAll',pedidoController.deleteAll);



module.exports = router;