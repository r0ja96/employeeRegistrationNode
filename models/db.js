const mysql = require('mysql');

const con = mysql.createPool({
        host:'173.230.148.27',
        user:'root',
        password: 'password',
        database: 'employeeRegistration'
});

module.exports = con;