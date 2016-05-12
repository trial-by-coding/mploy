var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

var Users = require('../models/Users');
var Stats = require('../models/Stats');
var init = require('./init');

if (!process.env.NODE_ENV !== 'production') {
  var config = require('./config');
}

let LinkedInID = process.env.LINKEDIN_ID || config.linkedin.clientID
let LinkedInSecret = process.env.LINKEDIN_SECRET || config.linkedin.clientSecret

passport.use(new LinkedInStrategy({
    clientID: LinkedInID,
    clientSecret: LinkedInSecret,
    callbackURL: '/auth/linkedin/callback',
    scope: [ 'r_basicprofile', 'r_emailaddress'],
    state: true
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('profile: ', profile)

    return Users.verifyId(profile.id)
    .then(function(existing) {
      console.log('existing:', existing)
      if (existing !== undefined){
        var send = {
          linkedin_id: existing.linkedin_id
        }
        return done(null, send)
      } else {
        return Users.insert(profile)
        .then(function(inserted) {
          console.log('inserted: ', inserted)
          var send = {
            linkedin_id: inserted.linkedin_id
          }
          return done(null, send)
        })
      }
      })
      .catch(function(err) {
        console.log('Verify insert err: ', err);
        return done(null, err);
      });

  }));

// serialize user into the session
init();

module.exports = passport;