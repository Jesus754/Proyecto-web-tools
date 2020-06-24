const { Router } = require('express');
const router = Router();
const Pizza = require('../models/pizza');
const usuario = require('../models/usuario');


router.get('/pizzas', (req,res) => {
    Pizza.find({},(err, pizzas) => { 
        if (err) {
            res.status(400).json({
                ok:false,
                err:err,
            })
        }else { 
            res.status(200).json({
            ok:true,
            pizzas: pizzas
        })}
       
    })
});

router.get('/pizza', (req,res) => {
    let body = req.body;
    Pizza.findOne({ nombre: body.nombre } ,(err,pizza) => {
        if(err) {
            res.status(400).json({
                ok:false,
                message: 'Ocurrio un error al buscar',
                err:err
            })
        }else {
            if (pizza === null ) {
                res.json({
                    ok:true,
                    message: 'La pizza no se encuentra en la coleccon'
                })
            }else { 
                res.json({
                ok:true,
                pizza: pizza
            })}
           
        }
        
    })
})



router.post('/pizza',(req,res) => {
    let body = req.body;

    let pizza = new Pizza({
        nombre: body.nombre,
        descripcion: body.descripcion
    })
    pizza.save((err, pizza) => {
        if (err) {
            res.status(400).json({
                ok:false,
                err:err,
            })
        }else {
            res.json({
                ok:true,
                pizza: body
            })
        }
       
    })
})

router.delete("/pizza", (req,res) => {
    let body = req.body;
    Pizza.deleteOne( body , (err, pizza) => {
        if(err){
            res.status(400).json({
                ok:false,
                message: 'La eliminacion a fallado',
                err:err
            })
        }else {
            res.json({
                ok:true,
                message:'La eliminacion se realizo con exito',
                pizza: pizza
            })
         }
       
    })
})






/*Lo de abajo fue hecho con fines de pruebas, no forman parte del crud.*/

router.post("/AgregarTodas", (req,res) => {
    let pizzas = req.body;
    Pizza.insertMany(pizzas, (err) => {
        if (err) {
            res.status(400).json({
                ok: false, 
                err:err,
                message: 'Fallo al insertar'
            })
        }else {
            res.json({
                ok:true,
                message: 'Se insertaron los datos correctamente',
                pizzas: pizzas 
            })
        }
    });
})


router.delete("/eliminarTodas",(req,res) => {
    Pizza.deleteMany({},(err) => {
        if (err) {
            res.status(400).json({
                ok:false, 
                err:err,
                message: 'La eliminacion de todos los elementos fallo'
            })
        }else {
            res.json( {
                ok:true,
                message: 'La eliminacion se realizo correctamente'
            })
        }
    })
})

module.exports = router;