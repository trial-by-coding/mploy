var passport = require('passport');
var Users = require('../models/Users');
var Stats = require('../models/Stats');

module.exports = function() {

  passport.serializeUser(function(user, done) {
    console.log('serializeUser: ', user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('deserializeUser: ', user);

    Users.verifyId(user.linkedin_id)
      .then(function(data) {
        console.log('Data in deserialize', data)
        Stats.newUserData(data.userID)
        done(null, user);
      })
      .catch(function(err) {
        console.log('Deserialize err: ', err);
        done(null, user);
      });
  });

};