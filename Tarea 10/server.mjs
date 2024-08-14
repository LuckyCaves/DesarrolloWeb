import express from 'express';
import chalk from 'chalk';
import * as fs from 'node:fs';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.get('/products', (req, res) => {
    console.log(chalk.yellow('Consultando usuarios'));

    if(req.headers['task'] === '1')
    {
        fs.readFile('files/products.json', 'utf8', (error, data) => {
            if (error) {
                console.log(error);
            } else {
                const products = JSON.parse(data).products;
                let mostExpensiveProduct = null;
                let maxPrice = 0;

                for (const product of products) {
                    if (product.price > maxPrice) {
                        maxPrice = product.price;
                        mostExpensiveProduct = product;
                    }
                }

                const tableRows =`
                <tr>
                    <td>${mostExpensiveProduct.name}</td>
                    <td>${mostExpensiveProduct.sku}</td>
                    <td>${mostExpensiveProduct.price}</td>
                </tr>`;

                const htmlTable = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>SKU</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                `;

                console.log('El producto más caro es:', mostExpensiveProduct);
                res.send(htmlTable);
            }
        });
    }
    else if(req.headers['task'] === '2')
    {
        fs.readFile('files/products.json', 'utf8', (error, data) => {
            if (error) {
                console.log(error);
            }
            else
            {
                const products = JSON.parse(data).products;
                let avg = 0;

                for (const product of products) {
                    avg += product.price;
                }

                avg /= products.length;

                const htmlP = `<h2>Average price: ${avg}</h2>`;

                console.log('El promedio de precios es:', avg);
                res.send(htmlP);
            }
        });
    }
    else
    {
        fs.readFile('files/products.json', 'utf8', (error, data) => {
            if (error) {
                console.log(error);
            } else {
                const products = JSON.parse(data).products;
                console.log('Products:', products);
                let tableRows = '';

                for (const product of products) {
                    tableRows += `
                    <tr>
                        <td>${product.name}</td>
                        <td>${product.sku}</td>
                        <td>${product.price}</td>
                    </tr>`;
                }

                const htmlTable = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>SKU</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                `;

                res.send(htmlTable);
            }
        });
    }

});


app.listen(port, () => {
    console.log("Aplicacion de ejemplo corriendo en puerto " + port);
});