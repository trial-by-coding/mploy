import axios from 'axios';
import  { ADD_JOB,
          REMOVE_JOB,
          APPLY_JOB,
          SHOW_FORM,
          APP_FORM_POP,
          HIDE_FORM,
          FETCH_JOBS } from '../actions/actionTypes';


var initialState = { 
  showForm: false,
  items: [] 
};

function jobList(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS:
      console.log('FETCH_JOBS', action.payload.data);
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
    case APP_FORM_POP:
      console.log('APP_FORM, reducer fired!',action.payload.data);
      const appForm = action.payload.data;
      return Object.assign({}, state, {
        appFormPop: appForm
      });

    default:
      return state;
  }
}

module.exports = {
  jobList: jobList
};
