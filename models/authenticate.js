const bcrypt = require('bcryptjs');
const db = require('./db');

const Authenticate = function({email, password}){
  this.email = email;
  this.password = password;
}

Authenticate.authenticate = ({email, password},result) =>{
    
    const sql = `SELECT password FROM account WHERE email = '${email}'`;
  
    db.getConnection(function(err, connection) {
      if (err) { 
        result(true);
        return;
      }
   
     
     return connection.query(sql, function (error, results, fields) {
        
        connection.release();
     
        
        if (error){ 
          result(true);
          return;
        } 

        if(results.length && bcrypt.compareSync(password,results[0].password) ){ result(null, true); return;};

        result(true);
        return;
      
      });
    });
  
}



module.exports = Authenticate;