module.exports = function(router) {

	router.use(function(req,res,next) {
		//check if logged in
		//something like if (req.isAuthenticated())
		//if logged in, return next()

		//else redirect to login
	})

	router.get('/*', function(req, res) {
		res.redirect('/joblistings')
	})

}