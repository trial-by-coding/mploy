import axios from 'axios';
import {
  FETCH_NOTIFS,
  DELETE_NOTIFS
} from '../actions/actionTypes';


const initialState = {
  notifs: []
};

function notifications(state = [], action) {
  switch (action.type) {
  case FETCH_NOTIFS:
    const data = action.payload.data;
    return [...data];
  case DELETE_NOTIFS:
    const newNotifs = action.index;
    return [...state.slice(0, newNotifs),
      ...state.slice(newNotifs + 1)
    ];
  default:
    return state;
  }
}

module.exports = {
  notifications
};
