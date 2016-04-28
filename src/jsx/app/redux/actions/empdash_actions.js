import axios from 'axios';
import {GET_UNCONSIDERED,
			  GET_CONSIDERED,
			  GET_INTERVIEWS,
			  GET_OFFERS } from './actionTypes';

function getUnconsidered(jobID){
	return dispatch => axios.get('user/employer/appbystatus?jobID='+jobID+'&status=unconsidered')
		.then(
			payload => dispatch({ type: GET_UNCONSIDERED, payload})
		);
}

function getConsidered(jobID){
	return dispatch => axios.get('user/employer/appbystatus?jobID='+jobID+'&status=considered')
		.then(
			payload => dispatch({ type: GET_CONSIDERED, payload})
		);
}

function getInterviews(jobID){

}

function getOffers(jobID){

}

module.exports = {
	getUnconsidered: getUnconsidered,
	getConsidered: getConsidered,
	getInterviews: getInterviews,
	getOffers: getOffers
}