import axios from 'axios';
import {  GET_JOB_POSTS,
                  SET_JOB_POST,
                  GET_EMPLOYER_UNCONSIDERED,
                  GET_EMPLOYER_CONSIDERED,
                  GET_EMPLOYER_INTERVIEWS,
                  GET_EMPLOYER_OFFERS,
                  FETCH_USER,
                  ADD_JOB,
                  GET_JOB_INFO                       } from './actionTypes';

let jobID = undefined;
function fetchEmployerRequests() {
    return dispatch => axios.get('/user/employer/jobscreated')
        .then(payload => {
            jobID = payload.data[0].jobID;
            // console.log('payload', payload);
            dispatch({ type: SET_JOB_POST, jobID});
            dispatch({ type: GET_JOB_POSTS, payload });
            return axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=unconsidered');
        })
        .then(payload => {
            dispatch({ type: GET_EMPLOYER_UNCONSIDERED, payload});
            return axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=considered');
        })
        .then(payload => {
            // console.log('considered payload', payload)
            dispatch({ type: GET_EMPLOYER_CONSIDERED, payload});
            return axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=interviews');
        })
        .then(payload => {
            // console.log('interviews payload', payload)
            dispatch({ type: GET_EMPLOYER_INTERVIEWS, payload});
            return axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=offers');
        })
        .then(payload => {
            dispatch({type: GET_EMPLOYER_OFFERS, payload});
            return axios.get('/user/verifyuser');
        })
        .then(payload => {
            dispatch({ type: FETCH_USER, payload });
            return axios.get('/user/employer/jobinfo?jobID='+jobID)
        })
        .then(payload => {
        console.log('job info payload', payload)

        dispatch({ type: GET_JOB_INFO, payload});
        });
}

function selectJob(jobID) {
    var appsPresent = false;

    return dispatch => axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=unconsidered')
    .then(payload => {
        console.log('unconsidered payload: ', payload.data)

        appsPresent = !!payload.data.length

        dispatch({ type: SET_JOB_POST, jobID });
        dispatch({ type: GET_EMPLOYER_UNCONSIDERED, payload});
        return axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=considered');
    })
    .then(payload => {
        console.log('considered payload', payload.data)

        if (appsPresent === false){
            appsPresent = !!payload.data.length
        }

        dispatch({ type: GET_EMPLOYER_CONSIDERED, payload});
        return axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=interviews');
    })
    .then(payload => {
        console.log('interviews payload', payload.data)

        if (appsPresent === false){
            appsPresent = !!payload.data.length
        }

        dispatch({ type: GET_EMPLOYER_INTERVIEWS, payload});
        return axios.get('/user/employer/appsbystatus?jobID='+jobID+'&status=offers');
    })
    .then(payload => {
        console.log('offers payload: ', payload.data)

        if (appsPresent === false){
            appsPresent = !!payload.data.length
        }

        console.log('appsPresent: ', appsPresent)

        dispatch({ type: GET_EMPLOYER_OFFERS, payload});
        return axios.get('/user/employer/jobinfo?jobID='+jobID)

    }).then(payload => {
        console.log('job info payload', payload)

        dispatch({ type: GET_JOB_INFO, payload});
    })
};

function postNewJob(job){
  return function(dispatch){
    return axios.post('user/employer/submitjob',job)
      .then(function(payload){
        console.log('job in postNewJob: ', job)
        dispatch({ type: ADD_JOB, job});
      });
  };
};

module.exports = {
    postNewJob:postNewJob,
    fetchEmployerRequests: fetchEmployerRequests,
    selectJob: selectJob
};
