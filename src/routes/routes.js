const { Router } = require('express');
const router = Router();
const Pizza = require('../model/pizza')


router.get('/findAll',async (req,res) => {   
    const pizza =  await Pizza.find();
    res.send(pizza);
});

router.post('/insertMany', async (req,res) => {
    console.log(req.body);
    const pizzas = req.body;
    Pizza.insertMany(pizzas);
    res.send('recibido');
})

module.exports = router;