import { Route, Router } from 'react-router';

import Landing from 'routes/landing';
import Blank from 'routes/blank';
import Applications from 'routes/containers/applications';
import Jobs from 'routes/containers/jobs';
import Social from 'routes/containers/social';

import Lists from 'routes/lists';
import TimelineJSX from 'routes/timeline';
import InteractiveTimeline from 'routes/interactive';

export default (history, onUpdate) => {
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={Landing} />
      <Route path='/applications' component={Applications} />
      <Route path='/jobs' component={Jobs} />
      <Route path='/blank' component={Blank} />
      <Route path='/social' component={Social} />

      <Route path='/lists' component={Lists} />
      <Route path='/timeline' component={TimelineJSX} />
      <Route path='/interactive-timeline' component={InteractiveTimeline} />


    </Router>
  );
};
