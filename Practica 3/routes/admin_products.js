const express = require('express');
const path = require('path');
const fs = require('fs');
const Product = require('../app/controllers/products.js');
const dataHandler = require('../app/controllers/data_handler.js');

const router = express.Router();

router.post('/', addProduct, dataHandler.writeProducts);

function addProduct(req, res, next){

    let producto = undefined;

    try
    {
        // const producto = Product.createFromObject(req.body);
        producto = new Product(req.body.title, req.body.description, req.body.imageUrl, req.body.unit, req.body.stock, req.body.pricePerUnit, req.body.category);
    }
    catch (error)
    {
        res.status(400);
        res.send(error.message)
    }

    dataHandler.createProduct(producto);
    res.status(201);
    res.send("Producto agregado exitosamente \"" + req.body.title + "\"");
    next();
}

router.put('/:id', updateProduct, dataHandler.writeProducts);

function updateProduct(req, res, next){

    let product = dataHandler.getProductById(req.body.uuid);

    if(product === undefined)
    {
        res.status(404);
        res.send("Producto no encontrado.");
        return;
    }

    try
    {
        let updatedProduct = new Product(req.body.product.title, req.body.product.description, req.body.product.imageUrl, req.body.product.unit, req.body.product.stock, req.body.product.pricePerUnit, req.body.product.category);
        dataHandler.updateProduct(req.body.uuid, updatedProduct);
    }
    catch (error)
    {
        res.status(400);
        res.send(error.message);
    }

    res.status(201);
    res.send("Producto actualizado exitosamente.");
    next();

}

module.exports = router;