var express = require('express');
var router = express.Router();
var user = require('./users');

router.get('/', user.userIndex);

module.exports = router;
