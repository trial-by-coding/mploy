import axios from 'axios';
import {
  ADD_JOB,
  REMOVE_JOB,
  APPLY_JOB,
  SHOW_FORM,
  APP_FORM_POP,
  HIDE_FORM,
  FETCH_JOBS
} from '../actions/actionTypes';


let initialState = {
  showForm: false,
  items: []
};

function jobList(state = initialState, action) {
  switch (action.type) {
  case FETCH_JOBS:
    const data = action.payload.data;
    return Object.assign({}, state, {
      items: data
    });
  case SHOW_FORM:
    return Object.assign({}, state, {
      showForm: true
    });
  case HIDE_FORM:
    return Object.assign({}, state, {
      showForm: false
    });
  case APP_FORM_POP:
    const appForm = action.payload.data;
    return Object.assign({}, state, {
      appFormPop: appForm
    });
  case ADD_JOB:
    return Object.assign({}, state, {
      items: [...state.items.slice()].push(action.job)
    });

  default:
    return state;
  }
}

module.exports = {
  jobList
};
