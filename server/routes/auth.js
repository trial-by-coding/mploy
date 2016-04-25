var express = require('express');
var Users = require('../models/Users.js');
var passportGithub = require('../auth/github');
var passportLinkedIn = require('../auth/linkedin');


module.exports = function(router, passport) {

  //get endpoint for json obj for posts
  //might get used later, otherwise delete
  router.get('/feed', function(req, res) {
    console.log('getting feed!');

    if (req.user) {
      console.log('user is authed!');
      console.log('user = ', req.user);
    }

  });

  //might get used later, otherwise delete
  router.get('/userstate', function(req, res) {
    console.log('req.user: ', req.user)

    if (req.user) {
      Users.verifyId(req.user.passid).then(function(resp) {
        var obj = {};
        console.log(resp);
        if (resp[0]) {
          obj = {
            username: req.user.user,
            linkedin_id: req.user.passid,
            userID: resp[0].uid,
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
  // router.get('/dashboard', function(req, res) {
  //   res.sendFile(assetFolder + '/index.html');
  // });


  //------Authentication Routes

  // Github
  router.get('/github', 
    passportGithub.authenticate('github', {
    //scope: ['user:email']
  }));

  router.get('/github/callback',
    passportGithub.authenticate('github', {
      failureRedirect: '/auth/github',
      successRedirect: '/user/job'
    }));

  // LinkedIn
  router.get('/linkedin', 
    passportLinkedIn.authenticate('linkedin'));

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

};