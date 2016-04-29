import { Route, Router } from 'react-router';

import Landing from 'routes/landing';
import Blank from 'routes/blank';
import Applications from 'routes/containers/applications';
import Jobs from 'routes/containers/jobs';
import Controls from 'routes/forms/controls';
import Profile from 'routes/containers/profile';
import EmployerDashboard from 'routes/containers/employer_dashboard';



export default (history, onUpdate) => {
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={Landing} />
      <Route path='/applications' component={Applications} />
      <Route path='/jobs' component={Jobs} />
      <Route path='/blank' component={Blank} />
      <Route path='/employer/dashboard' component={EmployerDashboard} />
      <Route path='/profile' component={Profile} />
    </Router>
  );
};
