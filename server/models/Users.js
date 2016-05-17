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
    return record[0];
  });
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
    userObj.profile_picture = 'https://5481cf3ac956b3637572-6a158f98e8017b9014d6ed26285e201d.ssl.cf2.rackcdn.com/static/images/anonymousUser.jpg';
  }
  userObj.email = obj._json.emailAddress;
  userObj.industry = obj._json.industry;
  userObj.headline = obj._json.headline;
  userObj.location = obj._json.location.name;
  userObj.profileUrl = obj._json.siteStandardProfileRequest.url;

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
    return record[0];
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
    return record[0];
  })
  .catch(function(err) {
    throw err;
  });
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
  });
};

//Applicant

Users.designateAsApplicant = function(linkedin_id){
  return db('users')
  .returning('*')
  .where({
    linkedin_id: linkedin_id
  })
  .update({
    employer: false
  })
  .then(function(record) {
    return record[0];
  })
  .catch(function(err) {
    throw err;
  });
};

Users.verifyApplicant = function(linkedin_id){
  return db('users')
  .returning('*')
  .where({
    linkedin_id: linkedin_id,
    employer: false
  })
  .then(function(record) {
    return record[0];
  })
  .catch(function(err) {
    throw err;
  });
};
