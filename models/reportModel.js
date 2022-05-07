const db = require('./db');
const Authenticate = require('./authenticate');

const Report = function ({email,password, employeeID}){
    this.employeeID = employeeID;
    this.email = email;
    this.password = password;

}

Report.read = ({email, password, employeeID}, result)=>{
    
    if(!email || !password || !employeeID){ 
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
      const sql = `select e.employeeID, CONCAT(UPPER(SUBSTRING(e.name,1,1)),LOWER(SUBSTRING(e.name,2))) as name, CONCAT(UPPER(SUBSTRING(e.lastName,1,1)),LOWER(SUBSTRING(e.lastName,2))) as lastName, Date_Format(e.birthday,'%m/%d/%Y') as birthday, TIMESTAMPDIFF(YEAR, e.birthday, CURDATE()) AS age, e.gender, CONCAT(UPPER(SUBSTRING(d.department,1,1)),LOWER(SUBSTRING(d.department,2))) as department, CONCAT(UPPER(SUBSTRING(j.jobTitle,1,1)),LOWER(SUBSTRING(j.jobTitle,2))) as jobTitle from employee e left join jobTitle j on  e.jobTitle = j.jobTitleID left join department d on e.department = d.departmentID where e.email = '${email}' and e.employeeID = '${employeeID}'`;
    
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


module.exports = Report;