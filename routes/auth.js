var express = require('express');
var oauth = require('../modules/oauth');

var router = express.Router();

router.all('/token', oauth.grant());

module.exports = router;
