import { FETCH_CHART } from '../actions/actionTypes';

function chart(state = {}, action) {
  switch(action.type) {
    case FETCH_CHART:
    const data = action.payload.data;
    console.log('FetchCHART > >', data);
    return Object.assign({}, state, data );

    default:
    return state;
  }
}


module.exports = {
  chart
};
