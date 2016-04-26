import axios from 'axios';
import  { ADD_JOB,
          REMOVE_JOB,
          APPLY_JOB,
          SHOW_FORM,
          FETCH_JOBS,
          SET_VISIBILITY_FILTER } from '../actions/actionTypes';

function jobList(state = [], action) {
  switch (action.type) {
    case FETCH_JOBS:
      console.log('action recieved:', action.payload.data)
      const data = action.payload.data;
      return Object.assign({}, state, {
        items: data
      });
    
  }
  return state;
}

module.exports = {
  jobList: jobList,
};