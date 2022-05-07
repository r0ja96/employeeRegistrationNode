const express = require('express');
const router = express.Router();
const jobTitle = require('../controller/jobTitleController');

//Job Title
router.post('/jobTitle',jobTitle.create());

router.post('/jobTitle/info',jobTitle.read());

router.put('/jobTitle',jobTitle.update());

router.delete('/jobTitle',jobTitle.del());

module.exports = router;