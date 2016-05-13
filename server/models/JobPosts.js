var db = require('../db/db.js');

var JobPosts = module.exports;

//would skills table have to be created before job post?
JobPosts.create = function(jobObj) {
    
    return db('job_posts').returning('jobID')
    .returning('*')
    .insert({
      company_name: jobObj.company_name,
      job_title: jobObj.job_title,
      job_description: jobObj.job_description,
      desired_education: jobObj.desired_education,
      min_salary: jobObj.min_salary,
      max_salary: jobObj.max_salary,
      location: jobObj.location,
      employment_type: jobObj.employment_type,
      visa_required: jobObj.visa_required,
      skills: jobObj.skills,
      user_id: jobObj.user_id
    })
    .then(function(record) {
      return record[0]
    })
    .catch(function(err) {
      throw err
    })
};

JobPosts.getAll = function() {
    
    return db('job_posts')
    .join('users', 'job_posts.user_id', '=', 'users.userID')
    .select('job_posts.*', 'users.profile_picture')
    .then(function(records) {
      console.log('job records: ', records)
      return records
    })
    .catch(function(err) {
      throw err
    })
};

JobPosts.deleteJob = function(jobID) {
    
    return db('job_posts')
    .del()
    .where({jobID: jobID})
    .then(function(record) {
      return record[0]
    })
    .catch(function(err) {
      throw err
    })
};

JobPosts.getJob = function(jobID) {
    
    return db('job_posts')
    .where({jobID: jobID})
    .then(function(record) {
      if (record.length === 0){
        err="no records with that jobID found";
        throw err;
      }
      return record
    })
    .catch(function(err) {
      throw err
    })
};


JobPosts.getJobsByUser = function(userID) {
    
    return db('job_posts')
    .where('user_id', userID)
    .then(function(record) {
      if (record.length === 0){
        err="no records with that jobID found";
        throw err;
      }
      return record
    })
    .catch(function(err) {
      throw err
    })
};
