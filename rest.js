require('./src/config/config');
const connection = require('./src/connection');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors')

app.use(cors()) 
app.set('port', process.env.PORT);

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());


app.use('/api',require('./src/routes/index'));




app.listen(app.get('port'), () => {
    console.log("Servidor corriendo en", app.get('port'));
})













 










/*const Pizza = require('./app/model/pizza');
const mongoose = require('./connection');


const pizza = new Pizza({
    id: 9, 
    nombre: 'Especial', 
    descripcion: 'Pizza comun'
});


pizza.save(function (err) {
    if (err) 
        console.log(err);
     console.log('Agregado');
}) */









