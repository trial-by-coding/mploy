var express = require('express');

module.exports = function(router) {

var applicant = express.Router();
require('./applicant.js')(applicant, express);
router.use('/applicant', applicant)

var employer = express.Router();
require('./employer.js')(employer);
router.use('/employer', employer)

	router.use(function(req,res,next) {
		//check if logged in
		if (req.isAuthenticated()){
			return next()
		}

		res.redirect('/login')
	});

	router.get('/newemployer', function(req, res) {
		
	});

	router.get('/job', function(req, res) {
		
	});

	router.get('/job/:id', function(req, res) {
		
	});

	router.get('/*', function(req, res) {
		res.redirect('/job')
	});

}