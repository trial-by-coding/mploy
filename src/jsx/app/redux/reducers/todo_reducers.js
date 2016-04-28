import { ADD_TODO,
         REMOVE_TODO,
         COMPLETE_TODO,
         SET_VISIBILITY_FILTER,
         VisibilityFilters } from '../actions/actionTypes';

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case REMOVE_TODO:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: !state[action.index].completed
        }),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
}

function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

module.exports = {
  todos: todos,
  visibilityFilter: visibilityFilter
};
