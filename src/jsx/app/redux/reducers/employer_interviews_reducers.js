import {
  GET_EMPLOYER_INTERVIEWS,
  ADD_INTERVIEW,
  REMOVE_INTERVIEW
} from '../actions/actionTypes';


function interviews(state = [], action) {
  switch (action.type) {
  case GET_EMPLOYER_INTERVIEWS:
    const interviews = action.payload.data;
    return [...interviews];
  case ADD_INTERVIEW:
    return [...state.slice(), action.item];
  case REMOVE_INTERVIEW:
    return [...state.slice(0, action.index),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}

module.exports = {
  interviews
};
