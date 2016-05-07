import axios from 'axios';
import { FETCH_CHARTS } from './actionTypes';


function fetchCharts() {
  return dispatch => axios.get('/user/stats')
  .then(
    payload => dispatch({ type: FETCH_CHARTS, payload })
  );
}


module.exports = {
  fetchCharts
};
