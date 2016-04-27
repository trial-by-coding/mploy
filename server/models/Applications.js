var db = require('../db/db.js');

var Applications = module.exports;

//Will cover letter have to be added separately?
Applications.submit = function(appObj) {
  return db('applications').returning('appID')
  .insert({
    cover_letter: appObj.cover_letter,
    years_experience: appObj.years_experience,
    education: appObj.education,
    personal_statement: appObj.personal_statement,
    status: 'Not yet considered',
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
    job_id: appObj.job_id,
    user_id: appObj.user_id
  })
  .then(function(recordID) {
    return recordID
  })
  .catch(function(err) {
    throw err
  })
};

//delete old unconsidered records
//denied this will delete the app and should run after the stats method
//check current date, if longer than 5 days ago, delete

Applications.deleteApp = function(appID) {
  
  return db('applications')
  .delete()
  .where('appID', appID)
  .then(function(records) {
    return records
  })
  .catch(function(err) {
      throw err
  })
};

//update status
Applications.updateStatus = function(appID, status) {
  
  return db('applications')
  .returning()
  .where({
    appID: appID
  })
  .update({
    status: status
  })
  .then(function(record) {
    return record
  })
  .catch(function(err) {
      throw err
  })
};

Applications.getUnconsidered = function(jobID) {
  
  return db('applications')
  .orderBy('created_at', 'desc')
  .where({
    job_id: jobID, 
    status: 'Not yet considered'
  })
  .then(function(records) {
    return records
  })
  .catch(function(err) {
      throw err
  })
};

Applications.getAppsByUser = function(userID) {
  
  return db('applications')
  .where({
    'user_id': userID
  })
  .then(function(records) {
    return records
  })
  .catch(function(err) {
      throw err
  })
};

Applications.getAppsByJob = function(jobID) {
  
  return db('applications').where('job_id', jobID)
  .then(function(records) {
    if (records.length === 0){
      console.log("Applications:getAppsByJob:no records returned");
      throw ("no records found");
    }
    return records
  })
  .catch(function(err) {
      throw err
  })
};