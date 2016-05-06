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
    user_Id: userID
  })
  .then(function(id) {
    return id
  })
};

Notifications.getNotifications = function(userID) {

  return db('notifications')
  .join('applications', 'notifications.app_id', '=', 'applications.appID') 
  .join('job_posts', 'applications.job_id', '=', 'job_posts.jobID') 
  .select('appID', 'company_name', 'job_title', 'new_status', 'notifications.user_Id', 'notifications.created_at')
  .where({user_Id: userID})
  .then(function(records) {
    return records
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