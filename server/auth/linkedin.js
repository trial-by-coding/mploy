const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const User = require('../models/Users');
const Stats = require('../models/Stats');
const config = require('./config');
const init = require('./init');


passport.use(new LinkedInStrategy({
    clientID: config.linkedin.clientID,
    clientSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL,
    scope: [ 'r_basicprofile', 'r_emailaddress'],
    state: true
  },
  function(accessToken, refreshToken, profile, done) {
    User.verifyInsert(profile)
    .then(function(obj) {

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

        console.log('send: ', send)

        return done(null, send);
      })
      .catch(function(err) {
        console.log('Verify insert promise err: ', err);
        return done(null, err);
      });

  }));

// serialize user into the session
init();

module.exports = passport;
