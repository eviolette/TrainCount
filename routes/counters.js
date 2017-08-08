var express = require('express');
var router = express.Router();
var Counter = require('../models/counter');
var config = require('../config/database');
var mongoose = require('mongoose');

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

module.exports = router;