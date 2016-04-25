var db = require('../db/db.js');
var Promise = require('bluebird');

var Users = module.exports;


Users.checkId = function(obj) {
  return db('users').where({
    username: obj.username,
    linkedin_id: obj.id
  }).limit(1);
};

Users.create = function(incomingAttrs) {
  var attrs = Object.assign({}, incomingAttrs);

  return db('users').insert(attrs)
    .then(function(result) {
      // Prepare new user for outside world
      return result[0];
    });
};

Users.grabID = function(passID) {
  return db('users').select('*').where({
    linkedin_id: passID
  }).then(function(row) {
    console.log('row here = ', row);
    return row;
  });
};

Users.verify = function(username) {
  return db('users').where({
      username: username
    }).limit(1)
    .then(function(rows) {
      return rows[0];
    });
};

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
  }).then(function(data) {
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
