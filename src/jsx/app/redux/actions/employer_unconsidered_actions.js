import axios from 'axios';
import	{	GET_EMPLOYER_UNCONSIDERED,
					ADD_UNCONSIDERED,
					REMOVE_UNCONSIDERED	} from './actionTypes';


					
function getEmployerUnconsidered(jobID){
	console.log('getUnconsidered Actions')
	return dispatch => axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=unconsidered')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_UNCONSIDERED, payload})
		)
		.catch(resp => console.log("Error fetching unconsidered", resp));
}

function addUnconsidered(item) {
	console.log('advance action creator');
	return {type: ADD_UNCONSIDERED, item};
}

function removeUnconsidered(index) {
	return {type: REMOVE_UNCONSIDERED, index};
}

module.exports = {
	getEmployerUnconsidered: getEmployerUnconsidered,
	addUnconsidered: addUnconsidered,
	removeUnconsidered: removeUnconsidered
}