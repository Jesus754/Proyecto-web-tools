const express = require('express');
const app = express();



app.use(require('./pizza'));
app.use(require('./usuario')); 


module.exports = app; 