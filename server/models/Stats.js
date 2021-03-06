var db = require('../db/db.js');

var Stats = module.exports;

//Decrement previous status when application moves to next status?

//only run when new user created
Stats.newUserData = function(userID) {

  return db('stats')
    .where({user_id: userID})
  .then(function(record) {
    if (record[0] === undefined){
      return db('stats')
        .returning('statID')
        .insert({
          total_apps: 0,
          applied: 0,
          rescinded: 0,
          denied: 0,
          considered: 0,
          interviewed: 0,
          offered: 0,
          user_id: userID
        })
      .then(function(statID) {
        return statID[0]
      })
      .catch(function(err) {
        throw err
      })
    }
  })
};

Stats.advanceIncrement = function(userID, status) {
  return db('applications')
  .returning('status')
  .where({
    status: status
  })
  .then(function() {
    switch(status){

      case 'considered':
      return db('stats')
      .where({
        user_id: userID
      })
      .returning('*')
      .increment('considered', 1)
      .then(function() {
        return db('stats')
        .where({
          user_id: userID
        })
        .returning('*')
        .decrement('applied', 1)
      })

      case 'interviews':
      return db('stats')
      .where({
        user_id: userID
      })
      .returning('*')
      .increment('interviewed', 1)
        .then(function() {
          return db('stats')
          .where({
            user_id: userID
          })
          .returning('*')
          .decrement('considered', 1)
        })

      case 'offers':
      return db('stats')
      .where({
        user_id: userID
      })
      .returning('*')
      .increment('offered', 1)
        .then(function() {
          return db('stats')
          .where({
            user_id: userID
          })
          .returning('*')
          .decrement('interviewed', 1)
        })

      default:
      return 'Unexpected record status: ', status
    }
  })
  .then(function(result) {
    return result
  })
  .catch(function(err) {
      throw err
  })
};

Stats.revertIncrement = function(userID, status) {
  return db('applications')
  .returning('status')
  .where({
    status: status
  })
  .then(function() {
    switch(status){

      case 'unconsidered':
      return db('stats')
      .where({
        user_id: userID
      })
      .returning('*')
      .increment('applied', 1)
      .then(function() {
        return db('stats')
          .where({
          user_id: userID
          })
          .returning('*')
          .decrement('considered', 1)
        })

      case 'considered':
      return db('stats')
      .where({
        user_id: userID
      })
      .returning('*')
      .increment('considered', 1)
      .then(function() {
        return db('stats')
          .where({
          user_id: userID
          })
          .returning('*')
          .decrement('interviewed', 1)
        })

      case 'interviews':
      return db('stats')
      .where({
        user_id: userID
      })
      .returning('*')
      .increment('interviewed', 1)
      .then(function() {
        return db('stats')
          .where({
          user_id: userID
          })
          .returning('*')
          .decrement('offered', 1)
        })

      default:
      return 'Unexpected record status: ', status
    }
  })
  .then(function(result) {
    return result
  })
  .catch(function(err) {
      throw err
  })
};

Stats.getStats = function(userID) {
  return db('stats')
    .where({
      user_id: userID
    })
    .then(function(record) {
      return record[0]
    })
    .catch(function(err) {
      throw err
    })
};

Stats.incrementTotalApps = function(userID) {
  return db('stats')
    .where({
      user_id: userID
    })
    .increment('total_apps', 1)
    .then(function() {
      return db('stats')
      .where({
        user_id: userID
      })
      .increment('applied', 1)
      })
      .then(function(record) {
        return record[0]  
      })
      .catch(function(err) {
        throw err
   })
};

Stats.incrementRescinded = function(userID) {
  return db('stats')
    .where({
      user_id: userID
    })
    .increment(
      'rescinded', 1
    )
    .then(function(record) {
      return record[0]
    })
    .catch(function(err) {
      throw err
    })
};

Stats.incrementDenied = function(userID) {
  return db('stats')
    .where({
      user_id: userID
    })
    .increment(
      'denied', 1
    )
    .then(function(record) {
      return record[0]
    })
    .catch(function(err) {
      throw err
    })
};