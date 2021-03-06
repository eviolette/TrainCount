var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database');

var options = {server: {
    socketOptions: {
      //  keepAlive: 9999999999,
        //connectTimeoutMS: 100,
        socketTimeoutMS: 100
    }
}};

mongoose.connect(config.database);



// Confirm Mongodb Connection
mongoose.connection.on('connected', function() {
    console.log('Connected to db');
});

// On Error
mongoose.connection.on('error', function(err) {
    console.log('Database error: ' + err);
});




var counters = require('./routes/counters');
var users = require('./routes/users');
var lines = require('./routes/lines');
var counts = require('./routes/counts');
var trains = require('./routes/trains');
var newcounts = require('./routes/newcounts');
var usernames = require('./routes/usernames');

var app = express();

// Port Number
const port = process.env.PORT || 3000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// MIDDLEWARE
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require ('./config/passport')(passport);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/', index);
app.use('/users', users);
app.use('/lines', lines);
app.use('/counts', counts);
app.use('/trains', trains);
app.use('/newcounts', newcounts);
app.use('/counters', counters);
app.use('/usernames', usernames);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.get('/', function (req, res) {
    res.send('hi')
});

app.listen(port, function () {
    console.log('Website listening on port 3000!')
});
