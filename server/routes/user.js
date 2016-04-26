var express = require('express');
var JobPosts = require('../models/JobPosts.js')
var Employers = require('../models/Employers.js')

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
			'User is authenticated'
			return next()
		}
		res.redirect('/')
	});


	router.get('/job', function(req, res) {
		console.log('req stuff: ', req._passport.session.user)
		console.log("user:job:request for all job data");
		JobPosts.getAll()
		.then(function(data){
			console.log("responding with all job data:",data);
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
		res.redirect('/user/jobs');
	});

	router.get('/*', function(req, res) {
		console.log("user:default:redirecting to job");
		res.redirect('/user/jobs');
	});

	router.post('/newemployer', function(req, res) {
		console.log("newemployer:body:",req.body);
		Employers.insert(req.body.userID)
		.then(function(data){
			console.log("newemployer:insert successful");
			res.status(200).send("success!");
		})
		.catch(function(err){
			console.log("newemployer:insert failed, err:",err);
			res.status(400).send(err);
		})
	});

}