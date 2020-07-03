const Pizza = require('../models/pizza');

exports.getPizzas = function getPizzas(req, res) {
    Pizza.find({})
        .exec((err, pizzas) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err: err,
                })
            } else {
                res.status(200).json({
                    ok: true,
                    pizzas: pizzas
                })
            }
        })
}


/* 
   if (req.params && req.params.nombre){ 
      considere no controlarlo, ya que no se encontraria la ruta 'Cannot GET /api/pizza/'
      si no se le coloca el nombre en el parametro ' router.get('/pizza/:nombre', pizzaController.getPizza); '
   
*/
exports.getPizza = function getPizza(req, res) {
    Pizza.findOne({ nombre: req.params.nombre })
        .exec((err, pizza) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err: err
                })
            } else
                if (pizza === null) {
                    res.status(404).json({
                        ok: false,
                        mensaje: 'El documento no se encuentra en la coleccion',
                        nombre: req.params.nombre
                    })
                }
                else {
                    res.json({
                        ok: true,
                        pizza: pizza
                    })
                }
        })
}

exports.createPizza = function createPizza(req, res) {

    let pizza = new Pizza({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio
    })

    pizza.save()
        .then((pizza) => {
            res.status(201).json({
                ok: true,
                pizza: pizza
            })
        })
        .catch((err) => {
            res.status(400).json({
                err: err
            })
        })
}


exports.deletePizza = function deletePizza(req, res) {
    let nombre = req.params.nombre;
    Pizza.deleteOne({ nombre: nombre }, (err,pizza) => {
        if (err){
            res.status(400).json({
                ok: false,
                mensaje: 'La eliminacion fallo',
                err: err
            })
        } else {
            if (pizza.n == 0) {
                res.status(404).json({
                    ok: false,
                    mensaje: 'La pizza no se encuentra en la coleccion',
                    nombre: nombre
                })
            } else
                res.json({
                    ok: true,
                    mensaje: 'La eliminacion se realizo con exito',
                    pizza: pizza
                })
        }
    })
}


exports.createAll = function createAll(req, res) {
    let pizzas = req.body;
    Pizza.insertMany(pizzas, (err) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err,
                message: 'Fallo al insertar'
            })
        } else {
            res.json({
                ok: true,
                message: 'Se insertaron los datos correctamente',
                pizzas: pizzas
            })
        }
    })
}

exports.deleteAll = function deleteAll(req, res) {
    Pizza.deleteMany({}, (err, pizzas) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err,
                message: 'La eliminacion de todos los elementos fallo'
            })
        } else {
            res.json({
                ok: true,
                message: 'La eliminacion se realizo correctamente',
                pizzas: pizzas
            })
        }
    })
}

exports.updatePizza = function (req, res) {
    let nombre = req.params.nombre;
    let body = req.body;
    Pizza.updateOne({ nombre: nombre }, body)
        .exec((err, pizza) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err: err
                })
            } else {
                if (pizza.nModified == 0) {
                    res.status(404).json({
                        ok: false,
                        message: 'La pizza no se encuentra en la coleccion',
                        nombre: nombre
                    })
                } else {
                    res.json({
                        ok: true,
                        message: 'Actualizacion correcta',
                        pizza: pizza
                    })
                }
            }

        })
}