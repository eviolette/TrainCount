/**
 * Created by eviolette on 7/17/17.
 */

var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream('/users/eviolette/Downloads/gtfs.csv');
var elecstream = fs.createReadStream('/users/eviolette/Downloads/gtfsELEC.csv');
var mongoose = require('mongoose');

var config = require('../config/database');

// Count Schema

const countSchema = mongoose.Schema({
    dir: {
       type: String
    },
    line: {
        type: String
    },
    train: {
        type: Number
    },
    rows: [{
        dept_time: {
            type: String
        },
        station: {
            type: String
        },
        cars: [{
            serial_num: {
                type: Number
            },
            on_count: {
                type: Number
            },
            off_count: {
                type: Number
            },
            comments: {
                type: String
            }
        }]
    }]
});

// attach Schema to Model
var Count = module.exports = mongoose.model('Count', countSchema);



const TRAIN_DIR_COL = 0, TRAIN_LINE_COL = 1, TRAIN_ID_COL = 2, STATION_OFFSET = 4, MAX_COUNT = 26, DEPT_OFFSET = 26;
const MAX_COUNT_ELEC = 34, DEPT_OFFSET_ELEC = 34;

Count.find({}, function (err, found) {
   if (!found.length) {
       //read in CSV as stream row by row
       csv.fromStream(stream, {headers:true}, {ignoreEmpty:false})
           .on('data', function(data){


               console.log(formatData(data));
               addCountToCollection(formatData(data, "Standard"));
           })
           .on('end', function(){
               // console.log('done');
               //console.log(masterList.String());
           });

//read in CSV as stream row by row
       csv.fromStream(elecstream, {headers:true}, {ignoreEmpty:false})
           .on('data', function(data){


               console.log(formatData(data));
               addCountToCollection(formatData(data, "Elec"));
           })
           .on('end', function(){
               // console.log('done');
               //console.log(masterList.String());
           });
   }
});



function formatData(data, type) {
    var csvRow = [];

    for (var i in data)
        csvRow.push(data[i])

    var train = {
        dir: csvRow[TRAIN_DIR_COL],
        line: csvRow[TRAIN_LINE_COL],
        train: +csvRow[TRAIN_ID_COL]
    };
    var count = numOfStations(csvRow, type);
    rows = [];
    if (type === "Standard") {
        for (var stationIndex = 0; stationIndex < count; stationIndex++) {
            rows.push({
                dept_time: csvRow[stationIndex + DEPT_OFFSET + STATION_OFFSET],
                station: csvRow[stationIndex + STATION_OFFSET].replace(/,/g, '_').replace(/[\u2018\u2019\u201C\u201D]/g, '"'),
                cars: []
            })
        }
    } else if (type === "Elec") {
        for (var stationIndex = 0; stationIndex < count; stationIndex++) {
            rows.push({
                dept_time: csvRow[stationIndex + DEPT_OFFSET_ELEC + STATION_OFFSET],
                station: csvRow[stationIndex + STATION_OFFSET].replace(/,/g, '_').replace(/[\u2018\u2019\u201C\u201D]/g, '"'),
                cars: []
            })
        }
    }
    train.rows = rows;
    return train;
}

function numOfStations(row, type) {
    if (type === "Standard") {
        for (var stationIndex = 0; stationIndex < MAX_COUNT; stationIndex++) {
            if (!row[stationIndex + STATION_OFFSET]) {
                return stationIndex;
            }
        }
        return MAX_COUNT;
    } else if (type === "Elec") {
        for (var stationIndex = 0; stationIndex < MAX_COUNT_ELEC; stationIndex++) {
            if (!row[stationIndex + STATION_OFFSET]) {
                return stationIndex;
            }
        }
        return MAX_COUNT_ELEC;
    }
}

function addCountToCollection(data){

    //create model and save to database
    var count = new Count(data);
    count.save(function (err) {
        if (err) // ...
            console.log(err);
    });
}

module.exports.getRowsByTrain = function(trainnum, callback) {
    /*
    var rowArr = [];
    var cursor = Count.find({'train' : trainnum}, 'rows -_id').cursor();
    cursor.on('data', function (doc) {
        rowArr.push(doc);
        //console.log(doc);
    });
    cursor.on('close', function () {
        console.log("done");
    });
    console.log(rowArr);
    */
    var rowArr = [];
    Count.find({'train' : trainnum}, 'rows -_id', function (err, counts) {
        if (err) throw err;
        rowArr.push(count.rows);
        callback(err, counts)
    });
    console.log(rowArr);
};

