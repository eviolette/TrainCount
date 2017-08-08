/**
 * Created by eviolette on 7/20/17.
 */
var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream('./uploads/trainraw');
var mongoose = require('mongoose');

var config = require('../config/database');

// Train Data Schema

const trainDataSchema = mongoose.Schema({
    train_index: {
       type: String
    },
    countDate: {
        type: String
    },
    trainLine: {
        type: String
    },
    trainNo: {
        type: String
    },
    teamLeader: {
        type: String
    },
    numCars: {
        type: Number
    },
    crewList: {
        type: String
    },
    countComments: {
        type: String
    }
});

const Train = module.exports = mongoose.model('Train', trainDataSchema);

module.exports.updateTrain = function () {
    Train.remove({}, function(err, removed) {
        if (err) console.log(err);
    });
    csv.fromStream(stream, {headers:true}, {ignoreEmpty: false})
        .on('data', function (data) {
            //console.log(data);
            addTrainToCollection(formatTrainData(data));
        })
        .on('end', function() {
            //console.log('done');
        });
};


Train.find({}, function(err, found) {
    if (!found.length) {
        // read in CSV as stream, row by row
        csv.fromStream(stream, {headers:true}, {ignoreEmpty: false})
            .on('data', function (data) {
                //console.log(data);
                addTrainToCollection(formatTrainData(data));
            })
            .on('end', function() {
                //console.log('done');
            });
    }
});


function formatTrainData(data) {
    var csvRow = [];

    for (var i in data)
        csvRow.push(data[i])

    var train = {
        train_index: csvRow[0],
        countDate: csvRow[1],
        trainLine: csvRow[2],
        trainNo: csvRow[3],
        teamLeader: +csvRow[4],
        numCars: csvRow[5],
        crewList: csvRow[6],
        countComments: csvRow[7]
    };
    return train;
}

function addTrainToCollection(data) {
    var train = new Train(data);
    train.save(function (err) {
        if (err) console.log(err);
    });
}




