var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Welcome to Brewguru api server');
});

module.exports = router;
