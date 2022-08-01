const mysql = require('mysql2');

function read(connection, cb){
    let query = 'SELECT * FROM users';
    connection.query(query, (err, result) => {
        if(err) throw err;
        cb(result);
        connection.end();
    })
}

function insert(connection, data, cb){
    let insertQuery = "INSERT INTO  users (name, email) VALUES (?, ?)";
    let query = mysql.format(insertQuery, [data.name, data.email]);
    connection.query(query, (err, result) => {
        if(err) throw err;
        cb(result);
        connection.end();
    })
}

function update(connection, data, cb) {
    let updateQuery = "UPDATE users SET email= ? WHERE id = ?";
    let query = mysql.format(updateQuery, [data.email, data.id]);
    connection.query(query, (err, result) => {
        if(err) throw err;
        cb(result);
        connection.end();
    }) 
}

function remove(connection, data, cb) {
    let removeQuery = "DELETE FROM users WHERE id=?";
    let query = mysql.format(removeQuery, [data.id])
    connection.query(query, (err, result) => {
        if(err) throw err;
        cb(result);
        connection.end();
    })
}

module.exports = {read, insert, update, remove}