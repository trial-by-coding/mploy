import apps from './app_types';
import jobs from './job_types';
import empdash from './empdash_types';
import appdash from './appdash_types';
import profile from './profile_types';
import employerunconsidered from './employer_unconsidered_types.js';
import employerconsidered from './employer_considered_types.js';
import employerinterviews from './employer_interviews_types.js';
import employeroffers from './employer_offers_types.js';
import employerposts from './employer_posts_types';

module.exports = {
  ...apps,
  ...jobs,
  ...profile,
  ...empdash,
  ...appdash,
  ...employerunconsidered,
  ...employerconsidered,
  ...employerinterviews,
  ...employeroffers,
  ...employerposts
};
