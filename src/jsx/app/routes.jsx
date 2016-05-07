import { Route, Router, IndexRoute } from 'react-router';

import Landing from 'routes/landing';
import ApplicantApp from 'routes/applicant_app';
import EmployerApp from 'routes/employer_app';
import Applications from 'routes/containers/applications';
import NewJob from 'routes/containers/newjob';
import Jobs from 'routes/containers/jobs';
import Controls from 'routes/forms/controls';
import Profile from 'routes/containers/profile_user';
import Charts from 'routes/containers/chart_stats';
import Calendar from 'routes/calendar';
import EmployerDashboard from 'routes/containers/employer_dashboard';
import ApplicantDashboard from 'routes/containers/applicant_dashboard';



export default (history, onUpdate) => {
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={Landing}/>
      <Route path='/applicant' component={ApplicantApp}>
        <IndexRoute component={ApplicantDashboard} />
        <Route path='/applicant/profile' component={Profile} />
        <Route path='/applicant/jobs' component={Jobs} />
        <Route path='/applicant/charts' component={Charts} />
        <Route path='/applicant/calendar' component={Calendar} />

      </Route>

      <Route path='/employer' component={EmployerApp} >
        <IndexRoute component={EmployerDashboard} />
        <Route path='/employerprofile' component={Profile} />
        <Route path='/employer/applications' component={Applications} />
        <Route path='/employer/newjob' component={NewJob} />
        <Route path='/employer/charts' component={Charts} />
        <Route path='/employer/calendar' component={Calendar} />

      </Route>
    </Router>
  );
};
