import todos from './todo_actions';
import apps from './app_actions'
import jobs from './job_actions'
import empdash from './empdash_actions'
import appdash from './appdash_actions'

module.exports = {
  ...todos,
  ...apps,
  ...jobs,
  ...empdash,
  ...appdash
};
