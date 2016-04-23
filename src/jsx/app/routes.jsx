import { Route, Router } from 'react-router';

import Landing from 'routes/landing';
import Blank from 'routes/blank';
<<<<<<< HEAD
import Applications from 'routes/containers/applications';
import Jobs from 'routes/containers/jobs'
=======
import Applications from 'routes/containers/applications.jsx';

>>>>>>> signin_linkedin

export default (history, onUpdate) => {
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={Landing} />
      <Route path='/applications' component={Applications} />
      <Route path='/jobs' component={Jobs} />
    </Router>
  );
};
