import todos from './todos';
import apps from './apps';
import jobs from './jobs';
import empdashReducer from './empdash_reducers';

module.exports = {
  ...todos,
  ...apps,
  ...jobs,
  ...empdash
};
