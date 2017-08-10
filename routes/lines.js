/**
 * Created by eviolette on 7/12/17.
 */
var express = require('express');
var router = express.Router();
var Line = require('../models/line');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');



// Register Line
router.post('/register', function(req, res, next) {
    let newLine = new Line({
        date: req.body.date,
        counter_name: req.body.counter_name,
        counter_id: req.body.counter_id,
        assigned_car: req.body.assigned_car,
        serial_num: req.body.serial_num,
        train_line: req.body.train_line,
        num_cars: req.body.num_cars,
        dept_time: req.body.dept_time,
        arrival_time: req.body.arrival_time
    });

    Line.addLine(newLine, function(err, line) {
        if(err) {
            res.json({success: false, msg:'Failed to register line'});
        } else {
            res.json({success: true, msg:'Line registered'});
        }
    });
});

module.exports = router;
