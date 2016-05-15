import {
  FETCH_USER,
  DELETE_USER
} from '../actions/actionTypes';


function user(state = {}, action) {
  switch (action.type) {
  case FETCH_USER:
    const data = action.payload.data;
    return Object.assign({}, state, data);
  case DELETE_USER:
    return [
      ...state.slice(0, action.index),
      ...state.slice(action.index + 1)
    ];

  default:
    return state;
  }
}

module.exports = {
  user
};
