/**
 * Created by famer.me on 15-7-27.
 */

var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next) {
  res.render('index');
});


module.exports = router;

