import { Route, Router, IndexRoute } from 'react-router';

import ApplicantApp from 'routes/applicant_app';
import EmployerApp from 'routes/employer_app';
import Landing from 'routes/landing';
import Applications from 'routes/containers/applications';
import NewJob from 'routes/containers/newjob';
import Jobs from 'routes/containers/jobs';
import Controls from 'routes/forms/controls';
import Profile from 'routes/containers/profile_user';
import EmployerDashboard from 'routes/containers/employer_dashboard';
import ApplicantDashboard from 'routes/containers/applicant_dashboard';
import Charts from 'routes/containers/charts';
import Calendar from 'routes/calendar';



export default (history, onUpdate) => {
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={Landing}/>
      <Route path='/applicant' component={ApplicantApp}>
        <IndexRoute component={ApplicantDashboard} />
        <Route path='/profile' component={Profile} />
        <Route path='/jobs' component={Jobs} />
        <Route path='/charts' component={Charts} />
        <Route path='/calendar' component={Calendar} />

      </Route>

      <Route path='/employer' component={EmployerApp} >
        <IndexRoute component={EmployerDashboard} />
        <Route path='/profile' component={Profile} />
        <Route path='/applications' component={Applications} />
        <Route path='/newjob' component={NewJob} />
        <Route path='/charts' component={Charts} />
        <Route path='/calendar' component={Calendar} />

      </Route>
    </Router>
  );
};
