const express = require('express');
const path = require('path');
const fs = require('fs');
const Product = require('../app/controllers/products.js');
const dataHandler = require('../app/controllers/data_handler.js');

const router = express.Router();

router.post('/admin/products', addProduct, dataHandler.writeProducts);

function addProduct(req, res, next){

    let producto = undefined;

    try
    {
        // const producto = Product.createFromObject(req.body);
        producto = new Product(req.body.title, req.body.description, req.body.imageUrl, req.body.unit, req.body.stock, req.body.pricePerUnit, req.body.category);
    }
    catch (error)
    {
        console.log(error);
        res.status(400);
        res.send(error.message)
    }

    console.table(producto);
    dataHandler.createProduct(producto);
    res.status(201);
    res.send("Producto agregado exitosamente \"" + req.body.title + "\"");
    next();
}

module.exports = router;