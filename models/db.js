const mysql = require('mysql');

const con = mysql.createPool({
        host:'',
        user:'',
        password: '',
        database: 'employeeRegistration',
});

module.exports = con;