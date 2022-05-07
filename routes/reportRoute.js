const express = require('express');
const router = express.Router();
const report = require('../controller/reportController');

//Job Title
router.post('/report',report.create());

module.exports = router;