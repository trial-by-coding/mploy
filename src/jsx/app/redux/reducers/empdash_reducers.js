import {GET_EMPLOYER_UNCONSIDERED,
			  GET_EMPLOYER_CONSIDERED,
			  GET_EMPLOYER_INTERVIEWS,
			  GET_EMPLOYER_OFFERS
				ADVANCE,
			  ADVANCE_REQUEST,
				REJECT,
				REJECT_REQUEST,
				UNDO  } from '../actions/actionTypes';

const initialState = {
      unconsidered: [],
      considered: [],
      interviews: [],
      offers: []
    }

function employerdashboard(state = {}, action) {
	console.log("state in dashboard reducer = ", state);
	switch (action.type) {
		case GET_EMPLOYER_UNCONSIDERED:
			console.log("unconsidered:", action.payload)
			const unconsidered = action.payload.data;
			return Object.assign({}, state, {
				unconsidered: unconsidered
			})
		case GET_EMPLOYER_CONSIDERED:
			console.log("considered:", action.payload)
			const considered = action.payload.data;
			return Object.assign({}, state, {
				considered: considered
			})
		case GET_EMPLOYER_INTERVIEWS:
			console.log("interviews:", action.payload)
			const interviews = action.payload.data;
			return Object.assign({}, state, {
				interviews: interviews
			})
		case GET_EMPLOYER_OFFERS:
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
	employerdashboard: employerdashboard
}