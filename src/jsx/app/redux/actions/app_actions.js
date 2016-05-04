import axios from 'axios';
import { ADD_APP,
         REMOVE_APP,
         ACCEPT_APP,
         REJECT_APP,
         FETCH_APP,
         ADD_JOB,
         SET_VISIBILITY_FILTER,
         VisibilityFilters } from './actionTypes';



function getApplications(jobID) {

    return dispatch => axios.get('/user/employer/appsbyjob?jobID=' + jobID)
    .then(
      payload => dispatch({ type: FETCH_APP, payload })
    );
	
}

function rejectApp(jobID, appID) {

    return function (dispatch) {

      return axios.delete('user/employer/deleteapp?appID=' + appID)
        .then(function () {
          return axios.get('user/employer/appsbyjob?jobID=' + jobID)
        })
        .then(function (payload) {
          dispatch({ type: REMOVE_APP, appID })
          dispatch({ type: FETCH_APP, payload })
        });
    }
  // return { type: REMOVE_APP, jobID };
}

function applyToJob(app){
  return function(dispatch){
    return axios.post('user/applicant/submitapp',app)
      .then(function(payload){
        dispatch({ type: ADD_APP, payload})
      })
  }
}

function postNewJob(job){
  return function(dispatch){
    return axios.post('user/employer/submitjob',job)
      .then(function(payload){
        dispatch({ type: ADD_JOB, payload})
      })
  }
}

module.exports = {
  postNewJob:postNewJob,
  applyToJob:applyToJob,
	getApplications: getApplications,
  rejectApp: rejectApp
}