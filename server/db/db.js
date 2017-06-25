var config      = require('../../knexfile.js');  
var env         = process.env.NODE_ENV || 'development';  
var db        	= require('knex')(config[env]);

// Export the db object, which will be able to make database connections
module.exports = db

