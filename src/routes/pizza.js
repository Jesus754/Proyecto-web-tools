const { Router } = require('express');
const router = Router();
const Pizza = require('../models/pizza');
const { brotliDecompress } = require('zlib');
const usuario = require('../models/usuario');


router.get('/pizzas',async (req,res) => {
    console.log("Se ejecuto comando findAll"); 
    const pizza =  await Pizza.find();
    res.send(pizza);
});

router.post('/pizza', async (req,res) => {
    let body = req.body;

    let pizza = new Pizza({
        nombre: body.nombre,
        descripcion: body.descripcion
    })

    pizza.save((err, pizza) => {
        if (err) {
            res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            pizza: body
        })
    })
    


    
})

module.exports = router;