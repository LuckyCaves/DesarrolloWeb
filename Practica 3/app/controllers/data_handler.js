"use strict;"
const fs = require('fs');
const path = require('path');
const Product = require('./products.js');

let products = [];

function getProducts() {
    return products;
}

function getProductById(uuid) {
    return products.find(product => product.uuid == uuid);
}

function createProduct(product) {
    products.push(Product.createFromObject(product));
}

function updateProduct(uuid, updatedProduct) {
    Product.cleanObject(updatedProduct);
    let index = products.findIndex(product => product.uuid == uuid);

    if (index !== -1)
        Object.assign(products[index], updatedProduct);
}

function deleteProduct(uuid) {
    let index = products.findIndex(product => product.uuid == uuid);
    if (index !== -1) {
        return products.splice(index, 1)[0];
    }
}

function findProducts(query) {
    let category = '';
    let title = '';
    let result = [...products];

    if (query.includes(':')) {
        [category, title] = query.split(':');
        category = category.trim();
        title = title.trim();
    } else {
        title = query;
        title = title.trim();
    }

    if (category !== '') {
        result = result.filter(product => product.category.includes(category));
    }

    if (title !== '') {
        result = result.filter(product => product.title.includes(title));
    }

    return result;
}

function writeProducts() {
    fs.writeFileSync(
        path.resolve('./app/data/products.json'), JSON.stringify(products));
}

function readProducts()
{
    products = JSON.parse(fs.readFileSync('./app/data/products.json'));
    products = products.map(product => Product.createFromObject(product));
}

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.findProducts = findProducts;
exports.writeProducts = writeProducts;
exports.readProducts = readProducts;