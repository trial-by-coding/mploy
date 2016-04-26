import axios from 'axios';
import { ADD_APP,
         REMOVE_APP,
         ACCEPT_APP,
         REJECT_APP,
         FETCH_APP,
         SET_VISIBILITY_FILTER,
         VisibilityFilters } from './actionTypes';



function getApplications(jobID) {

    return dispatch => axios.get('user/employer/appsbyjob?jobID=' + jobID)
    .then(
      payload => dispatch({ type: FETCH_APP, payload })
    );
	
}

function rejectApp(index) {
  return { type: REMOVE_APP, index };
}

module.exports = {
	getApplications: getApplications,
  rejectApp: rejectApp
}