var JobPosts = require('../models/JobPosts.js')
var Applications = require('../models/Applications.js')
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(router) {
  var app = express();
  app.use(bodyParser.json()); // support json encoded bodies

	//router.use(function(req,res,next) {
		//check to see if employer
		//if employer res.next()
		// }

		// res.redirect('/job')
	//});

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

	//catch all
	router.get('/*', function(req, res) {
		res.redirect('/job')
	});

}