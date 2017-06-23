/**
 * Created by eviolette on 6/21/17.
 */
var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/trains';
var db = pgp(connectionString);

// add query functions

function getAllLines(req, res, next) {
    db.any('select * from lines')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL lines'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function updateLine(req, res, next) {
    db.many('update lines set on_count=$7, off_count=$3 where station=$"Zion"',
        [req.body.on_count, req.body.off_count, req.body.station])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated line'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
/*
function getSinglePuppy(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.one('select * from pups where id = $1', pupID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE puppy'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function createPuppy(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into pups(name, breed, age, sex)' +
        'values(${name}, ${breed}, ${age}, ${sex})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one puppy'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removePuppy(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.result('delete from pups where id = $1', pupID)
        .then(function (result) {
            /!* jshint ignore:start *!/
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} puppy'
                });
            /!* jshint ignore:end *!/
        })
        .catch(function (err) {
            return next(err);
        });
}*/


module.exports = {
    getAllLines: getAllLines,
    updateLine: updateLine,
};