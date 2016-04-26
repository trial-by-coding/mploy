import todos from './todos';
import apps from './apps';
import jobs from './jobs';
module.exports = {
  ...todos,
  ...apps,
  ...jobs
};
