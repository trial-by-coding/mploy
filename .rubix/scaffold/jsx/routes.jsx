import { Route, Router } from 'react-router';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';

import Blank from 'routes/blank';

export default (withHistory, onUpdate) => {
  const history = withHistory?
                  (Modernizr.history ?
                    createBrowserHistory()
                  : createHashHistory())
                : null;
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={Blank} />
    </Router>
  );
};
