import axios from 'axios';
import { FETCH_CHARTS

} from './actionTypes';

        //  SET_VISIBILITY_FILTER,
        //  VisibilityFilters } from './actionTypes';


function fetchCharts() {
  return dispatch => axios.get('/user/stats')
  .then(
    payload => dispatch({ type: FETCH_CHARTS, payload })
  );
}

// function setVisibilityFilter(filter) {
//   return { type: SET_VISIBILITY_FILTER, filter };
// }

module.exports = {
  fetchCharts
  // setVisibilityFilter
};
