const express = require('express');
const router = express.Router();
const department = require('../controller/departmentController');

//Deparment
router.post('/department',department.create());

router.post('/department/info',department.read());

router.put('/department',department.update());

router.delete('/department',department.del());

module.exports = router;