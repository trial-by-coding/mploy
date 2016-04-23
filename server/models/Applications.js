var db = require('../db/db.js');

var Applications = module.exports;

//Will cover letter have to be added separately?
Applications.submit = function(appObj) {
	return db('job_posts').returning('appID')
	.insert({
		cover_letter: appObj.cover_letter,
		years_experience: appObj.years_experience,
		desired_education: appObj.desired_education,
		personal_statement: appObj.personal_statement,
		status: appObj.status,
		skill_1_met: appObj.skill_1,
	  skill_2_met: appObj.skill_2,
	  skill_3_met: appObj.skill_3,
	  skill_4_met: appObj.skill_4,
	  skill_5_met: appObj.skill_5,
	  skill_6_met: appObj.skill_6,
	  skill_7_met: appObj.skill_7,
	  skill_8_met: appObj.skill_8,
	  skill_9_met: appObj.skill_9,
	  skill_10_met: appObj.skill_10,
	  job_id: appObj.job_id
	})
	.then(function(recordID) {
		console.log('Applications.submit recordID', recordID)
		return recordID
	})
	.catch(function(err) {
		console.log('Applications.submit Error: ', err)
	})
};

Applications.getAll = function() {
	
	return db('applications').select()
	.then(function(records) {
		console.log('All Application records: ', records)
		return records
	})
	.catch(function(err) {
		console.log('Applications.getAll Error: ', err)
	})
};

Applications.getAppsByUser = function(userID) {
	
	return db('applications').where('user_id', userID)
	.then(function(records) {
		console.log('AppsByUser record: ', record)
		return record
	})
	.catch(function(err) {
		console.log('AppsByUser Error: ', err)
	})
};

Applications.getAppsByJob = function(jobID) {
	
	return db('applications').where('job_id', jobID)
	.then(function(records) {
		console.log('AppsByJob record: ', record)
		return record
	})
	.catch(function(err) {
		console.log('AppsByUser Error: ', err)
	})
};