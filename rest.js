const mongoose = require('mongoose');
const Pizza = require('./app/model/pizza');
const dbName = 'Taller_web';

const pizza = new Pizza({id: 9, nombre: 'Especial', descripcion: 'Pizza comun'});

mongoose.connect('mongodb://root:GeCJ575kfxqL@127.0.0.1:27017Taller_web',{useNewUrlParser: true } ,function (err){
   if (err){
        console.log(err) 
       throw err;
   }
   console.log('Conexion establecida');
   pizza.save(function (err) {
       if (err) {
           console.log(err); } else
            {
                console.log('Agregado');
                mongoose.connection.close();
           }
       
   })

});