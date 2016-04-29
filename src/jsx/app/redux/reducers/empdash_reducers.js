import {GET_UNCONSIDERED,
			  GET_CONSIDERED,
			  GET_INTERVIEWS,
			  GET_OFFERS } from '../actions/actionTypes';

const initialState = {
      unconsidered: [],
      considered: [],
      interviews: [],
      offers: []
    }

function dashboard(state = initialState, action) {
	console.log("state in dashboard reducer = ", state);
	switch (action.type) {
		case GET_UNCONSIDERED:
			console.log("unconsidered:", action.payload)
			const data1 = action.payload.data;
			return Object.assign({}, state, {
				unconsidered: data1
			})
		case GET_CONSIDERED:
			console.log("considered:", action.payload)
			const data2 = action.payload.data;
			return Object.assign({}, state, {
				considered: data2
			})
		case GET_INTERVIEWS:
			console.log("interviews:", action.payload)
			const data3 = action.payload.data;
			return Object.assign({}, state, {
				interviews: data3
			})
		case GET_OFFERS:
			console.log("offers:", action.payload)
			const data4 = action.payload.data;
			return Object.assign({}, state, {
				offers: data4
			})
		default:
			return state;
	}
}

module.exports = {
	dashboard: dashboard
}