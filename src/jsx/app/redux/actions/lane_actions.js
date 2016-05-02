import axios from 'axios'
import {ADVANCE_REQUEST,
				ADVANCE,
				REJECT,
				REJECT_REQUEST,
				UNDO } from './actionTypes';


function advance(status) {
	return dispatch({type: ADVANCE, status});
}

function advanceRequest() {
	return dispatch => axios.get('user/employer/advancestatus')
		.then(
			payload => dispatch({type: ADVANCE_REQUEST, payload}))
}

function reject(index) {
	return dispatch({type: REJECT, index});
}

function rejectRequest() {
	return dispatch => axios.delete('user/employer/deleteapp')
		.then(
			payload => dispatch({type: REJECT_REQUEST, payload}));
}


module.exports = {
	advance: advance,
	advanceRequest: advanceRequest,
	reject: reject,
	rejectRequest:rejectRequest
}