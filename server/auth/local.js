var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/users-auth');
var config = require('./config');
var init = require('./init');


// LOCAL LOGIN  =============================================================

 passport.use('local-login', new LocalStrategy({
     usernameField: 'username',
     passwordField: 'password',
     passReqToCallback: true
   }, function(obj, username, password, done) {

    var insert = {
      username: username,
      id: password
    };

    User.checkId(insert).then(function(data) {
      console.log('check id result = ', data)

      if(data) {
        return done(null, data[0]);
      }
      else {
        return done(null, false);
      }
    })


 }));

 // LOCAL SIGNUP  ============================================================
 passport.use('local-signup', new LocalStrategy({
     usernameField: 'username',
     passwordField: 'password'
   }, function(username, password, done, obj) {

      console.log('PROFILE === ', username, password);
      var insert = {
        username: username,
        id: password
      };

      console.log('insert = ', insert)

     User.verifyInsert(insert).then(function(obj) {
        console.log('inserted vi local = ', obj);
        var send = {
          user: obj.user,
          passid: obj.passid
        };

        console.log('send = ', send);

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
