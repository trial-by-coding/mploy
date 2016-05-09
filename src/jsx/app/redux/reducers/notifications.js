import axios from 'axios';
import  { FETCH_NOTIFS,
          DELETE_NOTIFS } from '../actions/actionTypes';

const initialState = {
      notifs: [],
    }
function notifications(state = {}, action) {
  switch (action.type) {
    case FETCH_NOTIFS:
      console.log('FETCH_NOTIFS action:', action.payload.data)
      const data = action.payload.data;
      return Object.assign({}, state, {
        notifs: data
      });
    default:
      return state
  }
}





module.exports = {
  notifications: notifications
};