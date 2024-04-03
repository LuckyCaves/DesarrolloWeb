const express = require('express');
const dataHandler = require('../app/controllers/data_handler.js');
const ShoppingCart = require('../app/controllers/shopping_cart.js');

const router = express.Router();

router.get('/', (req, res) => {

    let products = [];

    if(!req.body.query)
        products = dataHandler.getProducts();
    else
        products = dataHandler.findProducts(req.body.query);

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

    let cart = new ShoppingCart();

    if(!(req.body instanceof Array))
    {
        res.status(400);
        res.send("Invalid request body.");
    }

    let productsError = [];
    for(let product of req.body)
    {
        try
        {
            cart.addItem(product.productUuid, product.amount);
        }
        catch (error)
        {
            productsError.push(product);
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
