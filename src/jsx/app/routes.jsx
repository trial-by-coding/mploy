import { Route, Router } from 'react-router';

import Landing from 'routes/landing';
import Blank from 'routes/blank';
import Applications from 'routes/containers/applications.jsx';


export default (history, onUpdate) => {
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={Landing} />
      <Route path='/applications' component={Applications} />
    </Router>
  );
};
