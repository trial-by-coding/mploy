import {
  GET_APPLICANT_UNCONSIDERED,
  GET_APPLICANT_CONSIDERED,
  GET_APPLICANT_INTERVIEWS,
  GET_APPLICANT_OFFERS
} from '../actions/actionTypes';

const initialState = {
  unconsidered: [],
  considered: [],
  interviews: [],
  offers: []
};

function applicantdashboard(state = {}, action) {
  switch (action.type) {
  case GET_APPLICANT_UNCONSIDERED:
    const unconsidered = action.payload.data;
    return Object.assign({}, state, {
      unconsidered
    });
  case GET_APPLICANT_CONSIDERED:
    const considered = action.payload.data;
    return Object.assign({}, state, {
      considered
    });
  case GET_APPLICANT_INTERVIEWS:
    const interviews = action.payload.data;
    return Object.assign({}, state, {
      interviews
    });
  case GET_APPLICANT_OFFERS:
    const offers = action.payload.data;
    return Object.assign({}, state, {
      offers
    });
  default:
    return state;
  }
}

module.exports = {
  applicantdashboard
};
