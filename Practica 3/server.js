const express = require('express');
const fs = require('fs');
const router = require ('./app/controllers/router.js');

fs.readFile('./data/products.json', 'utf8', (error, data) => {
    if(error)
        console.log(error);
    else
    {
        let products = JSON.parse(data);
    }
});

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
    console.log("Aplicacion de ejemplo corriendo en puerto " + port);
});