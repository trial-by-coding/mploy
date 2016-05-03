import axios from 'axios';
import	{	GET_EMPLOYER_OFFERS,
					ADD_OFFERS,
					REMOVE_OFFERS	} from './actionTypes';

function getEmployerOffers(jobID){
	return dispatch => axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=offers')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_OFFERS, payload}));
}

function addOffers(item) {
	console.log('advance action creator');
	return {type: ADD_OFFERS, item};
}

function removeOffers(index) {
	return {type: REMOVE_OFFERS, index};
}

module.exports = {
	getEmployerOffers: getEmployerOffers,
	addOffers: addOffers,
	removeOffers: removeOffers
}