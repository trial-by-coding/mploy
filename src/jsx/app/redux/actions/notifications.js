import axios from 'axios';
import  { FETCH_NOTIFS,
          DELETE_NOTIFS } from './actionTypes';

          
function getNotifications(){
  // console.log('getNotifications Actions')
  return dispatch => axios.get('/user/applicant/notifications')
    .then(
      payload => dispatch ({ type: FETCH_NOTIFS, payload})
    )
    .catch(resp => console.log("Error fetching notifications", resp));
}

function deleteNotification(notifyID, index) {
  return dispatch => axios.delete('/user/applicant/clearnotification?notifyID=' + notifyID)
      .then(
        payload => dispatch ({ type: DELETE_NOTIFS, index: index})
      )
      .catch(resp => console.log("Error fetching notifications", resp));
}

module.exports = {
  getNotifications: getNotifications,
  deleteNotification: deleteNotification,
}