var db = require('../db/db.js');

var Notifications = module.exports;

//Decrement previous status when application moves to next status?

//only run when new user created
Notifications.createNotification = function(appID, userID, status) {

  return db('notifications')
  .returning ('notifyID')
  .insert({
    new_status: status,
    app_id: appID,
    user_id: userID
  })
  .then(function(id) {
    return id
  })
};

Notifications.deleteNotification = function(notifyID) {

  return db('notifications')
  .returning ('notifyID')
  .del()
  .where({
    notifyID: notifyID
  })
  .then(function(id) {
    return id
  })
};