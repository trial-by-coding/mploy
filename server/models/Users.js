var db = require('../db/db.js');

var Users = module.exports;

Users.create = function(incomingAttrs) {
  var attrs = Object.assign({}, incomingAttrs);

  return db('users').insert(attrs)
    .then(function(result) {
      return result[0];
    })
    .catch(function(err) {
      console.log('create user error: ', err);
    });
};

Users.grabID = function(passID) {
  return db('users').select('*').where({
      linkedin_id: passID
    })
    .then(function(record) {
      console.log('Record for passID', record);
      return record;
    })
    .catch(function(err) {
      console.log('Users.grabID error: ', err);
    });
};

Users.verify = function(id) {
  return db('users')
    .where({
      linkedin_id: id
    }).limit(1)
    .then(function(record) {
      console.log('Verified user record', record);
      return record;
    })
    .catch(function(err) {
      console.log('Users.verify error: ', err);
    });
};

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
      console.log('Users.insertResume error: ', err);
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
      return userID
    })
    .catch(function(err) {
      console.log('Users.insertResume error: ', err)
    })
};
