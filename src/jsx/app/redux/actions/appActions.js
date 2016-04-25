import axios from 'axios';
import { ADD_APP,
         REMOVE_APP,
         ACCEPT_APP,
         REJECT_APP,
         FETCH_APP,
         SET_VISIBILITY_FILTER,
         VisibilityFilters } from './actionTypes';



function getApplications(jobID) {

	const request = axios.get('user/employer/appsbyjob?jobID=' + jobID)
		.then(function(response) {
			if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      console.log(response);
		})

    return {
      type: FETCH_APP,
      payload: request
    }
}

module.exports = {
	getApplications: getApplications
}