import axios from 'axios';
import	{	GET_EMPLOYER_INTERVIEWS,
					ADD_INTERVIEW,
					REMOVE_INTERVIEW,
					NEXT_MODAL	} from './actionTypes';

function getEmployerInterviews(jobID){
	return dispatch => axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=interviews')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_INTERVIEWS, payload}));
}

function getApplicantInterviews() {
		// console.log('getInterviews Actions')
	return dispatch => axios.get('/user/applicant/currentuserapps/interviews')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_INTERVIEWS, payload }));
}

function addInterview(item) {
	// console.log('advance action creator');
	return {type: ADD_INTERVIEW, item};
}

function removeInterview(index) {
	return {type: REMOVE_INTERVIEW, index};
}

function nextInterview(index) {
	let payload = {index: index, status: 'interviews'};
	return {type: NEXT_MODAL, payload}
}

module.exports = {
	getEmployerInterviews: getEmployerInterviews,
	getApplicantInterviews: getApplicantInterviews,
	addInterview: addInterview,
	removeInterview: removeInterview,
	nextInterview: nextInterview
};
