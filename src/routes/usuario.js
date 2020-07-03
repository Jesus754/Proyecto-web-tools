const { Router } = require('express');
const router = Router();
const usuarioController = require('../Controller/usuarioController')

/* Rutas para facilitar pruebas*/ 
router.post("/usuarios/createAll", usuarioController.createAll);

router.delete("/usuarios/deleteAll", usuarioController.deleteAll);

/* - - -- - - -- - - - - -- - - */

router.post('/usuario', usuarioController.createUsuario);

router.post('/usuario/:id/pedido',usuarioController.createPedido);

router.put("/usuario/:id", usuarioController.updateUsuario);

router.get('/usuarios', usuarioController.getUsuarios);

router.get('/usuario/:id', usuarioController.getUsuario);

router.get('/usuario/:id/pedidos', usuarioController.getPedidos);

router.delete("/usuario/:id", usuarioController.deleteUsuario);












module.exports = router;