import axios from 'axios';
import {
  GET_EMPLOYER_UNCONSIDERED,
  ADD_UNCONSIDERED,
  REMOVE_UNCONSIDERED,
  NEXT_MODAL
} from './actionTypes';


function getEmployerUnconsidered(jobID) {
  return dispatch => axios.get('/user/employer/appsbystatus?jobID=' + jobID + '&status=unconsidered')
    .then(
      payload => dispatch({
        type: GET_EMPLOYER_UNCONSIDERED,
        payload
      })
    )
    .catch(resp => console.log("Error fetching unconsidered", resp));
}

function getApplicantUnconsidered() {
  return dispatch => axios.get('/user/applicant/currentuserapps/unconsidered')
    .then(
      payload => dispatch({
        type: GET_EMPLOYER_UNCONSIDERED,
        payload
      }));
}

function addUnconsidered(item) {
  return {
    type: ADD_UNCONSIDERED,
    item
  };
}

function removeUnconsidered(index) {
  return {
    type: REMOVE_UNCONSIDERED,
    index
  };
}

function nextUnconsidered(index) {
  let payload = {
    index,
    status: 'unconsidered'
  };
  return {
    type: NEXT_MODAL,
    payload
  };
}

module.exports = {
  getEmployerUnconsidered,
  getApplicantUnconsidered,
  addUnconsidered,
  removeUnconsidered,
  nextUnconsidered
};
