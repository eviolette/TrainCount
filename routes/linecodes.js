/**
 * Created by eviolette on 7/20/17.
 */

var express = require('express');
var router = express.Router();
var LineCode = require('../models/linecode');
var config = require('../config/database');
var mongoose = require('mongoose');

module.exports = router;