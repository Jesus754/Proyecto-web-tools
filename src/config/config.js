timespan = require ('timespan')
process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


process.env.CADUCIDAD_TOKEN =  60 * 60 * 24 * 30;

// process.env.SEMILLA -> HEROKU (VIDEO "generar un JWT")
process.env.SEMILLA = process.env.SEMILLA || 'secret';

process.env.CLIENT_ID = process.env.CLIENT_ID || '340599876929-algjo69nullvribihde629gt4d2hh0si.apps.googleusercontent.com';