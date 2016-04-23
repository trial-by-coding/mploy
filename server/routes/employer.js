var express = require('express');

module.exports = function(router) {

	// router.use(function(req,res,next) {
		//check to see if employer
		//if employer res.next()
		// }

		// res.redirect('/job')
	// });

	//routes:


	//catch all

	router.get('/test', function(req, res) {
		console.log('in employer test')
		res.send('employer level')
	});

	router.get('*', function(req, res) {
		res.redirect('/job')
	});

}