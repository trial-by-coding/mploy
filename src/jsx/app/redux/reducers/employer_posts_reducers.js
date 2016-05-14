import {	GET_JOB_POSTS,
					ADD_JOB_POST,
					REMOVE_JOB_POST,
					SET_JOB_POST,
					GET_JOB_INFO } from '../actions/actionTypes';


function posts(state = [], action) {
	switch(action.type) {
		case GET_JOB_POSTS:
			// console.log('posts', action.payload)
			const posts = action.payload.data;
			return [...posts];
		case ADD_JOB_POST:
			return [...state.slice(), action.payload.data];
		case REMOVE_JOB_POST:
			return [...state.slice(0, action.index),
							...state.slice(action.index + 1) ];
		default:
			return state;
	}
}

function currentPost(state = {}, action) {
	switch(action.type) {
		case SET_JOB_POST:
			const currentPost = action.jobID;
			return Object.assign({}, state, currentPost)
		
		case GET_JOB_INFO:
			const currentPostInfo = action.payload.data[0];
			return Object.assign({}, state, currentPostInfo)

		case REMOVE_JOB_POST:
			console.log('state in remove job post:', state)
			return state = {};

		default:
			return state;
	}
}

module.exports = {
	posts: posts,
	currentPost: currentPost
};
