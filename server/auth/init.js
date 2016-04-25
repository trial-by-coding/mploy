var passport = require('passport');
var User = require('../models/Users');


module.exports = function() {

  passport.serializeUser(function(user, done) {
    console.log('serializeUser = ', user);
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    console.log('deserializeUser == ', user);

    User.verifyId(user.linkedin_id).then(function(data) {
        console.log('verifyId = ', data);
        console.log('user is = ', user);
        done(null, user);
      })
      .catch(function(err) {
        console.log('deserialize err = ', err);
        done(null, user);
      });
  });

};
