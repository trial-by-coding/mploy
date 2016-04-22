var db = require('../db/db.js');

var JobPosts = module.exports;

//would skills table have to be created before job post?
JobPosts.create = function(jobObj) {
	
	return db('job_posts').returning('jobID')
	.insert({
		company_name: jobObj.company_name,
		job_description: jobObj.job_description,
		desired_education: jobObj.desired_education,
		min_salary: jobObj.min_salary,
		max_salary: jobObj.max_salary,
		location: jobObj.location,
		employment_type: jobObj.employment_type,
		visa_required: jobObj.visa_required,
		skill_1: jobObj.skill_1,
		skill_2: jobObj.skill_2,
	  skill_3: jobObj.skill_3,
	  skill_4: jobObj.skill_4,
	  skill_5: jobObj.skill_5,
	  skill_6: jobObj.skill_6,
	  skill_7: jobObj.skill_7,
	  skill_8: jobObj.skill_8,
	  skill_9: jobObj.skill_9,
	  skill_10: jobObj.skill_10,
		user_id: jobObj.user_id
	})
	.then(function(recordID) {
		console.log('Job recordID: ', recordID)
		return recordID
	})
	.catch(function(err) {
		console.log('Create Job Error: ', err)
	})
};

JobPosts.getAll = function() {
	
	return db('job_posts').select()
	.then(function(records) {
		console.log('Job records: ', records)
		return records
	})
	.catch(function(err) {
		console.log('getAll Jobs Error: ', err)
	})
};

JobPosts.getJob = function(jobID) {
	
	return db('job_posts').where('jobID', jobID)
	.then(function(record) {
		console.log('Job record: ', record)
		return record
	})
	.catch(function(err) {
		console.log('getJob Error: ', err)
	})
};

