const { Router } = require('express');
const Usuario = require('../models/usuario');
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENTE_ID);
const express = require('express');
const usuario = require('../models/usuario');
const { json } = require('body-parser');
const app = express();


router.post('/login', (req, res) => {

    Usuario.findOne({ email: req.body.email }, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'Usuario o contraseña incorrectos'
                }
            })
        }
        if (!bcrypt.compareSync(req.body.contraseña, usuario.contraseña)) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'Usuario o contraseña incorrectos'
                }
            })
        }
        // parametrizas expiresIn en config
        let token = jwt.sign({
            data: usuario,
        }, 'secret', { expiresIn: 60 * 60 * 24 * 30 });


        res.json({
            ok: true,
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                direccion: usuario.direccion,
                telefono: usuario.telefono,
                email: usuario.email
            },
            token: token
        })

    })
});

//CONFIGURACIONES DE GOOGLE
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }

}


router.post('/google', async (req, res) => {
    let token = req.body.idtoken;
    let googleUser = await verify(token)
        .catch(err => {
            return res.status(403).json({
                ok: false,
                err
            })
        })


    // parametrizas expiresIn en config
    Usuario.findOne({ email: googleUser.email }, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        } 
        if (usuario) {
            // si el usuario no se  valido con google
            if (usuario.google === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        mensaje: 'Debe de usar su autenticion normal'
                    }
                });
            } 
            // si se autentico con google renuevo el token
            else {
                let token = jwt.sign({
                    usuario: usuario,
                }, 'secret', {expiresIn: 60 * 60 * 24 * 30});
                return res.json({
                    ok: true,
                    usuario: usuario,
                    token,
                });
            }
        } 
        // si es la primera vez que se autentica
        else {
            // si no existe en db lo grabo en la base
            let usuario = new Usuario();
            usuario.nombre = googleUser.nombre,
                usuario.email = googleUser.email,
                usuario.img = googleUser.img,
                usuario.google = googleUser.google,
                usuario.password = ':)'

            usuario.save((err, usuario) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                let token = jwt.sign({
                    data: usuario,
                }, 'secret', { expiresIn: 60 * 60 * 24 * 30 });

                return res.json({
                    ok: true,
                    usuario: usuario,
                    token
                })

            })
        }

    })
})

module.exports = router;