var express = require('express');
var Users = require('../models/users-auth.js');
var passportGithub = require('../auth/github');
var passportGoogle = require('../auth/google');
var passportLinkedIn = require('../auth/linkedin');
var passportLocal = require('../auth/local');
var passportTwitter = require('../auth/twitter');


module.exports = function(router, passport) {


router.get('/test', function(req, res) {
    res.send('test success')
  });

  //get endpoint for json obj for posts
  router.get('/feed', function(req, res) {
    console.log('getting feed!');

    if (req.user) {
      console.log('user is authed!');
      console.log('user = ', req.user);
    }

  });

  router.get('/userstate', function(req, res) {

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
  router.get('/dashboard', function(req, res) {
    res.sendFile(assetFolder + '/index.html');
  });


  //------Authentication Routes

  // Github
  router.get('/github', passportGithub.authenticate('github', {
    //scope: ['user:email']
  }));

  router.get('/github/callback',
    passportGithub.authenticate('github', {
      failureRedirect: '/auth/github',
      successRedirect: '/user/job'
    }));

  // LinkedIn
  router.get('/linkedin', passportLinkedIn.authenticate('linkedin', {
    scope: ['r_basicprofile', 'r_emailaddress']
  }));

  router.get('/linkedin/callback',
    passportLinkedIn.authenticate('linkedin', {
      failureRedirect: '/auth/linkedin',
      successRedirect: '/user/job'
    }));

  // LOGOUT
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // -----------------Authenticate  login-----------------
  // process the login form
  router.post('/login', passportLocal.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: 'http://www.google.com'
  }));

  // ----------------User  Registration------
  // process the signup form
  router.post('/signup', passportLocal.authenticate('local-signup', {
    successRedirect: '/index.html',
    failureRedirect: 'http://www.yahoo.com'
  }));

};