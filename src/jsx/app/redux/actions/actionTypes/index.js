import todos from './todos';
import apps from './apps';
import jobs from './jobs';
import empdash from './empdash_types';

module.exports = {
  ...todos,
  ...apps,
  ...jobs,
  ...empdash
};
