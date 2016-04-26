var db = require('../db/db.js');

var Users = module.exports;

//Auth:

Users.verifyId = function(id) {
  console.log('verifyId id == ', id);
  return db('users').where({
    linkedin_id: id
  }).limit(1);
};

Users.verifyInsert = function(obj) {
  var session = {};
  console.log('verifyInsert obj:', obj)

  session.passid = obj.id;
  session.username = obj.displayName;
  session.givenName = obj.name.givenName;
  session.familyName = obj.name.familyName;
  session.profile_picture = obj._json.pictureUrls.values[0];
  session.email = obj._json.emailAddress;
  session.industry = obj._json.industry;
  session.headline = obj._json.headline;
  session.location = obj._json.location.name;
  session.profileUrl = obj._json.publicProfileUrl;

  return db('users').where({
    linkedin_id: session.passid
  })

  .then(function(data) {
    if (data.length === 0) {
      return db('users').insert({
        
        linkedin_id: session.passid,
        username: session.username,
        firstname: session.givenName,
        lastname: session.familyName,
        profile_picture: session.profile_picture,
        email: session.email,
        industry: session.industry,
        linkedin_headline: session.headline,
        location: session.location,
        linkedin_url: session.profileUrl

      }).limit(1).then(function(array) {
        console.log('returning sessions!', session);
        return session;
      });
    } else {
      console.log('data = ', data);
      if (Array.isArray(data)) {
        return data[0];
      } else {
        return data;
      }
    }
  });
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
