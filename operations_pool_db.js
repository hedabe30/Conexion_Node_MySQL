const mysql = require('mysql2');

function insertPool(pool, data, cb){
    let insertQuery = "INSERT INTO  users (name, email) VALUES (?, ?)";
    let query = mysql.format(insertQuery, [data.name, data.email]);
    
    pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(query, (err, result) => {
            if(err) throw err;
            cb(result);

            connection.release();
        })
    })
}

function readPool(connection, cb){
    let query = 'SELECT * FROM tbl_users';
    connection.query(query, (err, result) => {
        if(err) throw err;
        cb(result);
        connection.end();
    })
}

function updatePool(connection, data, cb) {
    let updateQuery = "UPDATE users SET email= ? WHERE id = ?";
    let query = mysql.format(updateQuery, [data.email, data.id]);
    connection.query(query, (err, result) => {
        if(err) throw err;
        cb(result);
        connection.end();
    }) 
}

function removePool(connection, data, cb) {
    let removeQuery = "DELETE FROM users WHERE id=?";
    let query = mysql.format(removeQuery, [data.id])
    connection.query(query, (err, result) => {
        if(err) throw err;
        cb(result);
        connection.end();
    })
}

module.exports = {readPool, insertPool, updatePool, removePool}