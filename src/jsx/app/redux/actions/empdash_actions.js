import axios from 'axios';
import {GET_EMPLOYER_UNCONSIDERED,
			  GET_EMPLOYER_CONSIDERED,
			  GET_EMPLOYER_INTERVIEWS,
			  GET_EMPLOYER_OFFERS } from './actionTypes';

function getEmployerUnconsidered(jobID){
	console.log('getUnconsidered Actions')
	return dispatch => axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=unconsidered')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_UNCONSIDERED, payload})
		)
		.catch(resp => console.log("Error fetching unconsidered", resp));
}

function getEmployerConsidered(jobID){
	return dispatch => axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=considered')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_CONSIDERED, payload})
		);
}

function getEmployerInterviews(jobID){
	return dispatch => axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=interviews')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_INTERVIEWS, payload})
		);
}

function getEmployerOffers(jobID){
	return dispatch => axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=offers')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_OFFERS, payload})
		);
}

module.exports = {
	getEmployerUnconsidered: getEmployerUnconsidered,
	getEmployerConsidered: getEmployerConsidered,
	getEmployerInterviews: getEmployerInterviews,
	getEmployerOffers: getEmployerOffers
}