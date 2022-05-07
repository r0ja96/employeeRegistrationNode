const db = require('./db');
const Authenticate = require('./authenticate');

const Department = function ({email,password, departmentID, department}){
    this.departmentID = departmentID;
    this.department = department;
    this.email = email;
    this.password = password;
}

Department.create = ({email,password, departmentID, department}, result)=>{

  if(!email || !password || !departmentID || !department ){ 
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
    const sql = `INSERT INTO department (departmentID, department, email) VALUES ('${departmentID}', CONCAT(UPPER(SUBSTRING('${department}',1,1)),LOWER(SUBSTRING('${department}',2))),'${email}')`;
  
    db.getConnection(function(err, connection) {
     if (err){ 
         result(err)
         return;
     }; 
    
     connection.query(sql, function (error, results, fields) {
       
       connection.release();
    
       
       if (error) {
        if(error.code === "ER_DUP_ENTRY"){
          result('department ID already exist');
          return;
        }
      
      result(error.code);
      return;
       };
           result(null,'register');
     });
   });
  }
  });

}

Department.delete = ({email, password, departmentID}, result)=>{

  if(!email || !password || !departmentID ){ 
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
      const sql = `DELETE FROM department WHERE departmentID = '${departmentID}' AND email = '${email}'`;
  
    db.getConnection(function(err, connection) {
     if (err){ 
         result(err)
         return;
     }; 
    
     connection.query(sql, function (error, results, fields) {
       
       connection.release();
    
       
       if (error) {
           result(error);
         return;
       };
           result(null,'deleted');
     });
   });
    }

  });

}

Department.update = ({email,password, departmentID, department}, result)=>{

  if(!email || !password || !departmentID || !department ){ 
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
    const sql = `UPDATE department SET department = CONCAT(UPPER(SUBSTRING('${department}',1,1)),LOWER(SUBSTRING('${department}',2))) WHERE departmentID = '${departmentID}' AND email = '${email}'`;
  
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
           result(null,'modifie');
     });
   });
  }
  });
}

Department.read = ({email, password}, result)=>{
    
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
    const sql = `select departmentID, CONCAT(UPPER(SUBSTRING(department,1,1)),LOWER(SUBSTRING(department,2))) as department from department where email = '${email}'`;
  
    db.getConnection(function(err, connection) {
     if (err){ 
         result(err)
         return;
     }; 
    
     connection.query(sql, function (error, results, fields) {
       
       connection.release();
    
       
       if (error) {
        if(error.code === "ER_DUP_ENTRY"){
          result('department ID already exist');
          return;
        }
      
      result(error);
      return;
       };
           result(null,results);
     });
   });
  }
  });
}

module.exports = Department;