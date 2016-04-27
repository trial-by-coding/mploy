var JobPosts = require('../models/JobPosts.js');
var Employers = require('../models/Employers.js');
var Applications = require('../models/Applications.js');
var Users = require('../models/Users.js');
var Stats = require('../models/Stats.js');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(router) {
  var app = express();
  app.use(bodyParser.json()); // support json encoded bodies

	// router.use(function(req,res,next) {

 //    console.log('req stuff: ', req.user.linkedin_id)
 //    var linkedin_id = req.user.linkedin_id
 //    return Users.verifyId(linkedin_id)
 //    .then(function(userObj) {
 //      Employers.verify(userObj.userID)
 //    })
 //    .then(function(resp) {
 //      console.log('Resp from Employers.verify:', resp)
 //    })
 //    .catch(function(err) {
 //      console.log('Employer authentication failed: ', err)
 //    })
 //    // }
 //      res.next()

	// 	// res.redirect('/job')
	// });

	//Routes:
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

  //offset to get certain number of jobs at a time
  //need user information a

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
        return Stats.incrementDenied(data[0].user_id)
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

	//catch all
	router.get('/*', function(req, res) {
		res.redirect('/job')
	});

}