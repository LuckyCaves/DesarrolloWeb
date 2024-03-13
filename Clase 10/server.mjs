import express from 'express';
import chalk from 'chalk';
import * as fs from 'node:fs';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log(chalk.green('Entró a raiz'));
});



app.get('/home', (req, res) => {
    res.send('Hello Home!');
    console.log(chalk.blue('Entró a home'));
});

app.get('/users', (req, res) => {
    console.log(chalk.yellow('Consultando usuarios'));

    if(!req.headers['x-auth'])
    {
        res.sendStatus(401);
        console.log(chalk.red('No autorizado'));
    }
    else
    {
        fs.readFile('DesarrolloWeb/Clase 9/files/usersFile.txt', 'utf8', (error, data) => {
            if(error)
                console.log(error);
            else
            {
                console.table(JSON.parse(data));
                res.send(data);
            }
        });
    }

});


app.listen(port, () => {
    console.log("Aplicacion de ejemplo corriendo en puerto " + port);
});