var db = require('../db/db.js');

var Employers = module.exports;

Employers.insert = function(userID){
	return db('employers').returning('employerID')
  .insert({
	  user_id: userID
	})
    .then(function(recordID) {
      console.log('Employer recordID: ', recordID)
      return recordID
    })
    .catch(function(err) {
      console.log('Employer insert failure: ', err)
      throw err
    })
};

Employers.verify = function(userID){
	return db('employers').select('*').where({
		user_id: userID
	})
    .then(function(record) {
      console.log('Employer record: ', record)
      return record;
    })
    .catch(function(err) {
      console.log('Employer verification failure: ', err)
      throw err;
    })
};
