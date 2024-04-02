const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/products', getProducts);

function getProducts(req, res) {

    res.send(products);

}

module.exports = router;