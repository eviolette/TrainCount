/**
 * Created by eviolette on 7/20/17.
 */


var mongoose = require('mongoose');
var config = require('../config/database');

// Code Schema

var LineCodeSchema = mongoose.Schema({
    trainLineCode : {
        type: String
    },
    trainLineName : {
        type: String
    },
    keyVal : {
        type: String
    }
});

var LineCode = module.exports = mongoose.model('LineCode', LineCodeSchema);

var elecsc = new LineCode({trainLineCode : 'Elec - SC',
                         trainLineName : 'Electric - South Chicago Branch',
                         keyVal : '01'});
elecsc.save(function (err) {
   if (err) console.log(err);
});

var elecbi = new LineCode({trainLineCode : 'Elec - BI',
    trainLineName : 'Electric - Blue Island Branch',
    keyVal : '02'});
elecbi.save(function (err) {
    if (err) console.log(err);
});

var elecml = new LineCode({trainLineCode : 'Elec - ML',
    trainLineName : 'Electric - Main Line',
    keyVal : '05'});
elecml.save(function (err) {
    if (err) console.log(err);
});

var ri = new LineCode({trainLineCode : 'RI',
    trainLineName : 'Rock Island',
    keyVal : '06'});
ri.save(function (err) {
    if (err) console.log(err);
});

var sws = new LineCode({trainLineCode : 'SWS',
    trainLineName : 'SouthWest Service',
    keyVal : '08'});

sws.save(function (err) {
    if (err) console.log(err);
});

var her = new LineCode({trainLineCode : 'HER',
    trainLineName : 'Heritage',
    keyVal : '09'});
her.save(function (err) {
    if (err) console.log(err);
});

var bnsf = new LineCode({trainLineCode : 'BNSF',
    trainLineName : 'Burlington North Santa Fe',
    keyVal : '10'});
bnsf.save(function (err) {
    if (err) console.log(err);
});

var upw = new LineCode({trainLineCode : 'UPW',
    trainLineName : 'Union Pacific West',
    keyVal : '11'});
upw.save(function (err) {
    if (err) console.log(err);
});

var mdw = new LineCode({trainLineCode : 'MDW',
    trainLineName : 'Milwaukee District - West',
    keyVal : '12'});
mdw.save(function (err) {
    if (err) console.log(err);
});

var upnw = new LineCode({trainLineCode : 'UPNW',
    trainLineName : 'Union Pacific Northwest',
    keyVal : '13'});
upnw.save(function (err) {
    if (err) console.log(err);
});

var mdn = new LineCode({trainLineCode : 'MDN',
    trainLineName : 'Milwaukee District - North',
    keyVal : '15'});
mdn.save(function (err) {
    if (err) console.log(err);
});

var ncs = new LineCode({trainLineCode : 'NCS',
    trainLineName : 'North Central Service',
    keyVal : '16'});
ncs.save(function (err) {
    if (err) console.log(err);
});

var upn = new LineCode({trainLineCode : 'UPN',
    trainLineName : 'Union Pacific North',
    keyVal : '17'});
ncs.save(function (err) {
    if (err) console.log(err);
});

