const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/products', (req, res) => {

    const products = [
        {
            id: 1,
            name: 'Producto 1',
            price: 100,
            stock: 10
        }
    ];
    res.send(products);

});

module.exports = router;
