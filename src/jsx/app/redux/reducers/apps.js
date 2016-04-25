import { ADD_APP,
         REMOVE_APP,
         ACCEPT_APP,
         REJECT_APP,
         FETCH_APP,
         SET_VISIBILITY_FILTER,
         VisibilityFilters } from '../actions/actionTypes';

function appList(state = [], action) {
  switch (action.type) {
    case FETCH_APP:
      console.log(action.payload)
    
  }
  return state;
}

module.exports = {
  appList: appList,
};