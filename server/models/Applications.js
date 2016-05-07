var db = require('../db/db.js');

var Applications = module.exports;

//Will cover letter have to be added separately?
Applications.submit = function(appObj) {
  return db('applications')
  .returning('appID')
  .insert({
    cover_letter: appObj.cover_letter,
    resume: appObj.resume,
    years_experience: appObj.years_experience,
    education: appObj.education,
    personal_statement: appObj.personal_statement,
    status: 'unconsidered',
    skills_met: appObj.skills_met,
    job_id: appObj.job_id,
    user_id: appObj.user_id,
    can_work_here: appObj.can_work_here
  })
  .then(function(recordID) {
    return recordID[0]
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
  .returning('*')
  .delete()
  .where('appID', appID)
  .then(function(records) {
    return records[0]
  })
  .catch(function(err) {
      throw err
  })
};


//Updates application's previous status to next status
Applications.advanceStatus = function(appID) {
  
  return db('applications')
  .returning('*')
  .where({
    appID: appID
  })
  .then(function(record) {
    console.log('record[0].status in advance status: ', record[0].status)
    switch(record[0].status){
      case 'unconsidered': 

      return db('applications')
      .returning('*')
      .where({
        appID: appID
      })
      .update({
        status: 'considered'
      })
      case 'considered':

      return db('applications')
      .returning('*')
      .where({
        appID: appID
      })
      .update({
        status: 'interviews'
      })
      case 'interviews':

      return db('applications')
      .returning('*')
      .where({
        appID: appID
      })
      .update({
        status: 'offers'
      })
      case 'offers':

      return db('applications')
      .returning('appID')
      .del()
      .where({
        appID: appID
      })
      default:
      console.log('Unexpected record status: ', record.status)
      return 'Unexpected record status: ', record.status
    }
  })
  .then(function(result) {
    console.log('Status advance successful: ', result)
    return result[0]
  })
  .catch(function(err) {
    throw err
  })
};

Applications.revertStatus = function(appID) {
  
  return db('applications')
  .returning('*')
  .where({
    appID: appID
  })
  .then(function(record) {
    console.log('record[0].status in revert status: ', record[0].status)
    switch(record[0].status){
      
      case 'unconsidered': 
      return 'Error! Unconsidered records cannot be reverted.'
      
      case 'considered':
      return db('applications')
      .returning('*')
      .where({
        appID: appID
      })
      .update({
        status: 'unconsidered'
      })

      case 'interviews':
      return db('applications')
      .returning('*')
      .where({
        appID: appID
      })
      .update({
        status: 'considered'
      })

      case 'offers':
      return db('applications')
      .returning('*')
      .where({
        appID: appID
      })
      .update({
        status: 'interviews'
      })

      default:
      console.log('Unexpected record status: ', record.status)
      return 'Unexpected record status: ', record.status
    }   
  })
  .then(function(result) {
    console.log('Status revert successful.', result[0])
    return result[0]
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
    return record[0]
  })
  .catch(function(err) {
      throw err
  })
};

Applications.getByStatus = function(jobID, status) {
  console.log('in get by status: ', status)
  return db('applications')
  .join('users', 'applications.user_id', '=', 'users.userID')
  .orderBy('created_at', 'desc')
  .where({
    job_id: jobID, 
    status: status
  })
  .then(function(records) {
    return records
  })
  .catch(function(err) {
      throw err
  })
};

Applications.appsAndApplicants = function(jobID) {
  return db('applications')
  .join('users', 'user_id', '=', 'users.userID' )
  .where({
    job_id: jobID
  })
  .then(function(data) {
    return data
  })
};

Applications.getUnconsidered = function(jobID) {
  
  return db('applications')
  .orderBy('created_at', 'desc')
  .where({
    job_id: jobID, 
    status: 'unconsidered'
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

// knex('projects').select(['projects.id', 'projects.project_number', 'projects.project_name', 'projects.start_date', 'projects.end_date',
//     'owners.name', 'owners.email_addr as owner_email_addr',
//     'clients.company', 'clients.email_addr as client_email_addr', 'clients.first_name', 'clients.last_name'])
// .innerJoin('owners', 'owners.id', 'projects.owner_id')
// .innerJoin('clients', 'clients.id', 'projects.client_id');

Applications.getAppsByUserAndStatus = function(userID, status) {
  console.log('userId+status: ', userID, status)
  
  return db('applications')
  .join('job_posts', 'applications.job_id', '=', 'job_posts.jobID')
  .select(['job_posts.user_id as job_user_id', 'job_posts.*', 'job_posts.created_at as job_created_at','applications.user_id as app_user_id', 'applications.created_at as app_created_at', 'applications.cover_letter','applications.resume','applications.years_experience', 'applications.education', 'applications.personal_statement', 'applications.status', 'applications.skills_met', 'applications.can_work_here', 'users.*'])
  .join('users', 'applications.user_id', '=', 'users.userID')
  .then(function(records) {
    return records.filter(function(item) {return item.app_user_id === userID && item.status === status})
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