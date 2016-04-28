import todos from './todos';
import appActions from './appActions'
import jobActions from './jobActions'
import empdash from './empdash_actions'

module.exports = {
  ...todos,
  ...appActions,
  ...jobActions,
  ...empdash
};
