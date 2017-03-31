import express from 'express'; //var express = require('express');

const router = express.Router();

/* GET home page. */ // serve the static files...
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export default router;
//module.exports = router;
