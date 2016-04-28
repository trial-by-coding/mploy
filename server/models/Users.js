var db = require('../db/db.js');

var Users = module.exports;

//Auth:

Users.verifyId = function(linkedin_id) {
  return db('users')
  .where({
    linkedin_id: linkedin_id
  })
  .limit(1)
  .then(function(record) {
    return record[0]
  })
};

Users.insert = function(obj) {
  var userObj = {};

  userObj.linkedin_id = obj.id;
  userObj.username = obj.displayName;
  userObj.firstName = obj.name.givenName;
  userObj.lastName = obj.name.familyName;
  if (obj._json.pictureUrls.values){
    userObj.profile_picture = obj._json.pictureUrls.values[0]; 
  } else {
    userObj.profile_picture = 'https://5481cf3ac956b3637572-6a158f98e8017b9014d6ed26285e201d.ssl.cf2.rackcdn.com/static/images/anonymousUser.jpg'
  }
  userObj.email = obj._json.emailAddress;
  userObj.industry = obj._json.industry;
  userObj.headline = obj._json.headline;
  userObj.location = obj._json.location.name;
  userObj.profileUrl = obj._json.publicProfileUrl;

  return db('users')
  .returning('*')
  .insert({
    
    linkedin_id: userObj.linkedin_id,
    username: userObj.username,
    firstname: userObj.firstName,
    lastname: userObj.lastName,
    profile_picture: userObj.profile_picture,
    email: userObj.email,
    industry: userObj.industry,
    linkedin_headline: userObj.headline,
    location: userObj.location,
    linkedin_url: userObj.profileUrl,
    employer: false
  })
  .then(function(record) {
    return record[0]
  })
};

//Resume handling:

//Is this proper syntax? Where before returning?
//put request? are we updating a null value to a file?
Users.insertResume = function(uid, resume) {
  return db('users')
    .where({ userID: uid })
    .returning('userID')
    .insert({ resume: resume })
    .then(function(userID) {
      console.log('Record for userID', uid);
      return userID;
    })
    .catch(function(err) {
      throw err
    });
};

//put request?
Users.updateResume = function(uid, newResume) {
  return db('users')
    .where({ userID: uid })
    .returning('userID')
    .update({ resume: newResume })
    .then(function(userID) {
      console.log('Record for userID', uid);
      return userID;
    })
    .catch(function(err) {
      throw err
    });
};

//Employer

Users.designateAsEmployer = function(linkedin_id){
  return db('users')
  .returning('*')
  .where({
    linkedin_id: linkedin_id
  })
  .update({
    employer: true
  })
  .then(function(record) {
    return record[0]
  })
  .catch(function(err) {
    throw err
  })
};

Users.verifyEmployer = function(linkedin_id){
  return db('users')
  .returning('*')
  .where({
    linkedin_id: linkedin_id,
    employer: true
  })
  .then(function(record) {
    return record[0];
  })
  .catch(function(err) {
    throw err;
  })
};

//on page load front end should hit User.verifyID to get all data for current user /verifyuser
//pass user ID to jobJoin endpoint

Users.jobJoin = function(userID) {
  console.log('in Users.jobJoin: ')
  return db('job_posts')
  .join('applications', 'job_id', '=', 'applications.job_id')
  .join('users', '')
  // .join('users', 'job_posts.jobID', '=', 'applications.job_id')
  // .join('users', 'applications.user_id', '=', 'users.userID')
  .where({
    user_id: userID
  })
  .then(function(multijoin) {
    console.log('multijoin: ', multijoin)
    return multijoin
  })
};







