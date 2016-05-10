import axios from 'axios';
import  { FETCH_NOTIFS,
          DELETE_NOTIFS } from '../actions/actionTypes';

const initialState = {
      notifs: [],
    }
function notifications(state = {}, action) {
  switch (action.type) {
    case FETCH_NOTIFS:
      const data = action.payload.data;
      return Object.assign({}, state, {
        notifs: data
      });
    case DELETE_NOTIFS:
      const newNotifs = action.payload.data
      return Object.assign({}, state, {
        notifs: newNotifs
      });
    default:
      return state
  }
}





module.exports = {
  notifications: notifications
};