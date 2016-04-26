var Applications = require('../models/Applications.js')
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(router) {
  var app = express();
  app.use(bodyParser.json()); // support json encoded bodies

  //router.use(function(req,res,next) {
    //check to see if applicant
    //if applicant res.next()
    // }

    // res.redirect('/job')
  //});

  router.get('/appsbyuser', function(req, res){
    console.log('---appsbyuser:received GET, query='+JSON.stringify(req.query));
    var rq = req.query;
    if (rq && rq.userID) {
      console.log("request for userId = ",rq.userID);
      Applications.getAppsByUser(rq.userID)
      .then(function(data){
        console.log("returning application data", data);
        res.status(200).send(JSON.stringify(data));
      })
      .catch(function(err){
        console.log("could not get application data for userID "+rq.userID+", err:", err);
        res.status(400).send(err);
      })
    } else {
      console.log("must supply userID in query string");
      res.status(400).send("must supply userID in query string");       
    }
  }); 

  router.post('/submitapp', function(req, res) {
    console.log('received submit application POST, body:',req.body);
    if(! req || !req.body) {
      console.log("error: submitapp POST with no body");
      res.status(400).send("/submitapp expected a body object");
    } else {
      console.log("body:",req.body);
      Applications.submit(req.body)
      .then(function(data){
        console.log("application successfully submitted")
        res.status(200).send("success!");
      })
      .catch(function(err){
        console.log("application submission failed, err:",err);
        res.status(400).send("application submission failed");  
      })
    }
  });

	//router.use(function(req,res,next) {
		//check to see if applicant
		//if applicant res.next()
		// }
    //next();
		// res.redirect('/job')
	//});

	//routes:
  //router.get('/appsbyuser', function(req, res) {
  //  console.log("applicant:appsbyuser:responding with appsbyuser data");
  //  res.status(200).send("applicant:appsbyuser");
    /*
    console.log('---received appsbyuser GET, query='+JSON.stringify(req.query));
    var rq = req.query;

    */
  //});


	//catch all
	router.get('/*', function(req, res) { 
		res.redirect('/job')
	});
  router.post('/*', function(req, res) {
    res.redirect('/job')
  });
}