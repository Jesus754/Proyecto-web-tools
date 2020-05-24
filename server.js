const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbName = 'Taller_web';

const url = 'mongodb://root:GeCJ575kfxqL@127.0.0.1:27017' + dbName;

const client = new MongoClient(url,{useUnifiedTopology:true} );

client.connect(function(err) {
    assert.equal(null,err); 
    console.log("Conexion establecida");
    const db = client.db(dbName); 
    insertarDocumento(db,function() {
        client.close();
    })
    findDocumento(db,function(){
        client.close();
    })
})

const insertarDocumento = function(db,callback) {
    const collection = db.collection('PIZZA')

    collection.insertMany([{id: 1, nombre: "Margherita", descripcion: "Esta pizza clásica tiene un origen muy regio. Cuenta la historia que al cocinero Raffaele Esposito se le ocurrió crear tres propuestas diferentes para recibir a María Teresa de Saboya, quien había anunciado su visita a la ciudad de Nápoles. La reina se decantó por la margarita aludiendo que los colores que lucía le recordaban a los de la bandera italiana. Comprensible, pues esta variedad lleva mozzarella, tomate, aceite y albahaca fresca."},
                           {id: 2, nombre: "Carbonara", descripcion: "Originaria de la región romana del Lacio, es otra de las más tradicionales de cuantas integran la carta de pizzas. Su éxito la ha hecho valedora de innumerables versiones y todas ellas riquísimas. En contra de la creencia general, la salsa original que la acompaña no incluye nata. De hecho, agregarla cabrea sobremanera a los italianos. Y es que esta crema se hace a base de queso, huevos, panceta, aceite de oliva y pimienta negra. Sea como fuere, este tesoro italiano despierta pasiones entre los amantes de estos placeres"},
                           {id: 3, nombre: "Marinara", descripcion: "De origen napolitano, esta variedad tiene el honor de ser una de las más antiguas. Su nombre puede llevarnos a pensar que incluye entre sus ingredientes frutos de mar, pero no es así. De hecho, adquirió esta denominación porque la llevaban los pescadores a faenar, pues se conservaba durante mucho tiempo. En realidad, contiene tomate, ajo, orégano y aceite. Alimentos muy sencillos que le dan un sabroso gusto mediterráneo, el cual la convierten en objeto de devoción de muchos."},
                           {id: 4, nombre: "Capricciosa", descripcion: "Mozzarella, tomate, setas, aceitunas negras y alcachofas son los ingredientes que integran esta sabrosa variedad, la cual es imperativo probar en Italia. El abanico de colores que muestra y la simbiosis de sabores silvestres y huertanos la convierten en una de las más exitosas y posiblemente en la perdición de más de una paladar."},
                           {id: 5, nombre: "Puttanesca" ,descripcion: "Originaria de Nápoles, lleva aceitunas negras, anchoas, guindillas secas, alcaparras y tomate. El resultado es una pizza con un intenso sabor a pescado, el cual la hace inconfundible. Su éxito gustativo ha conllevado la extensión de su uso a otras elaboraciones tradicionales como los espaguetis, con quien forma un matrimonio pletórico."},
                           {id: 6, nombre: "Prosciutto", descripcion: "El jamón, en Italia denominado prosciutto, es el ingrediente estrella de esta pizza con aroma inconfundible y un sabor al que muy pocos pueden renunciar. Dicen que en el norte de Italia, en las regiones de Emilia y la Toscana, se elaboran los mejores prosciuttos. Hazte una idea de cómo sabrá está variedad aquí." },
                           {id: 7, nombre: "Quatro stagioni", descripcion: "El nombre de esta pizza ya da una buena pista de la suerte de ingredientes que incluye, a la vez que incrementa sobremanera las ganas de degustarla. Apuesta por los que son típicos de cada temporada, que, como sabemos, es cuando mejor saben. Lleva salami, pimienta, mozzarella, tomate, aceitunas, alcachofas, primavera, huevo duro y setas."},
                           {id: 8, nombre: "Funghi", desripcion: "Posiblemente, su nombre nos suene más chino que a italiano, lo que puede llevarnos a descartarla de la elección. Pero en realidad, esta pizza, oriunda de Nápoles, es la clásica de champiñones que podemos encontrar desde hace años en las cartas de las pizzerías españolas. Obviamente, el ingrediente estrella son las setas, de las que admite un amplio elenco de variedades, las cuales siempre se hacen acompañar de queso mozzarella. Su éxito ha conllevado la creación de otras variantes como la boscaiola, que incluye salchichas. Y, dicho sea de paso, estas son 100 % italianas, es decir, elaboradas con carne de cerdo y, eso sí, muy especiadas."}],
                           function (err,result) {
                               assert.equal(err,null);
                               assert.equal(8,result.result.n);
                               console.log("Se insertaron los documentos a la coleccion")
                               callback(result)
                           })
}

const findDocumento = function(db,callback) {
    const collection = db.collection('PIZZA')

    collection.find({}).toArray(function(err,docs) {
        assert.equal(err,null);
        console.log("Elementos devueltos: ")
        console.log(docs)
        callback(docs)
    })
}

