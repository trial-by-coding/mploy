var JobPosts = require('../models/JobPosts.js');
var Applications = require('../models/Applications.js');
var Users = require('../models/Users.js');
var Stats = require('../models/Stats.js');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(router) {
  var app = express();
  app.use(bodyParser.json()); // support json encoded bodies

  // router.use(function(req,res,next) {
  //   if (req.user !== undefined){
  //     var linkedin_id = req.user.linkedin_id
  //     return Users.verifyEmployer(linkedin_id)
  //     .catch(function(err) {
  //       console.log('Failed to verify user as employer:', err)
  //       res.redirect('/jobs')
  //     })
  //     .then(function(resp) {
  //       console.log('Resp from Users.verifyEmployer:', resp)
  //       if (resp){
  //         return next()
  //       } else {
  //         console.log('User is not an employer.')
  //         res.redirect('/jobs')
  //       }
  //     })
  //     .catch(function(err) {
  //       console.log('Employer authentication failed: ', err)
  //       res.redirect('/jobs')
  //     }) 
  //   } else {
  //     console.log('User not logged in')
  //     res.redirect('/')
  //   }
  // });

  //Could offset to get certain number of jobs at a time

  router.get('/appsbystatus', function(req, res){
    console.log('---appsbystatus:received GET, query='+JSON.stringify(req.query));
    var rq = req.query;
    if (rq && rq.jobID && rq.status) {
      console.log("request for jobId = ",rq.jobID);
      Applications.getByStatus(rq.jobID, rq.status) 
      .then(function(data){
        console.log("returning application data", data);
        res.status(200).send(JSON.stringify(data));
      })
      .catch(function(err){
        console.log("could not get application data for jobID "+rq.jobID+", err:", err);
        res.status(400).send(err);
      })
    } else {
      console.log("must supply jobID in query string"); 
      res.status(400).send("must supply jobID in query string");       
    }
  });

  router.get('/appsbyjob', function(req, res){
    console.log('---appsbyjob:received GET, query='+JSON.stringify(req.query));
    var rq = req.query;
    if (rq && rq.jobID) {
      console.log("request for jobId = ",rq.jobID);
      Applications.getAppsByJob(rq.jobID) 
      .then(function(data){
        console.log("returning application data", data);
        res.status(200).send(JSON.stringify(data));
      })
      .catch(function(err){
        console.log("could not get application data for jobID "+rq.jobID+", err:", err);
        res.status(400).send(err);
      })
    } else {
      console.log("must supply jobID in query string"); 
      res.status(400).send("must supply jobID in query string");       
    }
  });

  //TO DO:
  router.get('/appsandapplicants', function(req, res) {
    console.log('---appsandapplicants:received GET, query='+JSON.stringify(req.query));
    var rq = req.query;
    if (rq && rq.jobID) {
      console.log("jobId for request = ",rq.jobID);
      Applications.appsAndApplicants(rq.jobID) 
      .then(function(data){
        console.log("returning application data", data);
        res.status(200).send(JSON.stringify(data));
      })
      .catch(function(err){
        console.log("could not get application data for jobID "+rq.jobID+", err:", err);
        res.status(400).send(err);
      })
    } else {
      console.log("must supply jobID in query string"); 
      res.status(400).send("must supply jobID in query string");       
    }
  });

  router.get('/jobscreated', function(req, res) {
    console.log('---jobscreated:received GET')
    var linkedin_id = req.user.linkedin_id
    return Users.verifyId(linkedin_id)
    .then(function(data){
    console.log("User data: ", data);
    return JobPosts.getJobsByUser(data.userID)
    })
    .then(function(jobs) {
    console.log('Responding with job posts for current user: ', jobs)
    res.status(200).send(jobs);
    })
    .catch(function(err){
    console.log("No job posts retrieved for current user: ", err);
    res.status(400).send(err);
    })
  })

  router.get('/unconsideredapps', function(req, res){
    console.log('---unconsideredapps:received GET, query='+JSON.stringify(req.query));
    var rq = req.query;
    if (rq && rq.jobID) {
      console.log("request for jobId = ",rq.jobID);
      Applications.getUnconsidered(rq.jobID) 
      .then(function(data){
        console.log("returning application data", data);
        res.status(200).send(JSON.stringify(data));
      })
      .catch(function(err){
        console.log("could not get application data for jobID "+rq.jobID+", err:", err);
        res.status(400).send(err);
      })
    } else {
      console.log("must supply jobID in query string"); 
      res.status(400).send("must supply jobID in query string");       
    }
  });


//get user id
  router.post('/submitjob', function(req, res) {
    console.log('received submit job POST, body:',req.body);
    if(! req || !req.body) {
      console.log("error: submitjob POST with no body");
      res.status(400).send("/submitjob expected a body object");
    } else {
      console.log("body:",req.body);
      JobPosts.create(req.body)
      .then(function(data){
        console.log("job post successfully submitted")
        res.status(200).send("success!");
      })
      .catch(function(err){
        console.log("job post submission failed, err:",err);
        res.status(400).send("job post submission failed:",err);
      })
    }
  });

  router.put('/updatestatus', function(req, res){
    console.log('Received updatestatus PUT, body:',req.body);
    if(! req || !req.body) {
      console.log("Error: updatestatus PUT with no body");
      res.status(400).send("/updatestatus expected a body object");
    } else {
      console.log("body: ",req.body);
      Applications.updateStatus(req.body.appID, req.body.status)
      .then(function(data){
        console.log("Application successfully updated")
        res.status(200).send("success!");
      })
      .catch(function(err){
        console.log("Application update failed, err:",err);
        res.status(400).send("Application update failed:",err);
      })
    }
  });

  //increment denied in stats for user who created app
  router.delete('/deleteapp', function(req, res){
    console.log('---delete app:received DELETE, query='+JSON.stringify(req.query));
    var rq = req.query;
    if (rq && rq.appID) {
      console.log("request for appId = ",rq.appID);
      Applications.deleteApp(rq.appID) 
      .then(function(data){
        res.status(200).send(JSON.stringify(data));
        console.log("Successfully deleted application: ", data);
        return Stats.incrementDenied(data.user_id)
        .then(function() {
          console.log('App denied stat successfully incremented')
        })
        .catch(function() {
          console.log('App denied stat failed to increment')
        })
      })
      .catch(function(err){
        console.log("Could not get application data for appID "+rq.appID+", err:", err);
        res.status(400).send(err);
      })
    } else {
      console.log("Must supply appID in query string"); 
      res.status(400).send("Must supply appID in query string");       
    }
  });

  router.get('/appsbyemployer', function(req, res) {
    console.log('---appsbyemployer:received GET')
    // var linkedin_id = req.user.linkedin_id
    // return Users.verifyId(linkedin_id)
    // .then(function(userRec) {
    // return JobPosts.userJoin()
    // })
    return Users.jobJoin(1)
    .then(function(result) {
      res.send(result)
    })
  })

	//catch all
	router.get('/*', function(req, res) {
		res.redirect('/job')
	});

}