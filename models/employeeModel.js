const db = require('./db');
const Authenticate = require('./authenticate');

const Employee = function ({email,password, employeeID, name, lastName, birthday, gender, department, jobTitle}){
    this.employeeID = employeeID;
    this.department = department;
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.birthday = birthday;
    this.gender = gender;
    this.jobTitle = jobTitle;
}

Employee.create = ({email,password, employeeID, department, gender, name, lastName, birthday, jobTitle}, result)=>{

  if(!email || !password || !employeeID || !gender || !name || !lastName || !birthday || !department || !jobTitle){ 
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
    const sql = `INSERT INTO employee (employeeID, department, email, name, lastName, birthday, gender, jobTitle) VALUES ('${employeeID}', ${department === 'null' || department === 'Null'? department :`'${department}'` },'${email}',CONCAT(UPPER(SUBSTRING('${name}',1,1)),LOWER(SUBSTRING('${name}',2))),CONCAT(UPPER(SUBSTRING('${lastName}',1,1)),LOWER(SUBSTRING('${lastName}',2))),'${birthday}','${gender}', ${jobTitle === 'null'|| jobTitle === 'Null'? jobTitle :`'${jobTitle}'` })`;
  
    db.getConnection(function(err, connection) {
     if (err){ 
         result(err)
         return;
     }; 
    
     connection.query(sql, function (error, results, fields) {
       
       connection.release();
    
       
       if (error) {
        if(error.code === "ER_DUP_ENTRY"){
          result('Employee ID already exist');
          return;
        }
      
      result(error);
      return;
       };
           result(null,'register');
     });
   });
  }
  });

}

Employee.delete = ({email, password, employeeID}, result)=>{

  if(!email || !password || !employeeID ){ 
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
      const sql = `DELETE FROM employee WHERE employeeID = '${employeeID}' AND email = '${email}'`;
  
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

Employee.update = ({email,password, employeeID, department, gender, name, lastName, birthday, jobTitle}, result)=>{
      
    if(!email || !password || !employeeID || !gender || !name || !lastName || !birthday || !department || !jobTitle){ 
        result('Add all flieds'); 
        return;
      }

  const authenticate = new Authenticate({email, password});
  Authenticate.authenticate(authenticate,(error,data) =>{

    if(error){
      result('denied');
      return;
    }
  if(data){
    const sql = `UPDATE employee SET department = ${department === 'null' || department === 'Null'? department :`'${department}'` }, jobTitle = ${jobTitle === 'null' || jobTitle === 'Null'? jobTitle :`'${jobTitle}'` }, gender = '${gender}', name = CONCAT(UPPER(SUBSTRING('${name}',1,1)),LOWER(SUBSTRING('${name}',2))), lastName = CONCAT(UPPER(SUBSTRING('${lastName}',1,1)),LOWER(SUBSTRING('${lastName}',2))), birthday = '${birthday}' WHERE employeeID = '${employeeID}' AND email = '${email}'`;
  
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
           result(null,'modifie');
     });
   });
  }
  });
}

Employee.read = ({email, password}, result)=>{
    
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
    const sql = `select e.employeeID, CONCAT(UPPER(SUBSTRING(e.name,1,1)),LOWER(SUBSTRING(e.name,2))) as name, CONCAT(UPPER(SUBSTRING(e.lastName,1,1)),LOWER(SUBSTRING(e.lastName,2))) as lastName, Date_Format(e.birthday,'%m/%d/%Y') as birthday, TIMESTAMPDIFF(YEAR, e.birthday, CURDATE()) AS age, e.gender, d.departmentID, CONCAT(UPPER(SUBSTRING(d.department,1,1)),LOWER(SUBSTRING(d.department,2))) as department, j.jobTitleID, CONCAT(UPPER(SUBSTRING(j.jobTitle,1,1)),LOWER(SUBSTRING(j.jobTitle,2))) as jobTitle  from employee e left join jobTitle j on  e.jobTitle = j.jobTitleID and e.email = j.email left join department d on e.department = d.departmentID and e.email = d.email where e.email = '${email}'`;
  
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
           result(null,results);
     });
   });
  }
  });
}

module.exports = Employee;