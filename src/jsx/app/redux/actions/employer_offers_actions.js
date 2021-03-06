import axios from 'axios';
import {
  GET_EMPLOYER_OFFERS,
  ADD_OFFER,
  REMOVE_OFFER,
  NEXT_MODAL
} from './actionTypes';


function getEmployerOffers(jobID) {
  return dispatch => axios.get('/user/employer/appsbystatus?jobID=' + jobID + '&status=offers')
    .then(
      payload => dispatch({
        type: GET_EMPLOYER_OFFERS,
        payload
      }));
}

function getApplicantOffers() {
  return dispatch => axios.get('/user/applicant/currentuserapps/offers')
    .then(
      payload => dispatch({
        type: GET_EMPLOYER_OFFERS,
        payload
      }));
}

function addOffer(item) {
  return {
    type: ADD_OFFER,
    item
  };
}

function removeOffer(index) {
  return {
    type: REMOVE_OFFER,
    index
  };
}

function nextOffer(index) {
  let payload = {
    index,
    status: 'unconsidered'
  };
  return {
    type: NEXT_MODAL,
    payload
  };
}

module.exports = {
  getEmployerOffers,
  getApplicantOffers,
  addOffer,
  removeOffer,
  nextOffer
};
