const express = require('express');
const router = express.Router();
const chart = require('../controller/chartController');

//chart
router.post('/chart/info',chart.info());

module.exports = router;