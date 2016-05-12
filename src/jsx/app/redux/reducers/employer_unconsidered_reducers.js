import {GET_EMPLOYER_UNCONSIDERED,
				ADD_UNCONSIDERED,
				REMOVE_UNCONSIDERED } from '../actions/actionTypes';


function unconsidered(state = [], action) {
		switch(action.type) {
		case GET_EMPLOYER_UNCONSIDERED:
			const unconsidered = action.payload.data;
			return [...unconsidered];
		case ADD_UNCONSIDERED:
			const item = action.payload.data
			return [...state.slice(), item];
		case REMOVE_UNCONSIDERED:
			return [ ...state.slice(0, action.index),
						   ...state.slice(action.index + 1) ];
		default:
			return state;
	}
}

module.exports = {
	unconsidered: unconsidered
};
