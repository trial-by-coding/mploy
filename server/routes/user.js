module.exports = function(router) {

var applicant = express.Router();
require = ('./server/routes/applicant.js')(applicant);
app.use('/applicant', applicant)

var employer = express.Router();
require = ('./server/routes/employer.js')(employer);
app.use('/employer', employer)

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