import todos from './todo_types';
import apps from './app_types';
import jobs from './job_types';
import empdash from './empdash_types';
import appdash from './appdash_types';
import profile from './profile_types';

module.exports = {
  ...todos,
  ...apps,
  ...jobs,
  ...empdash,
  ...appdash,
  ...profile
};
