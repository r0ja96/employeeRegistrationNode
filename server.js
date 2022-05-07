const express = require('express');
const accountRoute = require('./routes/accountRoute');
const departmentRoute = require('./routes/departmentRoute');
const employeeRoute = require('./routes/employeeRoute');
const jobTitleRoute = require('./routes/jobTitleRoute');
const chartRoute = require('./routes/chartRoute');
const reportRoute = require('./routes/reportRoute');
const cors = require('cors');
const app = express();
const port = 4400;

app.use(cors());

app.use(express.json());

app.use('/', accountRoute,employeeRoute,jobTitleRoute,departmentRoute,chartRoute,reportRoute);

app.listen(process.env.PORT || port, () => {
  console.log(`App listening at http://localhost:${process.env.PORT || port}`)
});