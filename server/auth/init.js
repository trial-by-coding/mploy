var passport = require('passport');
var Users = require('../models/Users');
var Stats = require('../models/Stats');

module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {

    Users.verifyId(user.linkedin_id)
      .then(function(data) {
        Stats.newUserData(data.userID)
        done(null, user);
      })
      .catch(function(err) {
        console.log('Deserialize err: ', err);
        done(null, user);
      });
  });

};