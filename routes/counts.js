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
router.get('/row/:id', function(req, res, next) {
    var trainid = +req.params.id;
    Count.findOne({'train' : trainid}, {'rows.dept_time':1, '_id':0}, function(err, row) {
        if (err) throw err;
        console.log("Rows: %j", row["rows"].map(function(x) {return x.dept_time}));
        res.json({times: row["rows"].map(function(x) {return x.dept_time})})
    });
});


module.exports = router;