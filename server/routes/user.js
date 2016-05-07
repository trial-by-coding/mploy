var express = require('express');
var JobPosts = require('../models/JobPosts.js')
var Users = require('../models/Users.js')
var Stats = require('../models/Stats.js')

module.exports = function(router) {

  var applicant = express.Router();
  require('./applicant.js')(applicant, express);
  router.use('/applicant', applicant)

  var employer = express.Router();
  require('./employer.js')(employer);
  router.use('/employer', employer)

  //Check if logged in:
  router.use(function(req,res,next) {
   if (req.isAuthenticated()){
    console.log('User is authenticated')
    return next()
   }
   res.redirect('/')
  });

  //Gives back user information
  router.get('/verifyuser', function(req, res) {
    console.log('req.user.linkedin_id: ', req.user.linkedin_id);
    var linkedin_id = req.user.linkedin_id
    Users.verifyId(linkedin_id)
    .then(function(data){
      console.log("responding with user data:",data);
    res.status(200).send(data);
    })
    .catch(function(err){
      console.log("error retrieving user data, err:",err);
      res.status(400).send(err);
    })
  });

  //Checks to see if user is listed as an employer after employer click and redirects to proper dashboard
  router.get('/redirect', function(req, res) {
    console.log('req.session.employer: ', req.session.employer)
    console.log('req.user.linkedin_id: ', req.user.linkedin_id)
    var linkedin_id = req.user.linkedin_id
    if (req.session.employer === 'true'){
      req.user.employer = true
      return Users.verifyEmployer(linkedin_id)
      .then(function(res) {
        console.log('res in redirect:', res)
        if (!res){
          console.log('Designating employer status to user.')
          return Users.designateAsEmployer(linkedin_id)
        }
      })
      .then(function() {
        console.log('Verifying employer status and redirecting.')
        res.redirect('/employer')
      })
    }
    if (req.session.employer === 'false'){
      req.user.employer = false
      return Users.verifyApplicant(linkedin_id)
      .then(function(res) {
        console.log('res in redirect:', res)
        if (!res){
          console.log('Designating employer status to user.')
          return Users.designateAsApplicant(linkedin_id)
        }
      })
      .then(function() {
        console.log('Verifying employer status and redirecting.')
        res.redirect('/applicant')
      })
    }
  });

  //Job listings:
  router.get('/job', function(req, res) {
      console.log('req.user: ', req.user)
      console.log('req stuff: ', req._passport.session.user)
      console.log("user:job:request for all job data");
      JobPosts.getAll()
      .then(function(data){
        res.status(200).send(data);
      })
      .catch(function(err){
        console.log("error retrieving all job data, err:",err);
        res.status(400).send(err);
      })
  });

  router.get('/job/:id', function(req, res) {
    console.log('user:job:jobID='+req.params.id);
    JobPosts.getJob(req.params.id)
    .then(function(data){
      if (data.length === 0){
        console.log("no data returned for request for jobID "+req.params.id);
        err = "no data returned for request for jobID "+req.params.id;
        res.status(400).send(err);
      }
      console.log("return data for jobID "+req.params.id, data);
      res.status(200).send(data);
    })
    .catch(function(err){
      console.log("error getting data for jobID "+req.params.id, err);
      res.status(400).send(err);
    })
  });

  //Get user stats:
  router.get('/stats', function(req, res){
    var linkedin_id = req.user.linkedin_id
    return Users.verifyId(linkedin_id)
    .then(function(data){
      console.log('data.userID: ', data.userID)
    return Stats.getStats(data.userID)
    })
    .then(function(apps) {
    console.log('Responding with stats for current user: ', apps)
    res.status(200).send(apps);
    })
    .catch(function(err){
    console.log("No stats retrieved for current user: ", err);
    res.status(400).send(err);
    })
  });

  router.get('/*', function(req, res) {
    console.log("user:default:redirecting to job");
    res.redirect('/');
  });
}