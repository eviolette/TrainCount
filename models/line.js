/**
 * Created by eviolette on 7/11/17.
 */

var mongoose = require('mongoose');

var config = require('../config/database');

// Train Schema
const LineSchema = mongoose.Schema({
    date: {
        type: String
    },
    counter_name: {
        type: String
    },
    counter_id: {
        type: Number
    },
    assigned_car: {
        type: String,
        required: true
    },
    serial_num: {
        type: Number
    },
    train_line: {
        type: String
    },
    num_cars: {
        type: Number
    },
    dept_time: {
        type: String
    },
    arrival_time: {
        type: String
    }
});

const Line = module.exports = mongoose.model('Line', LineSchema);

module.exports.addLine = function(newLine, callback) {
    newLine.save(callback);
};

module.exports.getLineById = function(id, callback){
    Line.findById(id, callback);
};
