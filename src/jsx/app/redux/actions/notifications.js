import axios from 'axios';
import  { FETCH_NOTIFS,
          DELETE_NOTIFS } from './actionTypes';

          
function getNotifications(){
  // console.log('getUnconsidered Actions')
  return dispatch => axios.get('/user/applicant/notifications')
    .then(
      payload => dispatch ({ type: FETCH_NOTIFS, payload})
    )
    .catch(resp => console.log("Error fetching notifications", resp));
}

function deleteNotifications(item) {
  console.log('advance action creator');
  return {type: DELETE_NOTIFS, item};
}

module.exports = {
  getNotifications: getNotifications,
  deleteNotifications: deleteNotifications,
}