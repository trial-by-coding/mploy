import { FETCH_USER,
         DELETE_USER,
         SET_VISIBILITY_FILTER,
         VisibilityFilters } from '../actions/actionTypes';


function user(state = {},  action) {
  switch (action.type) {
    case FETCH_USER:
    const data = action.payload.data;
      return Object.assign({}, state,  data  );

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
  user,
  visibilityFilter
};
