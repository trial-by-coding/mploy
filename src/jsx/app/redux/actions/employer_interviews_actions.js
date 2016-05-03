import axios from 'axios';
import	{	GET_EMPLOYER_INTERVIEWS,
					ADD_INTERVIEWS,
					REMOVE_INTERVIEWS	} from './actionTypes';

function getEmployerInterviews(jobID){
	return dispatch => axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=interviews')
		.then(
			payload => dispatch({ type: GET_EMPLOYER_INTERVIEWS, payload}));
}

function addInterviews(item) {
	console.log('advance action creator');
	return {type: ADD_INTERVIEWS, item};
}

function removeInterviews(index) {
	return {type: REMOVE_INTERVIEWS, index};
}

module.exports = {
	getEmployerInterviews: getEmployerInterviews,
	addInterviews: addInterviews,
	removeInterviews: removeInterviews
}