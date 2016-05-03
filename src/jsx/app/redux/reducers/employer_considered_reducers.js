import {  GET_EMPLOYER_CONSIDERED,
				  ADD_CONSIDERED, 
				  REMOVE_CONSIDERED} from '../actions/actionTypes';


function considered(state = [], action) {
		switch(action.type) {
		case GET_EMPLOYER_CONSIDERED:
			console.log("considered:", action.payload)
			const considered = action.payload.data;
			return [...considered]
		case ADD_CONSIDERED:
			return [...state.slice(), action.item]
		case REMOVE_CONSIDERED:
			return [...state.slice(0, action.index),
							...state.slice(action.index + 1) ]
		default:
			return state
	}
}

module.exports = {
	considered: considered
}