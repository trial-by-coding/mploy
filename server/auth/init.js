var passport = require('passport');
var User = require('../models/Users');
var Stats = require('../models/Stats');

module.exports = function() {

  passport.serializeUser(function(user, done) {
    console.log('serializeUser = ', user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('deserializeUser == ', user);

    User.verifyId(user.linkedin_id)
      .then(function(data) {
        console.log('verifyId = ', data);
        console.log('user is = ', user);
        console.log('userID should be:', data[0].userID)
        Stats.newUserData(data[0].userID)
        done(null, user);
      })
      .catch(function(err) {
        console.log('deserialize err = ', err);
        done(null, user);
      });
  });

};
