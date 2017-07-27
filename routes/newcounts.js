/**
 * Created by eviolette on 7/20/17.
 */

var express = require('express');
var router = express.Router();
var NewCount = require('../models/newcount');
var config = require('../config/database');
var mongoose = require('mongoose');

router.get('/stationtime/:id', function(req, res, next) {
    console.log("Get registered");
    var station = req.params.id;
    NewCount.findOne({'stationName' : station}, {'stationCode':1, '_id':0}, function(err, entry) {
        if (err) throw err;
        console.log(entry);
        res.json({stationCode: entry['stationCode']})
    });
});

router.get('/trainexists/:id', function (req, res, next) {
    var trainid = req.params.id;
    console.log(trainid);
    NewCount.findOne({'trainIndex' : trainid}, function(err, found) {
        if (err) throw err;
        if (found) {
            console.log('train found');
            res.json({success: true});
        } else {
            console.log('train not found');
            res.json({success: false});
        }
    })
});


router.post('/updatecount', function(req, res, next) {
    console.log('updating');
    let count = new NewCount({
        stationName: req.body.stationName,
        trainCoachIndex: req.body.trainCoachIndex,
        onCount: req.body.onCount,
        offCount: req.body.offCount,
        stationComment: req.body.comments
    });
    console.log(count.stationComment);
    console.log(JSON.stringify(count));

    NewCount.updateCount(count);
    res.json({success: true, msg:'Count Updated'});
});

router.get('/exportcount', function (req, res, next) {
  NewCount.exportData();
  var file = __dirname + '/../countstest.csv';
  console.log('attempting to download');
  res.setHeader('Content-disposition', 'attachment; filename=countstest.csv');
  res.setHeader('Content-type', 'text/csv');
  res.download(file, function (err) {
      if(err) console.log(err);
      console.log("no err");
  }
  );
});

module.exports = router;