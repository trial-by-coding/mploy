var db = require('../db/db.js');

var Stats = module.exports;

//Decrement previous status when application moves to next status?

//only run when new user created
Stats.newUserData = function(userID) {
  console.log('userID in stats: ', userID)

  return db('stats')
    .where({user_id: userID})
  .then(function(record) {
    if (record[0] === undefined){
      return db('stats')
        .returning('statID')
        .insert({
          total_apps: 0,
          applied: 0,
          denied: 0,
          considered: 0,
          interviewed: 0,
          offered: 0,
          user_id: userID
        })
      .then(function(statID) {
        console.log('Stats initialized: ', statID)
        return statID[0]
      })
      .catch(function(err) {
        throw err
      })
    } else {
      console.log('User stats previously initialized')
    }
  })
};

Stats.advanceIncrement = function(userID, status) {
  return new Promise (function (resolve, reject) {
    switch(status){

      case 'considered': 
      return db('stats')
      .returning('*')
      .where({
        user_id: userID
      })
      .increment('considered', 1)
      .decrement('applied', 1)

      case 'interviews':
      return db('stats')
      .returning('*')
      .where({
        user_id: userID
      })
      .increment('interviewed', 1)
      .decrement('considered', 1)

      case 'offers':
      return db('stats')
      .returning('*')
      .where({
        user_id: userID
      })
      .increment('offered', 1)
      .decrement('interviewed', 1)

      default:
      console.log('Unexpected record status: ', record.status)
      return 'Unexpected record status: ', record.status
    }   
  })
  .then(function(result) {
    console.log('Status advance successful.')
    return result
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
    .increment(
      'total_apps', 1
    )
    .then(function(record) {
      return record[0]
    })
    .catch(function(err) {
      throw err
    })
};

Stats.incrementDenied = function(userID) {
  console.log('userID in incrementDenied', userID)
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

Stats.incrementConsidered = function(userID) {
  return db('stats')
    .where({
      user_id: userID
    })
    .increment(
      'considered', 1
    )
    .then(function(record) {
      return record[0]
    })
    .catch(function(err) {
      throw err
    })
};

Stats.incrementInterview = function(userID) {
  return db('stats')
    .where({
      user_id: userID
    })
    .increment(
      'interview_offer', 1
    )
    .then(function(record) {
      return record[0]
    })
    .catch(function(err) {
      throw err
    })
};

Stats.incrementOffer = function(userID) {
  return db('stats')
    .where({
      user_id: userID
    })
    .increment(
      'offered', 1
    )
    .then(function(record) {
      return record[0]
    })
    .catch(function(err) {
      throw err
    })
};