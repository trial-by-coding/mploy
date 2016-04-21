import { Route, Router } from 'react-router';

import Blank from 'routes/blank';

export default (history, onUpdate) => {
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={Blank} />
    </Router>
  );
};
