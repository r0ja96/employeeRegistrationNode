const mysql = require('mysql');

const con = mysql.createPool({
        host:'localhost',
        user:'admin',
        password: 'admin',
        database: 'employeeRegistration'
});

module.exports = con;