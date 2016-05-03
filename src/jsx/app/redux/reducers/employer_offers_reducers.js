import {  GET_EMPLOYER_OFFERS,
					ADD_OFFER,	
					REMOVE_OFFER } from '../actions/actionTypes';


function offers(state = [], action) {
		switch(action.type) {
		case GET_EMPLOYER_OFFERS:
			console.log("offers:", action.payload)
			const offers = action.payload.data;
			return [...offers]
		case ADD_OFFER:
			return [...state.slice(), action.item]
		case REMOVE_OFFER:
			return [...state.slice(0, action.index),
							...state.slice(action.index + 1) ]
		default:
			return state
	}
}

module.exports = {
	offers: offers
}