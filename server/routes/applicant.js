var express = require('express');

module.exports = function(router) {

	// router.use(function(req,res,next) {
		//check to see if applicant
		//if applicant res.next()
		// }

		// res.redirect('/job')
	// });

	//routes:
	router.get('/test', function(req, res) {
		console.log('in applicant test')
		res.send('applicant level')
	});

	//catch all
	router.get('*', function(req, res) {
		res.redirect('/job')
	});

}