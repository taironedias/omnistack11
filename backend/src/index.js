const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors(
    // { origin : 'url que o sistema ficará hospedado' }
));
app.use(express.json());
app.use(routes);


app.listen(3333, function() {
    console.log('Servidor nodeJS Online');
})