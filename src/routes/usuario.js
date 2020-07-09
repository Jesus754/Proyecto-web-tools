const { Router } = require('express');
const router = Router();
const usuarioController = require('../Controller/usuarioController');
const { verificaToken } = require('../middlewares/autenticacion')


router.post('/usuario',verificaToken, usuarioController.createUsuario);

router.put("/usuario/:id",verificaToken, usuarioController.updateUsuario);

router.get('/usuarios', verificaToken, usuarioController.getUsuarios);

router.get('/usuario/:id',verificaToken, usuarioController.getUsuario);

router.delete("/usuario/:id",verificaToken, usuarioController.deleteUsuario);

router.post('/usuario/:id/pedido',verificaToken, usuarioController.createPedido);

router.get('/usuario/:id/pedidos',verificaToken, usuarioController.getPedidos);

router.post("/usuarios/createAll",verificaToken, usuarioController.createAll);

router.delete("/usuarios/deleteAll",verificaToken, usuarioController.deleteAll);

module.exports = router;