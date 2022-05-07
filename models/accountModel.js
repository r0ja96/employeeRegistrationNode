const db = require('./db');
const Authenticate = require('./authenticate');
const bcrypt = require('bcryptjs');

const Account = function({email,password, name, lastName, birthday, gender}){
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.birthday = birthday;
    this.gender = gender;
}

Account.create = ({email,password, name, lastName, birthday, gender}, result) => { 

  let hash = '';

    if(email && password && name && lastName && birthday && gender){
       hash = bcrypt.hashSync(password);
    }else{

      result( 'Add all fields');
      return;
    }
    
    const sql = `INSERT INTO account (email, password, name, lastName, birthday, gender) VALUES ('${email}', '${hash}',CONCAT(UPPER(SUBSTRING('${name}',1,1)),LOWER(SUBSTRING('${name}',2))),CONCAT(UPPER(SUBSTRING('${lastName}',1,1)),LOWER(SUBSTRING('${lastName}',2))),'${birthday}','${gender}')`;
    
     db.getConnection(function(err, connection) {
      if (err){ 
          result(err)
          return;
      }; 
     
      connection.query(sql, function (error, results, fields) {
        
        connection.release();
     
        
        if (error) {
            if(error.code === "ER_DUP_ENTRY"){
              result('Email already exist');
              return;
            }
          
          result(error.code);
          return;
        };
            result(null,'register');
      });
    });

}

Account.signIn = ({email, password}, result) => {

  if(!email || !password ){ 
    result('Add all flieds'); 
    return;
    
  };
  const authenticate = new Authenticate({email, password});
  Authenticate.authenticate(authenticate,(error,data) =>{

    if(error){
      result('denied');
      return;
    }
  if(data){
    result(null,'access');
    return;
  }
  });
}

Account.info = ({email,password }, result) => { 

  if(!email || !password ){ 
    result('Add all flieds'); 
    return;
  };

  const authenticate = new Authenticate({email, password});
  Authenticate.authenticate(authenticate,(error,data) =>{

    if(error){
      result('denied');
      return;
    }
    if(data){
      
      const sql = `SELECT email,CONCAT(UPPER(SUBSTRING(name,1,1)),LOWER(SUBSTRING(name,2))) as name,CONCAT(UPPER(SUBSTRING(lastName,1,1)),LOWER(SUBSTRING(lastName,2))) as lastName, Date_Format(birthday,'%m/%d/%Y') as birthday,TIMESTAMPDIFF( YEAR, birthday,  CURDATE()) AS age FROM account WHERE email = '${email}'`;
    
     db.getConnection(function(err, connection) {
      if (err){ 
          result(err)
          return;
      }; 
     
      connection.query(sql, function (error, results, fields) {
        
        connection.release();
     
        
        if (error) {
          
          result(error.code);
          return;
        };
            result(null, results);
      });
    });
    }
  });
}

module.exports = Account;