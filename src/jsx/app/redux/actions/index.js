import todos from './todo_actions';
import appActions from './app_actions'
import jobActions from './job_actions'
import empdash from './empdash_actions'

module.exports = {
  ...todos,
  ...appActions,
  ...jobActions,
  ...empdash
};
