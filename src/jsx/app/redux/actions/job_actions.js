import axios from 'axios';
import {
  ADD_JOB,
  REMOVE_JOB,
  APPLY_JOB,
  FETCH_JOBS,
  SHOW_FORM,
  HIDE_FORM
} from './actionTypes';


function getJobs() {
  return dispatch => axios.get('/user/job')
    .then(
      payload => dispatch({
        type: FETCH_JOBS,
        payload
      })
    )
    .catch(resp => console.log("Error fetching jobs", resp));
}

function showForm() {
  return {
    type: SHOW_FORM
  };
}

function hideForm() {
  return {
    type: HIDE_FORM
  };
}

function filterJobTitles(title) {
  return {
    type: FILTER_JOB_TITLES,
    title
  };
}

module.exports = {
  getJobs,
  showForm,
  hideForm
};
