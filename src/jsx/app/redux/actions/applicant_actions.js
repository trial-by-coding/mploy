import axios from 'axios';
import {  FETCH_JOBS,
				  GET_EMPLOYER_UNCONSIDERED,
				  GET_EMPLOYER_CONSIDERED,
				  GET_EMPLOYER_INTERVIEWS,
				  GET_EMPLOYER_OFFERS,
				  FETCH_USER							 } from './actionTypes';

function fetchApplicantRequests() {
	return dispatch => axios.get('/user/verifyuser')
	.then(payload => {
		dispatch({ type: FETCH_USER, payload })
		return axios.get('/user/job')
	})
	.then(payload => {
		dispatch({ type: FETCH_JOBS, payload})
		return axios.get('/user/applicant/currentuserapps/unconsidered')
	})
	.then(payload => {
		dispatch({ type: GET_EMPLOYER_UNCONSIDERED, payload })
		return axios.get('/user/applicant/currentuserapps/unconsidered')
	})
	.then(payload => {
		dispatch({ type: GET_EMPLOYER_CONSIDERED, payload })
		return axios.get('/user/applicant/currentuserapps/considered')
	})
	.then(payload => {
		dispatch({ type: GET_EMPLOYER_INTERVIEWS, payload })
		return axios.get('/user/applicant/currentuserapps/interviews')
	})
	.then(payload => {
		dispatch({ type: GET_EMPLOYER_OFFERS, payload })
		return axios.get('/user/applicant/currentuserapps/offers')
	})
}

module.exports = {
	fetchApplicantRequests: fetchApplicantRequests
}
