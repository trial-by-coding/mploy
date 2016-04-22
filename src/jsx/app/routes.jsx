import { Route, Router } from 'react-router';

import Blank from 'routes/blank';
import Applications from 'routes/applications'

export default (history, onUpdate) => {
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={Applications} />
    </Router>
  );
};
