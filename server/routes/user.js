var express = require('express');
var JobPosts = require('../models/JobPosts.js')
var Users = require('../models/Users.js')

//http://www.localhost8080/auth/linkedin/employer
//http://www.localhost8080/auth/linkedin/callback

module.exports = function(router) {

    var applicant = express.Router();
    require('./applicant.js')(applicant, express);
    router.use('/applicant', applicant)

    var employer = express.Router();
    require('./employer.js')(employer);
    router.use('/employer', employer)

    // router.use(function(req,res,next) {
    //  //check if logged in
    //  if (req.isAuthenticated()){
    //      console.log('User is authenticated')
    //      return next()
    //  }
    //  res.redirect('/')
    // });

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

    router.get('/redirect', function(req, res) {
      console.log('req.session.employer: ', req.session.employer)
      console.log('req.user.linkedin_id: ', req.user.linkedin_id)
      if (req.session.employer === 'true'){
        var linkedin_id = req.user.linkedin_id
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
        res.redirect('/applicant')
      }
    });

    router.get('/job', function(req, res) {
        console.log('req.user: ', req.user)
        console.log('req stuff: ', req._passport.session.user)
        console.log("user:job:request for all job data");
        JobPosts.getAll()
        .then(function(data){
            // console.log("responding with all job data:",data);
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

    router.get('/jobs', function(req, res) {
        console.log("jobs dash");
        res.redirect('/user');
    });

    router.get('/*', function(req, res) {
        console.log("user:default:redirecting to job");
        res.redirect('/user');
    });

    // router.post('/employerverify', function(req, res) {
    //  console.log("employerverify:body:",req.body);
    //  Employers.verify(req.body.userID)
    //  .then(function(record) {
    //      console.log('record after verify ID', record)
    //      if (record){
    //          res.status(200).send("User is a verified employer.");
    //      } else {
    //          Employers.insert(req.body.userID)
    //          .then(function(data){
    //              console.log("employerverify:insert successful");
    //              res.status(201).send("Employer successfully inserted!");
    //          })  
    //      }
    //  })
    //  .catch(function(err){
    //      console.log("employerverify:insert failed, err:",err);
    //      res.status(400).send(err);
    //  })
    // });
}