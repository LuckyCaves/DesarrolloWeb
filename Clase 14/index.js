let mongoose = require('mongoose');

let mongoConnection = "mongodb+srv://admin:Tadeo6714@myapp.ycpafeh.mongodb.net/MyAppDB";
let db = mongoose.connection;

db.on ('connecting', () => {
    console.log('Conectando...');
    console.log(mongoose.connection.readyState); //State 2: Connecting
});

db.on ('connected', () => {
    console.log('¡Conectado exitosamente!');
    console.log(mongoose.connection.readyState); //State 1: Connected
});
mongoose.connect(mongoConnection, {useNewUrlParser: true});

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: {type: Date, default: Date.now},
    gender: {
        type: String,
        enum: ['M', 'F'],
        required: true
    },
    url: String
});

let User = mongoose.model('users', userSchema);

let newUser = new User({
    name: "Tadeo",
    email: "tadeo@gmail.com",
    password: "123456",
    date: new Date(),
    gender: 'M',
    url: 'https://www.google.com'
});

let user = User(newUser);

user.save().then((doc) => console.log(console.log("Usuario creado") + doc));