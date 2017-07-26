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


router.post('/updatecount', function(req, res, next) {
    console.log('updating');
    let count = new NewCount({
        //trainStationCoachIndex: req.body.trainStationCoachIndex,
        //trainIndex: req.body.trainIndex,
        //stationCode: req.body.stationCode,
        stationName: req.body.stationName,
        //stationTime: req.body.stationTime,
        trainCoachIndex: req.body.trainCoachIndex,
        onCount: req.body.onCount,
        offCount: req.body.offCount,
        stationComment: req.body.comments
    });
    console.log(count.stationComment);
    console.log(JSON.stringify(count));

    NewCount.updateCount(count);
    res.json({success: true, msg:'Line registered'});
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