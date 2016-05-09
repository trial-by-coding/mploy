import axios from 'axios';
import {	GET_JOB_POSTS,
					ADD_JOB_POST,
					REMOVE_JOB_POST,
					SET_JOB_POST	} from './actionTypes';

function getJobPosts() {
	// console.log('jobposts');
	return dispatch => axios.get('/user/employer/jobscreated')
		.then(
			payload => dispatch({ type: GET_JOB_POSTS, payload })
		);
}

function addJobPost(item) {
	return  {
		type: ADD_JOB_POST, item
	};
	}

function removeJobPost(index) {
	return {
		type: REMOVE_JOB_POST, index
	};
	}

function setJobPost(jobID){
	// console.log('setJobPost jobID', jobID);
	return {
		type: SET_JOB_POST, jobID
	};
}

module.exports = {
	getJobPosts: getJobPosts,
	addJobPost: addJobPost,
	removeJobPost: removeJobPost,
	setJobPost: setJobPost
};
