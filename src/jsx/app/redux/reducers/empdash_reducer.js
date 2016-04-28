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
		case: GET_UNCONSIDERED:
			console.log("unconsidered:", action.payload)
			const data = action.payload.data;
			return Object.assign({}, state, {
				items: data
			})
		default:
			return state;
		}
	}
}