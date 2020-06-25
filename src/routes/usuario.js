const { Router } = require('express');
const router = Router();
const Usuario = require('../models/usuario');
const usuarioController = require('../Controller/usuarioController')


router.get('/usuarios', usuarioController.getUsuarios);

router.get('/usuario/:id', usuarioController.getUsuario);

router.post('/usuario', usuarioController.createUsuario);

router.delete("/usuario/:id", usuarioController.deleteUsuario);

router.put("/usuario/:id", usuarioController.updateUsuario);

router.post("/usuarios/createAll", usuarioController.createAll);

router.delete("/usuarios/deleteAll", usuarioController.deleteAll);


module.exports = router;