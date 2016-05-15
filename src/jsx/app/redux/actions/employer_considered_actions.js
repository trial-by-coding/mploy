import axios from 'axios';
import {
  GET_EMPLOYER_CONSIDERED,
  ADD_CONSIDERED,
  REMOVE_CONSIDERED,
  NEXT_MODAL
} from './actionTypes';


function getEmployerConsidered(jobID) {
  return dispatch => axios.get('/user/employer/appsbystatus?jobID=' + jobID + '&status=considered')
    .then(
      payload => dispatch({
        type: GET_EMPLOYER_CONSIDERED,
        payload
      }));
}

function getApplicantConsidered() {
  return dispatch => axios.get('/user/applicant/currentuserapps/considered')
    .then(
      payload => dispatch({
        type: GET_EMPLOYER_CONSIDERED,
        payload
      }));
}

function addConsidered(item) {
  return {
    type: ADD_CONSIDERED,
    item
  };
}

function removeConsidered(index) {
  return {
    type: REMOVE_CONSIDERED,
    index
  };
}

function nextConsidered(index) {
  let payload = {
    index,
    status: 'considered'
  };
  return {
    type: NEXT_MODAL,
    payload
  };
}

module.exports = {
  getEmployerConsidered,
  getApplicantConsidered,
  addConsidered,
  removeConsidered,
  nextConsidered
};
