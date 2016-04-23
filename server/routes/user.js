var express = require('express');
var bodyParser = require('body-parser')
var Employers = require('../models/Employers.js')

// app.use(bodyParser.json());

module.exports = function(router) {

var applicant = express.Router();
require('./applicant.js')(applicant);
router.use('/applicant', applicant)

var employer = express.Router();
require('./employer.js')(employer);
router.use('/employer', employer)

	// router.use(function(req,res,next) {
	// 	//check if logged in
	// 	if (req.isAuthenticated()){
	// 		return next()
	// 	}

	// 	res.redirect('/login')
	// });

	router.post('/newemployer', function(req, res) {
    // console.log('req: ', req)
    return Employers.insert(req.body.id)
    .then(function(resp) {
      console.log('User ID added: ', resp)
      res.send(resp)
    })
    .catch(function(err) {
      console.log('post Error: ', err)
      res.send(err)
    })
		
	});


  router.get('/job', function(req, res) {
    res.send('Default')
  });

	router.get('/job/:id', function(req, res) {
		
	});

	router.get('*', function(req, res) {
		res.redirect('/user/job')
	});

}