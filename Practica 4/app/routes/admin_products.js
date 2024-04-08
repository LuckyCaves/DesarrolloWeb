const express = require('express');
const path = require('path');
const fs = require('fs');
const Product = require('../controllers/products.js');
const dataHandler = require('../controllers/data_handler.js');

const router = express.Router();

router.post('/', addProduct, dataHandler.writeProducts);

function addProduct(req, res, next){

    let producto = undefined;

    try
    {
        producto = new Product(req.body.title, req.body.description, req.body.imageUrl, req.body.unit, req.body.stock, req.body.pricePerUnit, req.body.category);
    }
    catch (error)
    {
        res.status(400);
        res.send(error.errorMessage);
        next();
    }

    dataHandler.createProduct(producto);
    res.status(201);
    res.send("Producto agregado exitosamente \"" + req.body.title + "\"");
    next();
}

router.put('/:id', updateProduct, dataHandler.writeProducts);

function updateProduct(req, res, next){

    let product = dataHandler.getProductById(req.params.id);

    if(product === undefined)
    {
        res.status(404);
        res.send("Producto no encontrado.");
        return;
    }

    try
    {
        let updatedProduct = new Product(req.body.title, req.body.description, req.body.imageUrl, req.body.unit, req.body.stock, req.body.pricePerUnit, req.body.category);
        dataHandler.updateProduct(req.params.id, updatedProduct);
    }
    catch (error)
    {
        res.status(400);
        res.send(error.message);
        return;
    }

    res.status(201);
    res.send("Producto actualizado exitosamente.");
    next();

}

router.delete('/:id', deleteProduct, dataHandler.writeProducts);

function deleteProduct(req, res, next){

    let product = dataHandler.getProductById(req.params.id);

    if(product === undefined)
    {
        res.status(404);
        res.send("Producto no encontrado.");
        return;
    }

    try
    {
        dataHandler.deleteProduct(req.params.id);
    }
    catch (error)
    {
        res.status(400);
        res.send(error.message);
        return;
    }

    res.status(201);
    res.send("Producto eliminado exitosamente.");
    next();

}

module.exports = router;