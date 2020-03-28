const express = require('express');
const routes = require('./routes');
const { errors } = require('celebrate');
const cors = require('cors');

const app = express();

app.use(cors(
    // { origin : 'url que o sistema ficará hospedado' }
));
app.use(express.json());
app.use(routes);
app.use(errors())

module.exports = app;