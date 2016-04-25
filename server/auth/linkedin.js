var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;

var User = require('../models/users-auth');
var config = require('./config');
var init = require('./init');


passport.use(new LinkedInStrategy({
    consumerKey: config.linkedin.clientID,
    consumerSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('linkedin profile: ', profile)
    User.verifyInsert(profile).then(function(obj) {
        console.log('inserted vi linkedin = ', obj);
        var send = {
          username: obj.username,
          linkedin_id: obj.passid,
          firstname: obj.givenName,
          lastname:  obj.familyName
        };

        return done(null, send);
      })
      .catch(function(err) {
        console.log('vi prom err = ', err);
        return done(null, err);
      });

  }));

// serialize user into the session
init();

module.exports = passport;


/*
    user is =  { passid: 'io5JAPc1Ax' }
    row here =  [ { uid: 2,
    passid: 'io5JAPc1Ax',
    user: null,
    password: null,
    profile_picture: null } ]

    */
