

function reportTemplate({employeeID,name,lastName,birthday,gender,department,jobTitle}){
  
return(
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>

    h1,table{
        text-align: center;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        height: 100%;
        
    }

    th,
 td {
    border: 1px black solid;   
  padding: 1rem;
}

    .container{
        height: 650px;
        width: 500px;
        margin: auto;
    }
</style>
<body>
    <h1>Employee Information</h1>
    <br>
    <div>
        <div class="container">
            <table>
                <tr>
                    <th>Employee ID</th>
                    <td>${employeeID}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>${name}</td>
                </tr>
                <tr>
                    <th>Last Name</th>
                    <td>${lastName}</td>
                </tr>
                <tr>
                    <th>Birthday</th>
                    <td>${birthday}</td>
                </tr>
                <tr>
                    <th>Gender</th>
                    <td>${gender}</td>
                </tr>
                <tr>
                    <th>Department</th>
                    <td>${department === null?'':department}</td>
                </tr>
                <tr>
                    <th>Job Title</th>
                    <td>${jobTitle === null?'':jobTitle}</td>
                </tr>
            </table>
        </div>
    </div>
    
</body>
</html>`
);
 }

 module.exports = reportTemplate;