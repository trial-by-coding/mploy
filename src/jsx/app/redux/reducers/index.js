import apps from './app_reducers';
import jobs from './job_reducers';
import profile from './profile_reducers';
import appdash from './appdash_reducers';
import employerunconsidered from './employer_unconsidered_reducers';
import employerconsidered from './employer_considered_reducers';
import employerinterviews from './employer_interviews_reducers';
import employeroffers from './employer_offers_reducers';

module.exports = {
  ...apps,
  ...jobs,
  ...profile,
  ...appdash,
  ...employerunconsidered,
  ...employerconsidered,
  ...employerinterviews,
  ...employeroffers
};
