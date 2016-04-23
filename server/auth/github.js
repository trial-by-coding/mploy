var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var User = require('../models/users-auth');
var config = require('./config');
var init = require('./init');


passport.use(new GitHubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    User.verifyInsert(profile).then(function(obj) {
        console.log('inserted vi github = ', obj);
        var send = {
          user: obj.user,
          passid: obj.passid
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
deserializeUser ==  { user: 'lancespears', passid: '15279951' }
verifyId id ==  15279951
verifyId err =  [ { uid: 1,
    passid: '15279951',
    user: 'lancespears',
    password: null,
    profile_picture: 'https://avatars.githubusercontent.com/u/15279951?v=3' } ]
user is =  { user: 'lancespears', passid: '15279951' }
*/
