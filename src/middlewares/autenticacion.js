const jwt = require('jsonwebtoken');
// Verificar token 

let verificaToken = (req, res, next) => {

    //obtengo header
    let token = req.get('token');

    jwt.verify(token, 'secret', (err, decoded) => {
        if(err) { 
            return res.status(401).json({
                ok:false,
                err :{
                    mensaje: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    })
};

let verificaAdminRol = (req, res, next) => {

    //obtengo header
    let rol = req.get('rol');
    
    if (rol === 'ADMIN_ROL') {
        next();
    } else {
        res.json({
            ok:true,
            err: {
                mensaje: 'El usuario no es administrador'
            }
        });
    }
};

module.exports = {
    verificaToken,
    verificaAdminRol
}