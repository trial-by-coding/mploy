import {	GET_JOB_POSTS,
					ADD_JOB_POST,
					REMOVE_JOB_POST,	
					SET_JOB_POST	} from '../actions/actionTypes';


function posts(state = [], action) {
	switch(action.type) {
		case GET_JOB_POSTS:
			console.log('posts', action.payload)
			const posts = action.payload.data;
			return [...posts]
		case ADD_JOB_POST:
			return [...state.slice(), action.item]
		case REMOVE_JOB_POST:
			return [...state.slice(0, action.index),
							...state.slice(action.index + 1) ]
		default:
			return state
	}
}


function currentPost(state = [], action) {
	switch(action.type) {
		case SET_JOB_POST:
			const currentPost = action.jobID;
			return [currentPost];
		default:
			return state
	}
}

module.exports = {
	posts: posts,
	currentPost: currentPost
}