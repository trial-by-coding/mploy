const passport = require('passport');
const User = require('../models/Users');
const Stats = require('../models/Stats');

module.exports = function() {

  passport.serializeUser(function(user, done) {
    console.log('serializeUser: ', user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('deserializeUser: ', user);

    User.verifyId(user.linkedin_id)
      .then(function(data) {
        console.log('data in deserialize', data)
        Stats.newUserData(data[0].userID)
        done(null, user);
      })
      .catch(function(err) {
        console.log('deserialize err: ', err);
        done(null, user);
      });
  });

};
