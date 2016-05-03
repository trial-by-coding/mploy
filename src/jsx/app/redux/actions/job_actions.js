import axios from 'axios';
import { ADD_JOB,
         REMOVE_JOB,
         APPLY_JOB,
         FETCH_JOBS,
         SHOW_FORM,
         HIDE_FORM,
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

function showForm() {
	console.log('showForm');
	return {
		type: SHOW_FORM
	}
}

function hideForm() {
	console.log('hideForm');
	return {
		type: HIDE_FORM
	}
}



module.exports = {
	getJobs: getJobs,
	showForm: showForm,
	hideForm: hideForm
}