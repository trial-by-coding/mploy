import Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';


function getApplications(jobID) {
	fetch('/appsbyjob?jobID=' + jobID)
		.then(function(response) {
			if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      console.log(response);
		})
}

module.exports = {
	getApplications: getApplications
}