const express = require('express');
const app = express();

app.use(require('./pizza'));
app.use(require('./usuario'));
app.use(require('./pedido'));

module.exports = app; 