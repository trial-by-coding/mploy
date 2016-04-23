var Users = require('./models/users-auth.js');
var passportGithub = require('./auth/github');
var passportGoogle = require('./auth/google');
var passportLinkedIn = require('./auth/linkedin');
var passportLocal = require('./auth/local');
var passportTwitter = require('./auth/twitter');


module.exports = function(routes, passport) {

  //get endpoint for json obj for posts
  routes.get('/feed', function(req, res) {
    console.log('getting feed!');

    if (req.user) {
      console.log('user is authed!');
      console.log('user = ', req.user);
    }

  });

  routes.get('/userstate', function(req, res) {

    if (req.user) {
      Users.grabID(req.user.passid).then(function(resp) {
        var obj = {};
        console.log(resp);
        if (resp[0]) {
          obj = {
            user: req.user.user,
            passid: req.user.passid,
            userId: resp[0].uid,
            profile_picture: resp[0].profile_picture
          };
        } else {
          res.status(403).send();
        }

        res.status(200).send(JSON.stringify(obj));
      });

    } else {
      res.status(403).send();
    }

  });

  //get endpoint to serve up index.html
  routes.get('/dashboard', function(req, res) {
    res.sendFile(assetFolder + '/index.html');
  });


  //------Authentication Routes

  // Github
  routes.get('/auth/github', passportGithub.authenticate('github', {
    //scope: ['user:email']
  }));

  routes.get('/auth/github/callback',
    passportGithub.authenticate('github', {
      failureRedirect: '/auth/github',
      successRedirect: '/'
    }));

  // Google
  routes.get('/auth/google', passportGoogle.authenticate('google', {
    scope: ['profile', 'email']
  }));

  routes.get('/auth/google/callback',
    passportGoogle.authenticate('google', {
      failureRedirect: '/auth/google',
      successRedirect: 'http://localhost:4000'
    }));

  // LinkedIn
  routes.get('/auth/linkedin', passportGoogle.authenticate('linkedin', {
    scope: ['r_basicprofile', 'r_emailaddress']
  }));

  routes.get('/auth/linkedin/callback',
    passportGoogle.authenticate('linkedin', {
      failureRedirect: '/auth/linkedin',
      successRedirect: '/'
    }));

  //Twitter
  routes.get('/auth/twitter', passportTwitter.authenticate('twitter', {
    scope: ['user:email']
  }));

  routes.get('/auth/twitter/callback',
    passportTwitter.authenticate('twitter', {
      failureRedirect: '/auth/twitter',
      successRedirect: '/'
    }));


  // LOGOUT
  routes.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // -----------------Authenticate  login-----------------
  // process the login form
  routes.post('/login', passportLocal.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: 'http://www.google.com'
  }));

  // ----------------User  Registration------
  // process the signup form
  routes.post('/signup', passportLocal.authenticate('local-signup', {
    successRedirect: '/index.html',
    failureRedirect: 'http://www.yahoo.com'
  }));

};
