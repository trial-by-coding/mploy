const express = require('express');
const Users = require('../models/Users.js');
const passportLinkedIn = require('../auth/linkedin');

  //get endpoint for json obj for posts
  //might get used later, otherwise delete
module.exports = function(router, passport) {

  router.get('/feed', function(req, res) {
    if (req.user) {
      console.log('user = ', req.user);
    }
  });

  //might get used later, otherwise delete
  router.get('/userstate', function(req, res) {
    if (req.user) {
      Users.verifyId(req.user.passid).then(function(resp) {
        let obj = {};
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

  // LinkedIn
  router.get('/linkedin',
    function (req, res, next) { 
      console.log('req.user in mid: ', req.user)
      console.log('req.query: ', req.query)
      console.log('req.session: ', req.session)
      req.session = req.query
      next()
    },
    passportLinkedIn.authenticate('linkedin'));

  router.get('/linkedin/callback',
    function(req, res, next) {
      console.log('req.session callback: ', req.session)
      next()
    },
    passportLinkedIn.authenticate('linkedin', {
      failureRedirect: '/auth/linkedin',
      successRedirect: '/user/redirect'
    }));



  // LOGOUT
  router.get('/logout', function(req, res) {
    req.logout();
    req.session = null;
    res.redirect('/');
  });
};
