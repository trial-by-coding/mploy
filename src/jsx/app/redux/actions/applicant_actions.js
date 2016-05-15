import axios from 'axios';
import {
  FETCH_JOBS,
  GET_EMPLOYER_UNCONSIDERED,
  GET_EMPLOYER_CONSIDERED,
  GET_EMPLOYER_INTERVIEWS,
  GET_EMPLOYER_OFFERS,
  FETCH_USER,
  FETCH_NOTIFS,
  ADD_UNCONSIDERED
} from './actionTypes';

function fetchApplicantRequests() {
  return dispatch => axios.get('/user/verifyuser')
    .then(payload => {
      dispatch({
        type: FETCH_USER,
        payload
      });
      return axios.get('/user/job');
    })
    .then(payload => {
      dispatch({
        type: FETCH_JOBS,
        payload
      });
      return axios.get('/user/applicant/currentuserapps/unconsidered');
    })
    .then(payload => {
      dispatch({
        type: GET_EMPLOYER_UNCONSIDERED,
        payload
      });
      return axios.get('/user/applicant/currentuserapps/considered');
    })
    .then(payload => {
      dispatch({
        type: GET_EMPLOYER_CONSIDERED,
        payload
      });
      return axios.get('/user/applicant/currentuserapps/interviews');
    })
    .then(payload => {
      dispatch({
        type: GET_EMPLOYER_INTERVIEWS,
        payload
      });
      return axios.get('/user/applicant/currentuserapps/offers');
    })
    .then(payload => {
      dispatch({
        type: GET_EMPLOYER_OFFERS,
        payload
      });
      return axios.get('/user/applicant/notifications');
    })
    .then(payload => {
      dispatch({
        type: FETCH_NOTIFS,
        payload
      });
    });
}

function applyToJob(app) {
  return function (dispatch) {
    return axios.post('user/applicant/submitapp', app)
      .then(function (payload) {
        dispatch({
          type: ADD_UNCONSIDERED,
          payload
        });
      });
  };
}

module.exports = {
  fetchApplicantRequests,
  applyToJob
};
