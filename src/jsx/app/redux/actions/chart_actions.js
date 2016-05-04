import axios from 'axios';
import { FETCH_CHART } from './actionTypes';

function fetchChart() {
  return dispatch => axios.get('/user/stats')
  .then(
    payload => dispatch({ type: FETCH_CHART, payload })
  );
}


module.exports = {
  fetchChart
};
