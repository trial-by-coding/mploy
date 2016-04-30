import { Route, Router, IndexRoute } from 'react-router';

import ApplicantApp from 'routes/applicant_app';
import EmployerApp from 'routes/employer_app';
import Landing from 'routes/landing';
import Applications from 'routes/containers/applications';
import Jobs from 'routes/containers/jobs';
import Controls from 'routes/forms/controls';
import Profile from 'routes/containers/profile';
import EmployerDashboard from 'routes/containers/employer_dashboard';
import ApplicantDashboard from 'routes/containers/applicant_dashboard';
import PieDonutSeries from 'routes/charts/rubix/piedonut_series';


export default (history, onUpdate) => {
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={Landing}/>

      <Route path='/applicant' component={ApplicantApp}>
        <IndexRoute component={ApplicantDashboard} />
        <Route path='/profile' component={Profile} />
        <Route path='/jobs' component={Jobs} />
        <Route path='/rubix/piedonut' component={PieDonutSeries} />
      </Route>
      <Route path='/employer' component={EmployerApp} >
        <IndexRoute component={EmployerDashboard} />
        <Route path='/profile' component={Profile} />
        <Route path='/applications' component={Applications} />
        <Route path='/rubix/piedonut' component={PieDonutSeries} />
      </Route>
    </Router>
  );
};
