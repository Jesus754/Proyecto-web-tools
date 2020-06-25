const { Router } = require('express');
const router = Router();
const Pizza = require('../models/pizza');
const pizzaController = require('../Controller/pizzaController')


router.get('/pizzas', pizzaController.getPizzas);

router.get('/pizza/:nombre', pizzaController.getPizza);

router.post('/pizza', pizzaController.createPizza);

router.delete("/pizza/:nombre", pizzaController.deletePizza);

router.put("/pizza/:nombre", pizzaController.updatePizza);

router.post("/pizzas/createAll", pizzaController.createAll);

router.delete("/pizzas/deleteAll", pizzaController.deleteAll);


module.exports = router;