import axios from 'axios';
import {	GET_EMPLOYER_CONSIDERED,
					ADD_CONSIDERED,
					REMOVE_CONSIDERED	} from './actionTypes';

function getEmployerConsidered(jobID){
	return dispatch => axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=considered')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_CONSIDERED, payload}));
}

function getApplicantConsidered() {
		console.log('getConsidered Actions')
	return dispatch => axios.get('/user/applicant/currentuserapps/considered')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_CONSIDERED, payload }));
}

function addConsidered(item) {
	console.log('advance action creator', item);
	return {type: ADD_CONSIDERED, item};
}

function removeConsidered(index) {
	return {type: REMOVE_CONSIDERED, index};
}

module.exports = {
	getEmployerConsidered: getEmployerConsidered,
	getApplicantConsidered: getApplicantConsidered,
	addConsidered: addConsidered,
	removeConsidered: removeConsidered
}