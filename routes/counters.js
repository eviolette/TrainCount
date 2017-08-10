var express = require('express');
var router = express.Router();
var Counter = require('../models/counter');
var config = require('../config/database');
var mongoose = require('mongoose');


// Store Counters CSV File Config

var multer = require('multer');
var DIR = './uploads/';
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    }
});

// Store Counters CSV File


router.post('/uploadcounters', function(req, res, next) {
    Counter.updateCounter();
    var upload = multer({storage: storage}).single('counters');
    var path = '';
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.status(422).send('an Error Occurred');
        }

        path = req.file.path;
        return res.send('Upload Completed for ' + path);
    })
});

// Query the db for the counter id

router.get('/checkid/:id', function (req, res, next) {
   var counterarr =  req.params.id.split('_');
   var counterid = counterarr[0];
   var countername = counterarr[1];
   console.log(counterid);
   console.log(countername);
   Counter.findOne({counter_id : counterid}, function (err, entry) {
       if (entry) {
           if (entry.counter_name === countername) {
               res.json({success: true});
           } else {
               res.json({success: false, msg: 'Warning: Counter Name does not match ID; Name is supposed to be' + entry.counter_name});
           }
       } else {
           res.json({success: false, msg: 'Warning: Counter ID not found'});
       }
   })
});

module.exports = router;