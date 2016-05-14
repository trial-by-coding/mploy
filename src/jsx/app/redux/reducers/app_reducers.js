import { REMOVE_APP,
         ACCEPT_APP,
         REJECT_APP,
         FETCH_APP } from '../actions/actionTypes';

function appList(state = {}, action) {

  switch (action.type) {
    case FETCH_APP:
      const data = action.payload.data;
      return Object.assign({}, state, {
        items: data
      });
      
    default:
      return state;
    }
}

module.exports = {
  appList: appList
};
