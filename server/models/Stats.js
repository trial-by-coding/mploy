var db = require('../db/db.js');

var Stats = module.exports;

//only run when new user created
Stats.newUserData = function(userID) {
	return db('stats')
		.returning('statID')
		.insert({
			total_apps: 0,
			denied: 0,
			considered: 0,
			interview_offer: 0,
			user_id: userID
		})
}

Stats.incrementTotalApps = function(userID) {
	return db('stats')
		.where({user_id: userID})
		.increment('total_apps', 1)
};

Stats.incrementDenied = function(userID) {
	return db('stats')
		.where({user_id: userID})
		.increment('denied', 1)
};

Stats.incrementConsidered = function(userID) {
	return db('stats')
		.where({user_id: userID})
		.increment('considered', 1)
};

Stats.incrementInterview = function(userID) {
	return db('stats')
		.where({user_id: userID})
		.increment('interview_offer', 1)
};