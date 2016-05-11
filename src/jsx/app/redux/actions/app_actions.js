import axios from 'axios';
import { ADD_APP,
         REMOVE_APP,
         ACCEPT_APP,
         REJECT_APP,
         FETCH_APP
       } from './actionTypes';



function getApplications(jobID) {

    return dispatch => axios.get('/user/employer/appsbyjob?jobID=' + jobID)
    .then(
      payload => dispatch({ type: FETCH_APP, payload })
    );

}

function rejectApp(jobID, appID) {

    return function (dispatch) {

      return axios.delete('user/employer/deleteapp?appID=' + appID)
        .then(function (payload) {
          dispatch({ type: REMOVE_APP, appID });
          dispatch({ type: FETCH_APP, payload });
        });
    };
  // return { type: REMOVE_APP, jobID };
}

function applyToJob(app){
  return function(dispatch){
    return axios.post('user/applicant/submitapp',app)
      .then(function(payload){
        dispatch({ type: ADD_APP, payload});
      });
  };
}

module.exports = {
  applyToJob:applyToJob,
	getApplications: getApplications,
  rejectApp: rejectApp
};
