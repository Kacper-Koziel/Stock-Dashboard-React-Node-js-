const mysql = require('mysql2/promise');

const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboardusers'
});

module.exports = connectionPool;