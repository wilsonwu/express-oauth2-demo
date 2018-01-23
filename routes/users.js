var express = require('express');
var oauth = require('../modules/oauth');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', oauth.authorise(), function(req, res, next) {
  res.send('Wilson Wu is a Software Architect!');
});

module.exports = router;
