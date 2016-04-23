import Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';


function getJobs(jobID) {
	return new Promise(function(resolve, reject) {
		fetch('/job' + jobID)
			.then(function(response) {
				if (response.status >= 400) {
	        throw new Error("Bad response from server");
	      }
	      console.log(response);
	      resolve(response);
			})
	})
}

function apply(data) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: 'POST',
			url: '/job',
			data: data,
			success: function(resp) {
				if (response.status >= 400) {
	        reject("Bad response from server");
	        return;
	      }
	      resolve(resp);
			}
		})
	})
}

module.exports = {
	getJobs: getJobs
}