import { FETCH_USER,
         DELETE_USER,
         SET_VISIBILITY_FILTER,
         VisibilityFilters } from '../actions/actionTypes';


const INITIAL_STATE = { user: [] };

function profileUser(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
    console.log('FETCH_USER', action.payload.data);
      return [...state, { user: action.payload.data } ];

    case DELETE_USER:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];

    default:
      return state;
  }
}

function visibilityFilter(state = VisibilityFilters.SHOW_USER, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

module.exports = {
  profileUser,
  visibilityFilter
};
