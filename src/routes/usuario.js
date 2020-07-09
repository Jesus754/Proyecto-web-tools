const { Router } = require('express');
const router = Router();
const usuarioController = require('../Controller/usuarioController')


router.post('/usuario', usuarioController.createUsuario);

router.put("/usuario/:id", usuarioController.updateUsuario);

router.get('/usuarios', usuarioController.getUsuarios);

router.get('/usuario/:id', usuarioController.getUsuario);

router.delete("/usuario/:id", usuarioController.deleteUsuario);

router.post('/usuario/:id/pedido',usuarioController.createPedido);

router.get('/usuario/:id/pedidos', usuarioController.getPedidos);

router.post("/usuarios/createAll", usuarioController.createAll);

router.delete("/usuarios/deleteAll", usuarioController.deleteAll);

module.exports = router;