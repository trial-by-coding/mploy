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
          denied: 0,
          considered: 0,
          interviewed: 0,
          additional: 0,
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