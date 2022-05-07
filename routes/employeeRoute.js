const express = require('express');
const router = express.Router();
const employee = require('../controller/employeeController');

//Employee 
router.post('/employee', employee.create());

router.post('/employee/info', employee.read());

router.put('/employee',employee.update());

router.delete('/employee',employee.del());

module.exports = router;