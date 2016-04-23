var db = require('../db/db.js');
var Promise = require('bluebird');

var Users = module.exports;


Users.checkId = function(obj) {
  return db('users').where({
    user: obj.username,
    passid: obj.id
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
    passid: passID
  }).then(function(row) {
    console.log('row here = ', row);
    return row;
  });
};

Users.verify = function(username, password) {
  return db('users').where({
      username: username,
      password: password,
    }).limit(1)
    .then(function(rows) {
      return rows[0];
    });
};

Users.verifyId = function(id) {
  console.log('verifyId id == ', id);
  return db('users').where({
    passid: id
  }).limit(1);
};

Users.verifyInsert = function(obj) {
  var session = {};
  session.passid = obj.id;

  if (obj.provider === 'google') {
    session.user = obj.displayName;
  } else {
    session.user = obj.username;
  }

  if (obj.provider === 'github'){
    session.profile_picture = obj._json.avatar_url;

    if (obj._json.name){
      session.user = obj._json.name;
    }
    else{
      session.user = obj.username;
    }
  }

  if (obj.provider === 'linkedin'){
    session.user = obj.user;
  }
  else{
    session.user = obj.username;
  }


  return db('users').where({
    passid: session.passid
  }).then(function(data) {
    if (data.length === 0) {
      return db('users').insert({
        user: session.user,
        passid: session.passid,
        profile_picture: session.profile_picture
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

//only did categories here because we only use it once! not an actual relation to the users
Users.categories = function(incomingAttrs) {

  var attrs = Object.assign({}, incomingAttrs);

  return db('categories').insert(attrs)
    .then(function(result) {
      // Prepare new user for outside world
      return result[0];
    });
};
