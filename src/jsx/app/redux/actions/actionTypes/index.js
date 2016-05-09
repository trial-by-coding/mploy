import apps from './app_types';
import jobs from './job_types';
import empdash from './empdash_types';
import appdash from './appdash_types';
import profile from './profile_types';
import charts from './chart_types';
import employerapp from './employer_types';
import employerunconsidered from './employer_unconsidered_types';
import employerinterviews from './employer_interviews_types';
import employeroffers from './employer_offers_types';
import employerposts from './employer_posts_types';
import employerconsidered from './employer_considered_types.js';
import notifications from './notifications';

module.exports = {
  ...apps,
  ...jobs,
  ...empdash,
  ...appdash,
  ...profile,
  ...charts,
  ...employerunconsidered,
  ...employerconsidered,
  ...employerinterviews,
  ...employeroffers,
  ...employerposts,
  ...notifications
};
