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
  console.log('obj.name: ', obj.name)
  session.passid = obj.id;
  session.username = obj.displayName;
  session.givenName = obj.name.givenName;
  session.familyName = obj.name.familyName;


  return db('users').where({
    linkedin_id: session.passid
  }).then(function(data) {
    if (data.length === 0) {
      console.log('firstname: ', session.firstName)
      return db('users').insert({
        linkedin_id: session.passid,
        username: session.username,
        firstname: session.givenName,
        lastname: session.familyName
        // profile_picture: session.profile_picture
      }).limit(1).then(function(array) {
        console.log('returning sessions!', session);
        return session;
      });
    } else {
      console.log('datas = ', data);
      if (Array.isArray(data)) {
        return data[0];
      } else {
        return data;
      }
    }
  });

};
