const express = require('express');
const mysql = require('mysql2');
require ('dotenv').config();                            //modulo para manejo de variables de entorno

const { insert, read, update, remove } = require('./operations_db');
const {readPool, insertPool, updatePool, removePool} = require('./operations_pool_db');

const app = express();
app.use(express.json());

/////////////////Conexion a BD ////////////////
const connection = mysql.createConnection({             //Se crea la conexión
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

const pool = mysql.createPool({                     //Crea la conexion para un pool
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
})


const connect = connection.connect((err) => {       //Si hay un error en la conexion
    if(err) throw err;
    console.log("Connected to database")
});


////////////Servidor-BD/////////////

app.get('/', (req, res) => {
    res.send("Hola mundo!!!")
;})

app.get('/insert', (req, res) => {
    connect;
    insert(connection, {name: 'Pedrita', email: 'pedrita@gmail.com'}, 
    result => {
        res.json(result);
    })
})

app.get('/read', (req, res) => {
    connect;
    read(connection, result => {
        res.json(result);
    })
})

app.get('/update', (req, res) => {
    connect;
    let data = {email: "pedrita2@gmail.com", id: 2};
    update(connection, data, result => {
        res.json(result);
    })
})

app.get('/remove', (req, res) => {
    connect;
    let data = {id: 2};
    remove(connection, data, result => {
        res.json(result);
    })
})

////////////////////////SERVIDOR-BD-POOL///////////////
//Se debe maneja la conexion de esta forma

app.post('/insert-pool', (req, res) => {
    const data = req.body;                              //mandar objeto con {name: "xxx", email: "xx@xx.com"}
    console.log(data);
    insertPool(pool, data, 
    result => {
        res.json(result);
    })
})

app.get('/read-pool', (req, res) => {
    readPool(pool, result => {
        res.json(result);
    })
})

app.patch('/update-pool', (req, res) => {
    let data = req.body;                                         //mandar onjeto con email y el id al que se le va a actualizar{email:"xx@xx.com", id:2}
    updatePool(connection, data, result => {
        res.json(result);
    })
})

app.delete('/remove-pool', (req, res) => {
    let data = req.body;                                                //mandar el id del user que se va a borrar {id: 5};
    removePool(connection, data, result => {
        res.json(result);
    })
})

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto ", process.env.PORT);
})