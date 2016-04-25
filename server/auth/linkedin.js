var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

var User = require('../models/Users');
var config = require('./config');
var init = require('./init');


passport.use(new LinkedInStrategy({
    clientID: config.linkedin.clientID,
    clientSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL,
    scope: [ 'r_basicprofile', 'r_emailaddress'],
    state: true
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('linkedin profile: ', profile)
    User.verifyInsert(profile).then(function(obj) {
        console.log('inserted vi linkedin = ', obj);
        var send = {
          username: obj.username,
          linkedin_id: obj.passid,
          firstname: obj.givenName,
          lastname:  obj.familyName,
          profile_picture: obj.profile_picture,
          email: obj.email,
          industry: obj.industry,
          location: obj.location,
          linkedin_url: obj.profileUrl
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
