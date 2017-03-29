var express = require('express');
var router = express.Router();

/* GET home page. */ // serve the static files...
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
