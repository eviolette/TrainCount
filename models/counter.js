/**
 * Created by eviolette on 8/8/17.
 */

var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream('./uploads/counters');
var mongoose = require('mongoose');

var config = require('../config/database');

// Counter Schema
const CounterSchema = mongoose.Schema({
    counter_name: {
        type: String
    },
    counter_id: {
        type: Number
    }
});

const Counter = module.exports = mongoose.model('Counter', CounterSchema);

module.exports.updateCounter = function () {
    Counter.remove({}, function(err, removed) {
        if (err) console.log(err);
    });
    csv.fromStream(stream, {headers:true}, {ignoreEmpty: false})
        .on('data', function (data) {
            //console.log(data);
            addCounterToCollection(formatCounterData(data));
        })
        .on('end', function() {
            //console.log('done');
        });
};

Counter.find({}, function(err, found) {
    if (!found.length) {
        // read in CSV as stream, row by row
        csv.fromStream(stream, {headers:true}, {ignoreEmpty: false})
            .on('data', function (data) {
                //console.log(data);
                addCounterToCollection(formatCounterData(data));
            })
            .on('end', function() {
                //console.log('done');
            });
    }
});

function formatCounterData(data) {
    var csvRow = [];

    for (var i in data)
        csvRow.push(data[i])

    var counter = {
        counter_name: csvRow[0],
        counter_id: csvRow[1]
    };
    return counter;
}

function addCounterToCollection(data) {
    var counter = new Counter(data);
    counter.save(function (err) {
        if (err) console.log(err);
    });
}

