var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');


// Register
router.post('/register', function(req, res, next) {
  let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
  });

  User.addUser(newUser, function(err, user) {
      if(err) {
          res.json({success: false, msg:'Failed to register user'});
      } else {
          res.json({success: true, msg:'User registered'});
      }
  });
});

// Authenticate
router.post('/authenticate', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, function(err, user) {
      if(err) throw err;
      if(!user) {
          return res.json({success: false, msg:'Failed to authenticate user'})
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
          if(err) throw err;
          if(isMatch) {
              const token = jwt.sign(user, config.secret, {
                  expiresIn: 7200 // 2 hours
              });

              res.json({
                  success: true,
                  token: 'JWT ' + token,
                  user: {
                      id: user._id,
                      name: user.name,
                      username: user.username,
                      email: user.email
                  }
              });
          } else {
              return res.json({success: false, msg: 'Wrong Password'});
          }
      });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), function(req, res, next) {
    res.json({user: req.user});
});



module.exports = router;
