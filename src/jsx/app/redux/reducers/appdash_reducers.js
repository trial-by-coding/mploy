import {GET_APPLICANT_UNCONSIDERED,
			  GET_APPLICANT_CONSIDERED,
			  GET_APPLICANT_INTERVIEWS,
			  GET_APPLICANT_OFFERS } from '../actions/actionTypes';

const initialState = {
      unconsidered: [],
      considered: [],
      interviews: [],
      offers: []
    }

function applicantdashboard(state = {}, action) {
	console.log("state in dashboard reducer = ", state);
	switch (action.type) {
		case GET_APPLICANT_UNCONSIDERED:
			console.log("unconsidered:", action.payload)
			const unconsidered = action.payload.data;
			return Object.assign({}, state, {
				unconsidered: unconsidered
			})
		case GET_APPLICANT_CONSIDERED:
			console.log("considered:", action.payload)
			const considered = action.payload.data;
			return Object.assign({}, state, {
				considered: considered
			})
		case GET_APPLICANT_INTERVIEWS:
			console.log("interviews:", action.payload)
			const interviews = action.payload.data;
			return Object.assign({}, state, {
				interviews: interviews
			})
		case GET_APPLICANT_OFFERS:
			console.log("offers:", action.payload)
			const offers = action.payload.data;
			return Object.assign({}, state, {
				offers: offers
			})
		default:
			return state;
	}
}

module.exports = {
	applicantdashboard: applicantdashboard
}