const express = require('express');
const Users = require('../models/Users.js');
const passportLinkedIn = require('../auth/linkedin');

module.exports = function(router, passport) {

  //------Authentication Routes

  // LinkedIn
  router.get('/linkedin',
    function (req, res, next) { 
      req.session = req.query
      next()
    },
    passportLinkedIn.authenticate('linkedin'));

  router.get('/linkedin/callback',
    function(req, res, next) {
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
