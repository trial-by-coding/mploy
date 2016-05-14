import axios from 'axios';
import {	GET_JOB_POSTS,
					ADD_JOB_POST,
					REMOVE_JOB_POST,
					SET_JOB_POST	} from './actionTypes';

function getJobPosts() {
	return dispatch => axios.get('/user/employer/jobscreated')
		.then(
			payload => dispatch({ type: GET_JOB_POSTS, payload })
		);
}


	function removeJobPost(jobID) {
	  return dispatch => axios.delete('/user/employer/deletejob?jobID=' + jobID)
	  .then(
	    payload => dispatch({ type: REMOVE_JOB_POST, payload })
	  );
	}




function addJobPost(job){
  return function(dispatch){
    return axios.post('user/employer/submitjob',job)
      .then(function(payload){
        dispatch({ type: ADD_JOB_POST, payload});
      });
  };
};

function setJobPost(jobID){
	return {
		type: SET_JOB_POST, jobID
	};
}

module.exports = {
	getJobPosts,
	addJobPost,
	removeJobPost,
	setJobPost
};
