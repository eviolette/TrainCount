/**
 * Created by eviolette on 8/8/17.
 */

var express = require('express');
var router = express.Router();
var Username = require('../models/username');
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

router.post('/uploadusers', function(req, res, next) {
    Username.updateUsername();
    var upload = multer({storage: storage}).single('userlist');
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

router.get('/isadmin/:id', function (req, res, next) {
   var username = req.params.id;
   Username.findOne({user: username}, function (err, found) {
       if (found) {
           res.json({success : found.isAdmin});
       } else {
           res.json({success : false});
       }
   })
});

router.get('/approvedemail/:id', function (req, res, next) {
    var email = req.params.id;
    Username.findOne({email: email}, function (err, found) {
        if (found) {
            res.json({success : true});
        } else {
            res.json({success : false});
        }
    })
});

module.exports = router;