const { Router } = require('express');
const Usuario = require('../models/usuario');
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/login', (req,res) => {

    Usuario.findOne({ email: req.body.email }, (err, usuario) => {

        if (err) {
            return res.status(500).json ({
                ok: false,
                err
            })
        }
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'Usuario o contraseña incorrectos'
                }
            })
        }
        if ( !bcrypt.compareSync(req.body.contraseña, usuario.contraseña)){
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'Usuario o contraseña incorrectos'
                }
            })
        }
        let token = jwt.sign({
            data: usuario,
        },'secret', {expiresIn: 60 * 60 * 24 * 30});


        res.json ({
            ok: true,
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                direccion: usuario.direccion,
                telefono: usuario.telefono,
                email: usuario.email
            },
            token : token
        })

    }) 
});

module.exports = router;