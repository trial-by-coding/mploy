import todos from './todo_reducers';
import apps from './app_reducers';
import jobs from './job_reducers';
import empdash from './empdash_reducers';

module.exports = {
  ...todos,
  ...apps,
  ...jobs,
  ...empdash
};
