import {
  FETCH_CHARTS
} from '../actions/actionTypes';

function charts(state = {}, action) {
  switch (action.type) {
  case FETCH_CHARTS:
    const data = action.payload.data;
    return Object.assign({}, state, data);
  default:
    return state;
  }
}

module.exports = {
  charts
};
