/**
 * Created by eviolette on 7/17/17.
 */

var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream('/users/eviolette/Downloads/newcounts.csv');
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

//read in CSV as stream row by row
csv.fromStream(stream, {headers:true}, {ignoreEmpty:false})
    .on('data', function(data){


        //console.log(formatData(data));
        addCountToCollection(formatData(data));
    })
    .on('end', function(){
        // console.log('done');
        //console.log(masterList.String());
    });

function formatData(data) {
    var csvRow = [];

    for (var i in data)
        csvRow.push(data[i])

    var train = {
        dir: csvRow[TRAIN_DIR_COL],
        line: csvRow[TRAIN_LINE_COL],
        train: +csvRow[TRAIN_ID_COL]
    };
    var count = numOfStations(csvRow);
    rows = [];
    for (var stationIndex = 0; stationIndex < count; stationIndex++) {
        rows.push({
            dept_time: csvRow[stationIndex + DEPT_OFFSET + STATION_OFFSET],
            station: csvRow[stationIndex + STATION_OFFSET],
            cars : []
        })
    }
    train.rows = rows;
    return train;
}

function numOfStations(row) {
    for (var stationIndex = 0; stationIndex < MAX_COUNT; stationIndex++) {
        if(!row[stationIndex + STATION_OFFSET]) {
            return stationIndex;
        }
    }
    return  MAX_COUNT;
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



/*
 const countSchema = mongoose.Schema({
 dir: {
 type: String
 },
 line: {
 type: String
 },
 train_id: {
 type: Number
 },
 train_key: {
 type: String
 },
 Stn1: {
 type: String
 },
 Stn2: {
 type: String
 },
 Stn3: {
 type: Object
 },
 Stn4: {
 type: String
 },
 Stn5: {
 type: String
 },
 Stn6: {
 type: String
 },
 Stn7: {
 type: String
 },
 Stn8: {
 type: String
 },
 Stn9: {
 type: String
 },
 Stn10: {
 type: String
 },
 Stn11: {
 type: String
 },
 Stn12: {
 type: String
 },
 Stn13: {
 type: String
 },
 Stn14: {
 type: String
 },
 Stn15: {
 type: String
 },
 Stn16: {
 type: String
 },
 Stn17: {
 type: String
 },
 Stn18: {
 type: String
 },
 Stn19: {
 type: String
 },
 Stn20: {
 type: String
 },
 Stn21: {
 type: String
 },
 Stn22: {
 type: String
 },
 Stn23: {
 type: String
 },
 Stn24: {
 type: String
 },
 Stn25: {
 type: String
 },
 Stn26: {
 type: String
 },
 Dptr1: {
 type: String
 },
 Dptr2: {
 type: String
 },
 Dptr3: {
 type: String
 },
 Dptr4: {
 type: String
 },
 Dptr5: {
 type: String
 },
 Dptr6: {
 type: String
 },
 Dptr7: {
 type: String
 },
 Dptr8: {
 type: String
 },
 Dptr9: {
 type: String
 },
 Dptr10: {
 type: String
 },
 Dptr11: {
 type: String
 },
 Dptr12: {
 type: String
 },
 Dptr13: {
 type: String
 },
 Dptr14: {
 type: String
 },
 Dptr15: {
 type: String
 },
 Dptr16: {
 type: String
 },
 Dptr17: {
 type: String
 },
 Dptr18: {
 type: String
 },
 Dptr19: {
 type: String
 },
 Dptr20: {
 type: String
 },
 Dptr21: {
 type: String
 },
 Dptr22: {
 type: String
 },
 Dptr23: {
 type: String
 },
 Dptr24: {
 type: String
 },
 Dptr25: {
 type: String
 },
 Dptr26: {
 type: String
 },
 On: {
 type: Number
 },
 Off: {
 type: Number
 }
 });

 */

