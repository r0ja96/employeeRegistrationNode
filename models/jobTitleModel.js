const db = require('./db');
const Authenticate = require('./authenticate');

const JobTitle = function ({email,password, jobTitleID, jobTitle}){
    this.jobTitleID = jobTitleID;
    this.jobTitle = jobTitle;
    this.email = email;
    this.password = password;
}

JobTitle.create = ({email,password, jobTitleID, jobTitle}, result)=>{

  if(!email || !password || !jobTitleID || !jobTitle ){ 
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
    const sql = `INSERT INTO jobTitle (jobTitleID, jobTitle, email) VALUES ('${jobTitleID}', CONCAT(UPPER(SUBSTRING('${jobTitle}',1,1)),LOWER(SUBSTRING('${jobTitle}',2))),'${email}')`;
  
    db.getConnection(function(err, connection) {
     if (err){ 
         result(err)
         return;
     }; 
    
     connection.query(sql, function (error, results, fields) {
       
       connection.release();
    
       
       if (error) {
        if(error.code === "ER_DUP_ENTRY"){
          result('Job Title ID already exist');
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

JobTitle.delete = ({email, password, jobTitleID}, result)=>{

  if(!email || !password || !jobTitleID ){ 
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
      const sql = `DELETE FROM jobTitle WHERE jobTitleID = '${jobTitleID}' AND email = '${email}'`;
  
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

JobTitle.update = ({email,password, jobTitleID, jobTitle}, result)=>{

  if(!email || !password || !jobTitleID || !jobTitle ){ 
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
    const sql = `UPDATE jobTitle SET jobTitle = CONCAT(UPPER(SUBSTRING('${jobTitle}',1,1)),LOWER(SUBSTRING('${jobTitle}',2))) WHERE jobTitleID = '${jobTitleID}' AND email = '${email}'`;
  
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

JobTitle.read = ({email, password}, result)=>{
    
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
    const sql = `select jobTitleID, CONCAT(UPPER(SUBSTRING(jobTitle,1,1)),LOWER(SUBSTRING(jobTitle,2))) as jobTitle from jobTitle where email = '${email}'`;
  
    db.getConnection(function(err, connection) {
     if (err){ 
         result(err)
         return;
     }; 
    
     connection.query(sql, function (error, results, fields) {
       
       connection.release();
    
       
       if (error) {
        if(error.code === "ER_DUP_ENTRY"){
          result('Job Title ID already exist');
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

module.exports = JobTitle;