import {ADVANCE_REQUEST,
				ADVANCE,
				REJECT,
				REJECT_REQUEST,
				UNDO } from '../actions/actionTypes';


function lanes(state = {} , action) {
	switch(action.type) {
		case ADVANCE:
			if(action.application.status === 'unconsidered') {
				console.log('lane reducer state', state);
				return Object.assign({}, state, {
					unconsidered:[...state.unconsidered.slice(0, action.index),
												...state.unconsidered.slice(action.index + 1) ],
					considered:  [...state.considered.push(action.item)]
				})
			}
			else if(action.status === 'considered') {
				return Object.assign({}, state, {
					considered: [...state.considered.slice(0, action.index),
											 ...state.considered.slice(action.index + 1) ],
					interviews: [...state.interviews.push(action.item)]

				})
			}
			else if(action.status === 'interviews') {
				return Object.assign({}, state, {
					interviews:[...state.interviews.slice(0, action.index),
											...state.interviews.slice(action.index + 1) ],
					offers:    [...state.offers.push(action.item)]
				})
			}
			else if(action.status === 'offers') {
				return Object.assign({}. state, {
					offers:[...state.offers.slice(0, action.index),
									...state.offers.slice(action.index + 1) ]
			  })
			}
		default:
			return state;
	}
}

module.exports = {
	lanes: lanes
}