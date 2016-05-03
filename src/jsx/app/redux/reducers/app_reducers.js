import { ADD_APP,
         REMOVE_APP,
         ACCEPT_APP,
         REJECT_APP,
         FETCH_APP,
         SET_VISIBILITY_FILTER,
         VisibilityFilters } from '../actions/actionTypes';

function appList(state = {}, action) {
  // console.log('state in reducer is:', state)
  switch (action.type) {
    case FETCH_APP:
      console.log('action recieved:', action.payload)
      const data = action.payload.data;
      return Object.assign({}, state, {
        items: data
      })
    case REMOVE_APP:
      return Object.assign({}, state, {
        items: [...state.items.slice(0, action.appID), ...state.items.slice(action.appID + 1)]
      })
    case ADD_APP:
      console.log("ADD_APP action fired!",action.payload)  
    default:
      return state;
    }
    // console.log('action in remove_app:', action)
}

module.exports = {
  appList: appList
};