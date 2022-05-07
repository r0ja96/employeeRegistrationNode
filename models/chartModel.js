const db = require('./db');
const Authenticate = require('./authenticate');

const Chart = function({email,password,department}){
    this.email = email;
    this.password = password;
    this.department = department;
}

Chart.info = ({email,password,department}, result) => {
    if(!email || !password || !department){ 
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
        const sql = `SELECT gender, count(*) as amount  FROM employee where department = "${department}" group by gender;`;
      
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

module.exports = Chart;