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
    var trainid = +(req.params.id.substring(2));
    var line = +req.params.id.substring(0,2);
    var linestr = formatIntoLine(line);
    console.log(line);
    Count.findOne({'train' : trainid, 'line' : linestr}, {'rows.dept_time':1, '_id':0}, function(err, row) {
        if (err) throw err;
        //console.log("Rows: %j", row["rows"].map(function(x) {return x.dept_time}));
        if (row) {
            res.json({
                success: true,
                times: row["rows"].map(function(x) {return x.dept_time})});
        } else {
            res.json({success: false})
        }


    });
});
router.get('/stations/:id', function(req, res, next) {
    var trainid = +(req.params.id.substring(2));
    var line = +req.params.id.substring(0,2);
    var linestr = formatIntoLine(line);
    line = formatIntoLine(trainid);
    console.log(line);
    Count.findOne({'train' : trainid, 'line' : linestr}, {'rows.station':1, '_id':0}, function(err, row) {
        if (err) throw err;
        //console.log("Rows: %j", row["rows"].map(function(x) {return x.station}));
        if (row) {
            res.json({
                success: true,
                stations: row["rows"].map(function(x) {return x.station})});
        } else {
            res.json({success: false});
        }
    });
});

function formatIntoLine(train) {
    var lineid = train;
    if (lineid === 1) return "ELSC";
    else if (lineid === 4) return "ELBI";
    else if (lineid === 5) return "ELML";
    else if (lineid === 6) return "RI";
    else if (lineid === 8) return "SWS";
    else if (lineid === 9) return "HER";
    else if (lineid === 10) return "BNSF";
    else if (lineid === 11) return "UPW";
    else if (lineid === 12) return "MDW";
    else if (lineid === 13) return "UPNW";
    else if (lineid === 15) return "MDN";
    else if (lineid === 16) return "NCS";
    else if (lineid === 17) return "UPN";
    //else return "potato";
}


module.exports = router;