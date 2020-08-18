const express = require('express');
const app = express();

app.use(require('./pizza'));
app.use(require('./usuario'));
app.use(require('./pedido'));
app.use(require('./login'));

module.exports = app; 