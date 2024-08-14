const express = require('express');
const path = require('path');

const router = express.Router();

const productRouter = require('../routes/products.js');
const adminProductRouter = require('../routes/admin_products.js');

router.use('/products', productRouter);
router.use('/admin/products', validateAdmin, adminProductRouter);

function validateAdmin(req, res, next)
{

    if (!req.headers['x-auth'])
        res.status(403).send('Acceso no autorizado, no se cuenta con privilegios de administrador');
    else
        next();

}

router.get('/', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/Po1_index.html")));
router.get('/home', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/Po1_index.html")));
router.get('/shopping_cart', (req, res) => res.sendFile(path.resolve(__dirname + "/../views/Po1_cart.html")));

module.exports = router;