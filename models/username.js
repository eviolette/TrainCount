/**
 * Created by eviolette on 8/8/17.
 */

var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream('./uploads/userlist');
var mongoose = require('mongoose');

var config = require('../config/database');

// Counter Schema
const UsernameSchema = mongoose.Schema({
    user: {
        type: String
    },
    email: {
        type: String
    },
    isAdmin: {
        type: Boolean
    }
});

const Username = module.exports = mongoose.model('Username', UsernameSchema);

module.exports.updateUsername = function () {
    csv.fromStream(stream, {headers:true}, {ignoreEmpty: false})
        .on('data', function (data) {
            //console.log(data);
            addUsernameToCollection(formatUsernameData(data));
        })
        .on('end', function() {
            //console.log('done');
        });
};

Username.find({}, function(err, found) {
    if (!found.length) {
        // read in CSV as stream, row by row
        csv.fromStream(stream, {headers:true}, {ignoreEmpty: false})
            .on('data', function (data) {
                //console.log(data);
                addUsernameToCollection(formatUsernameData(data));
            })
            .on('end', function() {
                //console.log('done');
            });
    }
});

function formatUsernameData(data) {
    var csvRow = [];

    for (var i in data)
        csvRow.push(data[i])

    var toBool = (csvRow[2] === 'yes');

    var username = {
        user: csvRow[0],
        email: csvRow[1],
        isAdmin: toBool
    };
    return username;
}

function addUsernameToCollection(data) {
    var username = new Username(data);
    username.save(function (err) {
        if (err) console.log(err);
    });
}

