var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/users-auth');
var config = require('./config');
var init = require('./init');


passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    User.verifyInsert(profile).then(function(obj) {
        console.log('data from vins = ', obj);
        var send = {
          user: obj.user,
          passid: obj.passid
        };

        return done(null, send);
      })
      .catch(function(err) {
        console.log('vi prom err', err);
        return done(null, err);
      });

  }));

init();


module.exports = passport;
