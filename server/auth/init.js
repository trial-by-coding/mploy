var passport = require('passport');
var User = require('../models/Users');
var Stats = require('../models/Stats');

module.exports = function() {

  passport.serializeUser(function(user, done) {
    console.log('serializeUser: ', user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('deserializeUser: ', user);

    User.verifyId(user.linkedin_id)
      .then(function(data) {
        console.log('Data in deserialize', data)

        Stats.newUserData(data[0].userID)
        done(null, user);
      })
      .catch(function(err) {
        console.log('Deserialize err: ', err);
        done(null, user);
      });
  });

};