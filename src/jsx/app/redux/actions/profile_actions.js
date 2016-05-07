import axios from 'axios';
import { FETCH_USER, DELETE_USER } from './actionTypes';


function fetchUser() {
  return dispatch => axios.get('/user/verifyuser')
  .then(
    payload => dispatch({ type: FETCH_USER, payload })
  );
}

function deleteUser(userID) {
  return dispatch => axios.delete('/user/verifyuser?userID=' + userID)
  .then(
    payload => dispatch({ type: DELETE_USER, payload })
  );
}

module.exports = {
  fetchUser,
  deleteUser
};
