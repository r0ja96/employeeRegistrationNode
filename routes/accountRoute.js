const express = require('express');
const router = express.Router();
const account = require('../controller/accountController');

router.post('/account', account.create());
router.post('/account/info', account.info());
router.post('/account/signin', account.signIn());

module.exports = router;