/**
 * Created by eviolette on 7/20/17.
 */

var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream('./referencefiles/trainstationcoachcount.csv');
var mongoose = require('mongoose');
var config = require('../config/database');
var mongooseToCsv = require('mongoose-to-csv');

// NewCount Schema

var newCountSchema = new mongoose.Schema({
    trainStationCoachIndex: {
        type: String
    },
    trainIndex : {
        type: String
    },
    stationCode : {
        type: String
    },
    stationName : {
        type: String
    },
    stationTime : {
        type: String
    },
    trainCoachIndex : {
        type: String
    },
    onCount : {
        type: Number
    },
    offCount : {
        type: Number
    },
    stationComment : {
        type: String
    }
}, {strict : true});

// Plugin for export

newCountSchema.plugin(mongooseToCsv, {
    headers: 'TrainStationCoachIndex TrainIndex StationCode StationName StationTime TrainCoachIndex OnCount OffCount StationComment',
    constraints: {
        'TrainStationCoachIndex' : 'trainStationCoachIndex',
        'TrainIndex' : 'trainIndex',
        'StationCode' : 'stationCode',
        'StationName' : 'stationName',
        'StationTime' : 'stationTime',
        'TrainCoachIndex' : 'trainCoachIndex',
        'OnCount' : 'onCount',
        'OffCount' : 'offCount',
        'StationComment' : 'stationComment'
    }
});

var NewCount = module.exports = mongoose.model('NewCount', newCountSchema);

// Populates db from csv if not data not found

NewCount.find({}, function(err, found) {
    if (!found.length) {
        csv.fromStream(stream, {headers: true}, {ignoreEmpty: false})
            .on('data', function(data) {
                console.log(formatNewCountData(data));
                addNewCountToCollection(formatNewCountData(data));
            })
            .on('done', function() {
                console.log("done");
            });
    }
});




function formatNewCountData(data) {
    var csvRow = [];

    for (var i in data)
        csvRow.push(data[i])

    var countRow = {
        trainStationCoachIndex: csvRow[0],
        trainIndex: csvRow[1],
        stationCode: csvRow[2],
        stationName: csvRow[3].replace(/,/g, '_').replace(/[\u2018\u2019\u201C\u201D]/g, '"'),
        stationTime: csvRow[4],
        trainCoachIndex: csvRow[5],
        onCount: 0,
        offCount: 0,
        stationComment: ""
    };
    return countRow;
}

function addNewCountToCollection(data) {
    var newCount = new NewCount(data);
    newCount.save(function (err) {
        if (err) console.log(err);
    });
}

// Appends the NewCount to the Database

module.exports.updateCount = function (newcount) {
    NewCount.findOneAndUpdate({'trainCoachIndex' : newcount.trainCoachIndex, 'stationName' : newcount.stationName},
        {
            $set:
                {
                    trainStationCoachIndex: newcount.trainStationCoachIndex,
                    trainIndex: newcount.trainIndex,
                    stationCode: newcount.stationCode,
                    stationName: newcount.stationName,
                    stationTime: newcount.stationTime,
                    trainCoachIndex: newcount.trainCoachIndex,
                    onCount: newcount.onCount,
                    offCount: newcount.offCount,
                    stationComment: newcount.stationComment
                }
        },
        {
            new: true,
            upsert: true
        }
        ,
        function(err, count) {
            if(err) console.log(err);
            console.log(count);
        });
};

// Exports CSV

module.exports.exportData = function(output) {
    NewCount.findAndStreamCsv({})
        .pipe(output);

};


