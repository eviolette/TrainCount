/**
 * Created by eviolette on 7/20/17.
 */

var express = require('express');
var router = express.Router();
var NewCount = require('../models/newcount');
var config = require('../config/database');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');


// Return onoffs information (along with stationcode) via querying the NewCount model

router.get('/onoffs/:id', function(req, res, next) {
   //console.log('get registered');
   var train = req.params.id.substring(0, 10);
   //console.log(train);
   var station = req.params.id.substring(10);
   //console.log(station);
   NewCount.findOne({'stationName' : station, 'trainCoachIndex' : train}, function(err, entry) {
       if (err) throw err;
       if (entry) {
           //console.log(entry.stationComment);
           res.json({success: true,
                     onCount: entry.onCount,
                     offCount: entry.offCount,
                     comments: entry.stationComment,
                     stationCode: entry.stationCode})
       } else {
           res.json({success: false})
       }
   })
});

// Return stationcodes

router.get('/stationtime/:id', function(req, res, next) {
    //console.log("Get registered");
    var station = req.params.id;
    NewCount.findOne({'stationName' : station}, {'stationCode':1, '_id':0}, function(err, entry) {
        if (err) throw err;
        //console.log(entry);
        res.json({stationCode: entry['stationCode']})
    });
});


// Queries NewCount model to find if the train even exists

router.get('/trainexists/:id', function (req, res, next) {
    var coach = req.params.id;
    //console.log(coach);
    NewCount.findOne({'trainCoachIndex' : coach}, function(err, found) {
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

// Queries NewCount model to find if the line even exists


router.get('/lineexists/:id', function (req, res, next) {
    var train = req.params.id;
    //console.log(train);
    NewCount.findOne({'trainIndex' : train}, function(err, found) {
        if (err) throw err;
        if (found) {
            //console.log('train found');
            res.json({success: true});
        } else {
            //console.log('train not found');
            res.json({success: false});
        }
    })
});

// Posts to NewCount db to update the count information

router.post('/updatecount', function(req, res, next) {
    console.log('updating');
    let count = new NewCount({
        trainStationCoachIndex: req.body.trainStationCoachIndex,
        trainIndex: req.body.trainIndex,
        stationCode: req.body.stationCode,
        stationName: req.body.stationName,
        stationTime: req.body.stationTime,
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

// Calls NewCount export method, sends back to downlaod the csv file


router.get('/exportcount', function (req, res, next) {
  console.log('attempting to download');
  res.setHeader('Content-disposition', 'attachment; filename=countstest.csv');
  res.setHeader('Content-type', 'text/csv');
  res.flush();
  NewCount.exportData(res);
});

module.exports = router;