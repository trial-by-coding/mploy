import axios from 'axios';
import  { ADD_JOB,
          REMOVE_JOB,
          APPLY_JOB,
          SHOW_FORM,
          HIDE_FORM,
          FETCH_JOBS,
          SET_VISIBILITY_FILTER } from '../actions/actionTypes';



function jobList(state = {}, action) {
  switch (action.type) {
    case FETCH_JOBS:
      console.log('FETCH_JOBS', action.payload.data)
      const data = action.payload.data;
      return Object.assign({}, state, {
        items: data
      });
    case SHOW_FORM:
      console.log('SHOW_FORM');
      return Object.assign({}, state, {
        showForm: true
      });
    case HIDE_FORM:
      console.log('HIDE_FORM');
      return Object.assign({}, state, {
        showForm: false
      });
    default:
      return state
  }
}





module.exports = {
  jobList: jobList
};