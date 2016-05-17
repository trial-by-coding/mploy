var JobPosts = require('../models/JobPosts.js');
var Applications = require('../models/Applications.js');
var Users = require('../models/Users.js');
var Notifications = require('../models/Notifications.js');
var Stats = require('../models/Stats.js');
var express = require('express');
var bodyParser = require('body-parser');


module.exports = function(router) {
  var app = express();
  app.use(bodyParser.json()); // support json encoded bodies

  router.use(function(req,res,next) {
    if (req.user !== undefined){
      var linkedin_id = req.user.linkedin_id
      return Users.verifyEmployer(linkedin_id)
      .catch(function(err) {
        console.log('Failed to verify user as employer:', err)
        res.redirect('/applicant')
      })
      .then(function(resp) {
        if (resp){
          return next()
        } else {
          console.log('User is not an employer.')
          res.redirect('/applicant')
        }
      })
      .catch(function(err) {
        console.log('Employer authentication failed: ', err)
        res.redirect('/applicant')
      })
    } else {
      console.log('User not logged in')
      res.redirect('/')
    }
  });

  router.get('/appsbystatus', function(req, res){
    var rq = req.query;
    if (rq && rq.jobID && rq.status) {
      Applications.getByStatus(rq.jobID, rq.status)
      .then(function(data){
        res.status(200).send(JSON.stringify(data));
      })
      .catch(function(err){
        console.log("Could not get application data for jobID "+rq.jobID+", err:", err);
        res.status(404).send(err);
      });
    } else {
      console.log("Must supply jobID in query string");
      res.status(400).send("must supply jobID in query string");
    }
  });

  router.get('/appsbyjob', function(req, res){
    var rq = req.query;
    if (rq && rq.jobID) {
      Applications.getAppsByJob(rq.jobID)
      .then(function(data){
        //Responding with application data
        res.status(200).send(JSON.stringify(data));
      })
      .catch(function(err){
        console.log("Could not get application data for jobID "+rq.jobID+", err:", err);
        res.status(404).send(err);
      });
    } else {
      console.log("Must supply jobID in query string");
      res.status(400).send("must supply jobID in query string");
    }
  });

  router.get('/appsandapplicants', function(req, res) {
    var rq = req.query;
    if (rq && rq.jobID) {
      Applications.appsAndApplicants(rq.jobID)
      .then(function(data){
        //Responding with application data
        res.status(200).send(JSON.stringify(data));
      })
      .catch(function(err){
        console.log("Could not get application data for jobID "+rq.jobID+", err:", err);
        res.status(404).send(err);
      });
    } else {
      console.log("Must supply jobID in query string");
      res.status(400).send("must supply jobID in query string");
    }
  });

  router.get('/jobscreated', function(req, res) {
    var linkedin_id = req.user.linkedin_id;
    return Users.verifyId(linkedin_id)
    .then(function(data){
    return JobPosts.getJobsByUser(data.userID);
    })
    .then(function(jobs) {
    //Responding with job posts for current user
    res.status(200).send(jobs);
    })
    .catch(function(err){
    console.log("No job posts retrieved for current user: ", err);
    res.status(404).send(err);
    });
  });
  
//Get job info by job ID
router.get('/jobinfo', function(req, res){
    var rq = req.query;
    if (rq && rq.jobID) {
      JobPosts.getJob(rq.jobID)
      .then(function(data){
        //Responding with job info
        res.status(200).send(JSON.stringify(data));
      })
      .catch(function(err){
        console.log("Could not get job data for jobID "+rq.jobID+", err:", err);
        res.status(400).send(err);
      });
    } else {
      console.log("Must supply jobID in query string");
      res.status(400).send("must supply jobID in query string");
    }
  });



//Should we keep stats on number of jobs posted?
  router.post('/submitjob', function(req, res) {
    if(! req || !req.body) {
      console.log("Error: submitjob POST with no body");
      res.status(400).send("/submitjob expected a body object");
    } else {
      var linkedin_id = req.user.linkedin_id;
      return Users.verifyId(linkedin_id)
      .then(function(userInfo) {
      req.body.user_id = userInfo.userID;
      req.body.skills = JSON.stringify(req.body.skills);
      return JobPosts.create(req.body);
      })
      .then(function(data){
        //Job post successfully submitted
        res.status(200).send(data);
      })
      .catch(function(err){
        console.log("Job post submission failed, err:",err);
        res.status(400).send("job post submission failed:",err);
      });
    }
  });

  router.put('/advancestatus', function(req, res){
    if(! req || !req.body) {
      console.log("Error: advancestatus PUT with no body");
      res.status(400).send("/advancestatus expected a body object");
    } else {
      var appID = req.body.appID;
      var linkedin_id = req.user.linkedin_id;
      var status;
      var user_id;
      return Applications.advanceStatus(appID)
      .then(function(data){
        //Application status updated
        if (data.status){
          status = data.status;
          user_id = data.user_id;
          return Notifications.createNotification(appID, user_id, status)
          .then(function(notification) {
            //Notification created
            return Stats.advanceIncrement(user_id, status);
          })
          .then(function(stat) {
            res.status(200).send("Successfully advanced application!");
          })
        } else {
          //Application deleted
          res.status(200).send("Successfully removed offered application.");
        }
      })
      .catch(function(err){
        console.log("Application advance failed, err: ", err);
        res.status(400).send("Application advance failed: ", err);
      });
    }
  });

  router.put('/revertstatus', function(req, res){
    if(! req || !req.body) {
      console.log("Error: revertstatus PUT with no body");
      res.status(400).send("/revertstatus expected a body object");
    } else {
      var appID = req.body.appID;
      var linkedin_id = req.user.linkedin_id;
      var status;
      var user_id;
      return Applications.revertStatus(appID)
      .then(function(data){
        //Application status successfully reverted
        if (data.status){
          status = data.status;
          user_id = data.user_id;
          return Notifications.createNotification(appID, user_id, status)
          .then(function(notification) {
            //Notification created
            return Stats.revertIncrement(user_id, status);
          })
          .then(function(stat) {
            //Stats revised
            res.status(200).send("Successfully reverted application stats");
          })
        }
      })
      .catch(function(err){
        console.log("Application revert failed, err:",err);
        res.status(400).send("Application revert failed:",err);
      });
    }
  });

  //increment denied in stats for user who created app
  router.delete('/deleteapp', function(req, res){
    var rq = req.query;
    if (rq && rq.appID) {
      Applications.deleteApp(rq.appID)
      .then(function(data){
        res.status(200).send(JSON.stringify(data));
        //Successfully deleted application
        return Stats.incrementDenied(data.user_id)
        .then(function() {
          console.log('App denied stat successfully incremented');
        })
        .catch(function() {
          console.log('App denied stat failed to increment');
        });
      })
      .catch(function(err){
        console.log("Could not get application data for appID "+rq.appID+", err:", err);
        res.status(400).send(err);
      });
    } else {
      console.log("Must supply appID in query string");
      res.status(400).send("Must supply appID in query string");
    }
  });

  //Delete all applications for this job post, should notify users that position is no longer open
  router.delete('/deletejob', function(req, res){
    var rq = req.query;
    if (rq && rq.jobID) {
      JobPosts.deleteJob(rq.jobID)
      .then(function(data){
        res.status(200).send(JSON.stringify(data));
        //Successfully deleted job post
      })
      .catch(function(err){
        console.log("Could not get job post data for jobID "+rq.jobID+", err:", err);
        res.status(404).send(err);
      });
    } else {
      console.log("Must supply jobID in query string");
      res.status(404).send("Must supply jobID in query string");
    }
  });

	//Catch all
	router.get('/*', function(req, res) {
		res.redirect('/job');
	});

};
