import axios from 'axios';
import	{	GET_EMPLOYER_OFFERS,
					ADD_OFFER,
					REMOVE_OFFER	} from './actionTypes';

function getEmployerOffers(jobID){
	return dispatch => axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=offers')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_OFFERS, payload}));
}

function getApplicantOffers() {
		// console.log('getOffers Actions')
	return dispatch => axios.get('/user/applicant/currentuserapps/offers')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_OFFERS, payload }));
}

function addOffer(item) {
	// console.log('advance action creator');
	return {type: ADD_OFFER, item};
}

function removeOffer(index) {
	return {type: REMOVE_OFFER, index};
}

module.exports = {
	getEmployerOffers: getEmployerOffers,
	getApplicantOffers: getApplicantOffers,
	addOffer: addOffer,
	removeOffer: removeOffer
};
