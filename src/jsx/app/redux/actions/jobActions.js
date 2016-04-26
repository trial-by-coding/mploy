import axios from 'axios';
import { ADD_JOB,
         REMOVE_JOB,
         APPLY_JOB,
         FETCH_JOBS,
         SET_VISIBILITY_FILTER,
         VisibilityFilters } from './actionTypes';


function getJobs() {
	console.log('in getJobs actions');
	return dispatch => axios.get('/user/job')
    .then(
      payload => dispatch({ type: FETCH_JOBS, payload })
    )
    .catch(resp => console.log("Error fetching jobs", resp));
}

function applyToJob(data) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: 'POST',
			url: '/job',
			data: data,
			success: function(resp) {
				if (response.status >= 400) {
	        reject("Bad response from server");
	        return;
	      }
	      resolve(resp);
			}
		})
	})
}

module.exports = {
	getJobs: getJobs,
}