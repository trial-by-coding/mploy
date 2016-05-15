import axios from 'axios';
import {
  GET_APPLICANT_UNCONSIDERED,
  GET_APPLICANT_CONSIDERED,
  GET_APPLICANT_INTERVIEWS,
  GET_APPLICANT_OFFERS
} from './actionTypes';


function getApplicantUnconsidered(jobID) {
  return dispatch => axios.get('/user/employer/appsbystatus?jobID=' + jobID + '&status=unconsidered')
    .then(
      payload => dispatch({
        type: GET_APPLICANT_UNCONSIDERED,
        payload
      })
    )
    .catch(resp => console.log("Error fetching unconsidered", resp));
}

function getApplicantConsidered(jobID) {
  return dispatch => axios.get('/user/employer/appsbystatus?jobID=' + jobID + '&status=considered')
    .then(
      payload => dispatch({
        type: GET_APPLICANT_CONSIDERED,
        payload
      })
    );
}

function getApplicantInterviews(jobID) {
  return dispatch => axios.get('/user/employer/appsbystatus?jobID=' + jobID + '&status=interviews')
    .then(
      payload => dispatch({
        type: GET_APPLICANT_INTERVIEWS,
        payload
      })
    );
}

function getApplicantOffers(jobID) {
  return dispatch => axios.get('/user/employer/appsbystatus?jobID=' + jobID + '&status=offers')
    .then(
      payload => dispatch({
        type: GET_APPLICANT_OFFERS,
        payload
      })
    );
}

function rescindApp(appID) {
  return dispatch => axios.delete('/user/applicant/rescindapp?appID=' + appID);
}

module.exports = {
  getApplicantUnconsidered,
  getApplicantConsidered,
  getApplicantInterviews,
  getApplicantOffers,
  rescindApp
};
