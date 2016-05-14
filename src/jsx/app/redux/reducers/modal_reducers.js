import {
	NEXT_MODAL
} from '../actions/actionTypes'

const initialState = {
	index: -1,
	status: ''
}

function currentModal(state = initialState, action) {
	switch(action.type){
		case NEXT_MODAL:
			return Object.assign({}, state, {
				index: action.payload.index,
				status: action.payload.status
			})
		default:
			return state;
	}
}

module.exports = {
	currentModal: currentModal
}