const express = require('express');
const dataHandler = require('../controllers/data_handler.js');
const ShoppingCart = require('../controllers/shopping_cart.js');
const fs = require('fs');

dataHandler.readProducts();
let cart = new ShoppingCart();
cart.products = dataHandler.getProducts();
const router = express.Router();

router.get('/', (req, res) => {
    if(req.headers['page'] !== undefined)
    {
        products = dataHandler.getProducts();
        const page = parseInt(req.headers['page']);
            const startIndex = (page - 1) * 4;
            const endIndex = page * 4;
        products = dataHandler.getProducts().slice(startIndex, endIndex);
    }
    else if(!req.body.query)
    {
        products = dataHandler.getProducts();
    }
    else
    {
        products = dataHandler.findProducts(req.body.query);
    }

    res.send(products);

});

router.get('/:id', (req, res) => {

    let product = dataHandler.getProductById(req.params.id);

    if(product === undefined)
    {
        res.status(404);
        res.send("Product not found.");
    }
    else
    {
        res.status(200);
        res.send(product);
    }


});

router.post('/cart', (req, res) => {

    let productsError = [];
    for(let product of req.body)
    {
        try
        {
            let found = dataHandler.getProductById(product.productUuid);
            if(found === undefined)
                throw new Error("Product not found.");
            cart.addItem(product.productUuid, product.amount);
        }
        catch (error)
        {
            productsError.push(product);
            console.log(error);
        }
    }


    if(productsError.length == 0)
    {
        res.status(200);
        res.send(cart);
    }
    else
    {
        res.status(404);
        res.send("Error adding products to cart: " + JSON.stringify(productsError));
    }

});

module.exports = router;
