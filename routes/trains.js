/**
 * Created by eviolette on 7/20/17.
 */

var express = require('express');
var router = express.Router();
var Train = require('../models/train');
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


var upload = multer({storage: storage}).single('trainraw');

router.post('/upload', function(req, res, next) {
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

router.get('/getnumberofcars/:id', function (req, res, next) {
    console.log(req.params.id);
    var index = req.params.id;
    Train.findOne({'train_index' : index}, function (err, found) {
        if (found) {
            console.log(found.numCars);
            res.json({numCars: found.numCars});
        }
    });
});

module.exports = router;

