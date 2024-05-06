const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

function connectDB(jsonUser)
{
    let mongoConnection = "";
    let db = mongoose.connection;

    db.on('connecting', () => {
        console.log('Conectando a la base de datos...');
        console.log(mongoose.connection.readyState);
    });

    db.on('connected', () => {
        console.log('Conectado a la base de datos');
        console.log(mongoose.connection.readyState);
    });

    mongoose.connect(mongoConnection, {useNewUrlParser: true});

    addUser(jsonUser);
}

function addUser(jsonUser)
{

    const userSchema = new mongoose.Schema({ 
        Nombre: { 
            type: String, required: true 
        }, 
        Correo: { 
            type: String, required: true 
        }, 
        Edad: { 
            type: Number, required: true, min: 0, max: 120 
        }, 
        Sexo: { 
            type: String, required: true, enum: ['H', 'M'] 
        } 
    });

    const User = mongoose.model('usersT', userSchema);

    const newUser = {Nombre: jsonUser.Nombre, Correo: jsonUser.Correo, Edad: jsonUser.Edad, Sexo: jsonUser.Sexo};

    const user = User(newUser);

    user.save().then((doc) => { console.log("usuario creado"); }).catch((err) => { console.error(err); });

}


const app = express();
const port = 3000;

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));

app.use(express.json());

app.post('/api/users', (req, res) => {

    const user = req.body;
    console.log(user);

    if(user === undefined || user === null) {
        res.status(400).send('El usuario no puede ser nulo');
        return;
    }

    connectDB(user);
    res.send("Usuario creado");

});

app.listen(port, () => {
    console.log("Aplicacion de ejemplo corriendo en puerto " + port);
});