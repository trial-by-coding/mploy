import axios from 'axios';
import {ADVANCE_EMPLOYER_REQUEST,
			  REJECT_EMPLOYER_REQUEST	} from './actionTypes';


function advanceEmployerRequest(appID) {
	return dispatch => axios.put('user/employer/advancestatus', appID)
		.then(
			payload => dispatch({type: ADVANCE_EMPLOYER_REQUEST, payload}))
}

function rejectEmployerRequest(appID) {
	return dispatch => axios.delete('user/employer/deleteapp?appID='+ appID)
		.then(
			payload => dispatch({type: REJECT_EMPLOYER_REQUEST, payload}));
}

module.exports = {
	advanceEmployerRequest: advanceEmployerRequest,
	rejectEmployerRequest: rejectEmployerRequest
}