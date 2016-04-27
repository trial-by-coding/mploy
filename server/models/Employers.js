var db = require('../db/db.js');

var Employers = module.exports;

Employers.insert = function(userID){
  return db('employers').returning('employerID')
  .insert({
    user_id: userID
  })
  .then(function(recordID) {
    return recordID
  })
  .catch(function(err) {
    throw err
  })
};

Employers.verify = function(userID){
  return db('employers')
  .select('*')
  .where({
    user_id: userID
  })
  .then(function(record) {
    return record[0];
  })
  .catch(function(err) {
    throw err;
  })
};
