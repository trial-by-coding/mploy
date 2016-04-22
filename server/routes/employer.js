module.exports = function(router) {

	router.use(function(req,res,next) {
		//check to see if employer
		//if employer res.next()
		// }

		// res.redirect('/job')
	});

	//routes:


	//catch all
	router.get('/*', function(req, res) {
		res.redirect('/job')
	});

}