timespan = require ('timespan')


process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';




let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://jebu:123@localhost:2222/taller_web';
} else {
    urlDB = 'mongodb+srv://jebu:123@cluster0.fa5gg.mongodb.net/test';
}

process.env.URLDB = urlDB;


process.env.CADUCIDAD_TOKEN =  60 * 60 * 24 * 30;

process.env.SEMILLA = process.env.SEMILLA || 'secret';

process.env.CLIENT_ID = process.env.CLIENT_ID || '340599876929-n94tsi9p9b5322pobgrcc1jvd6iro7tp.apps.googleusercontent.com';