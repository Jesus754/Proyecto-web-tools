const Pizza = require('../models/pizza');

exports.getPizzas = function getPizzas(req,res) {
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
}

exports.getPizza = function getPizza(req,res) {
    let nombre = req.params.nombre;
    console.log(nombre);
    Pizza.findOne( {nombre:nombre} ,(err,pizza) => {
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
}

exports.createPizza = function createPizza(req,res) {
    let body = req.body;
    let pizza = new Pizza({
        nombre: body.nombre,
        descripcion: body.descripcion,
        precio: body.precio
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
}

exports.deletePizza = function deletePizza(req,res) {
        let nombre = req.params.nombre;
        Pizza.deleteOne( {nombre:nombre} , (err, pizza) => {
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
}

exports.createAll = function createAll(req,res) {
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
}

exports.deleteAll = function deleteAll(req,res) { 
        Pizza.deleteMany({},(err,pizzas) => {
            if (err) {
                res.status(400).json({
                    ok:false, 
                    err:err,
                    message: 'La eliminacion de todos los elementos fallo'
                })
            }else {
                res.json( {
                    ok:true,
                    message: 'La eliminacion se realizo correctamente',
                    pizzas: pizzas
                })
            }
        })
}

exports.updatePizza = function(req,res) {
    let nombre = req.params.nombre;
    console.log(nombre);
    let body = req.body;
    Pizza.updateOne({ nombre: nombre}, body, (err,pizza) => {
        if (err) {
            res.status(400).json({
                ok:false,
                err: err
            })
        }else {
            if (pizza.nModified == 0) {
                res.json({
                    ok:true,
                    message: 'El documento no fue encontrado',
                    nombre: nombre
                })
            }else {
                res.json({
                    ok:true,
                    message: 'Actualizacion correcta',
                    pizza: pizza
                })
            }
        }

    })
    console.log();
}