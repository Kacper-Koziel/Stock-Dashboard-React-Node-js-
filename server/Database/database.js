const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboardusers'
});

connection.connect((err) => {
    if(err) {
        console.error('Connection with database error: ', err.stack);
        return;
    }
    console.log('Connected successfully');
});

module.exports = connection;