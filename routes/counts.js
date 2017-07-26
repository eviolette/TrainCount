/**
 * Created by eviolette on 7/14/17.
 */

var express = require('express');
var router = express.Router();
var Count = require('../models/count');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var mongoose = require('mongoose');

// Count
router.get('/departures/:id', function(req, res, next) {
    var trainid = +req.params.id;
    Count.findOne({'train' : trainid}, {'rows.dept_time':1, '_id':0}, function(err, row) {
        if (err) throw err;
        //console.log("Rows: %j", row["rows"].map(function(x) {return x.dept_time}));
        res.json({times: row["rows"].map(function(x) {return x.dept_time})})
    });
});
router.get('/stations/:id', function(req, res, next) {
    var trainid = +req.params.id;
    Count.findOne({'train' : trainid}, {'rows.station':1, '_id':0}, function(err, row) {
        if (err) throw err;
        //console.log("Rows: %j", row["rows"].map(function(x) {return x.station}));
        res.json({stations: row["rows"].map(function(x) {return x.station})})
    });
});

router.get('/trainexists/:id', function (req, res, next) {
   var trainid = +req.params.id;
   console.log(trainid);
   Count.findOne({'train' : trainid}, function(err, found) {
       if (err) throw err;
       if (!found.length) {
           console.log('train not found');
           res.send(false);
       } else {
           console.log('train found');
           res.send(true);
       }
   })
});


module.exports = router;