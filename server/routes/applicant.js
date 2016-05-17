var Applications = require('../models/Applications.js');
var Stats = require('../models/Stats.js');
var Users = require('../models/Users.js');
var Notifications = require('../models/Notifications.js');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest: 'ploads'});

module.exports = function(router) {
  var app = express();
  app.use(bodyParser.json()); // support json encoded bodies

  router.use(function(req,res,next) {
    if (req.user !== undefined){
      var linkedin_id = req.user.linkedin_id
      return Users.verifyEmployer(linkedin_id)
      .catch(function(err) {
        console.log('Failed to verify user as applicant:', err)
        res.redirect('/employer')
      })
      .then(function(resp) {
        if (resp){
          console.log('User is not an applicant.')
          res.redirect('/employer')
        } else {
          return next()
        }
      })
      .catch(function(err) {
        console.log('Applicant authentication failed: ', err)
        res.redirect('/employer')
      }) 
    } else {
      console.log('User not logged in')
      res.redirect('/')
    }
  });

  router.get('/appsbyuser', function(req, res){
    var rq = req.query;
    if (rq && rq.userID) {
      Applications.getAppsByUser(rq.userID)
      .then(function(data){
        //Returning application data
        res.status(200).send(JSON.stringify(data));
      })
      .catch(function(err){
        console.log("could not get application data for userID "+rq.userID+", err:", err);
        res.status(404).send(err);
      })
    } else {
      console.log("Must supply userID in query string");
      res.status(400).send("must supply userID in query string");       
    }
  }); 

  router.get('/currentuserapps', function(req, res){
    var linkedin_id = req.user.linkedin_id
    return Users.verifyId(linkedin_id)
    .then(function(data){
    return Applications.getAppsByUser(data.userID)
    })
    .then(function(apps) {
    //Responding with applications for current user
    res.status(200).send(apps);
    })
    .catch(function(err){
    console.log("No applications retrieved for current user: ", err);
    res.status(400).send(err);
    })
  });

  router.get('/currentuserapps/:status', function(req, res){
    var linkedin_id = req.user.linkedin_id
    return Users.verifyId(linkedin_id)
    .then(function(data){
    return Applications.getAppsByUserAndStatus(data.userID, req.params.status)
    })
    .then(function(apps) {
    //Responding with applications for current user
    res.status(200).send(apps);
    })
    .catch(function(err){
    console.log("No applications retrieved for current user: ", err);
    res.status(400).send(err);
    })
  });

  router.post('/submitapp', function(req, res) {
    if(! req || !req.body) {
      console.log("Error: Expected req.body");
      res.status(400).send("/submitapp expected a body object");
    } else {
      var linkedin_id = req.user.linkedin_id
      return Users.verifyId(linkedin_id)
      .then(function(userInfo) {
        req.body.skills_met = JSON.stringify(req.body.skills_met)
        req.body.user_id = userInfo.userID
        req.body.skills_met = JSON.stringify(req.body.skills_met)
        Applications.submit(req.body)
        .then(function(data){
          res.status(200).send(data);
          console.log("Application successfully submitted")
          Stats.incrementTotalApps(req.body.user_id)
          .then(function() {
            console.log("Total apps increment successful")  
          })
          .catch(function() {
            console.log("Total apps increment failed")
          })  
        })
        .catch(function(err){
          console.log("Application submission failed, err:", err);
          res.status(400).send("Application submission and/or increment failed");  
        }) 
      })
    }
  });

  router.delete('/clearnotification', function(req, res) {
    var rq = req.query;
    if (rq && rq.notifyID) {
      Notifications.deleteNotification(rq.notifyID) 
      .then(function(data){
        res.status(200).send(JSON.stringify(data));
        //Successfully deleted notification
      })
      .catch(function(err){
        console.log("Failed to remove notification "+rq.notify+", err:", err);
        res.status(400).send(err);
      })
    } else {
      console.log("Must supply notifyID in query string"); 
      res.status(400).send("Must supply notifyID in query string");       
    }
  });

  router.delete('/rescindapp', function(req, res){
    var rq = req.query;
    if (rq && rq.appID) {
      Applications.deleteApp(rq.appID)
      .then(function(data){
        res.status(200).send(JSON.stringify(data));
        //Successfully rescinded application
        return Stats.incrementRescinded(data.user_id)
        .then(function() {
          console.log('App rescinded stat successfully incremented');
        })
        .catch(function() {
          console.log('App rescinded stat failed to increment');
        });
      })
      .catch(function(err){
        console.log("Could not get application data for appID "+rq.appID+", err:", err);
        res.status(404).send(err);
      });
    } else {
      console.log("Must supply appID in query string");
      res.status(400).send("Must supply appID in query string");
    }
  });

  //Notifications:

  router.get('/notifications', function(req, res){
    var linkedin_id = req.user.linkedin_id
    return Users.verifyId(linkedin_id)
    .then(function(data){
    return Notifications.getNotifications(data.userID)
    })
    .then(function(notes) {
    //Responding with notifications for current user
    res.status(200).send(notes);
    })
    .catch(function(err){
    console.log("No notifications retrieved for current user: ", err);
    res.end();
    })
  });

  //Resume and cover letter upload:

  router.post('/uploadcoverletter', upload.single('coverletter'), function(req, res, next){
    res.status(200).send(req.file.filename);
  });

  router.post('/uploadresume', upload.single('resume'), function(req, res, next){
    res.status(200).send(req.file.filename);
  });

	//catch all
	router.get('/*', function(req, res) { 
		res.redirect('/job')
	});
  router.post('/*', function(req, res) {
    res.redirect('/job')
  });
}