var express = require('express');
var router = express.Router();
var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Train Counting' });
});
router.get('/inputpage', function(req, res, next) {
    res.render('inputpage', { title: 'Train Counting' });
});
router.get('/submit_completed', function(req, res, next) {
    res.render('submit_completed', { title: 'Donf' });
});


router.get('/api/lines', db.getAllLines);


module.exports = router;
