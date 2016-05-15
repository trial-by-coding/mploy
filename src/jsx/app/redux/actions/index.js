import apps from './app_actions';
import jobs from './job_actions';
import empdash from './empdash_actions';
import appdash from './appdash_actions';
import profile from './profile_actions';
import charts from './chart_actions';
import applicantapp from './applicant_actions';
import employerunconsidered from './employer_unconsidered_actions';
import employerconsidered from './employer_considered_actions';
import employerinterviews from './employer_interviews_actions';
import employeroffers from './employer_offers_actions';
import employerposts from './employer_posts_actions';
import employerapp from './employer_actions';
import notifications from './notifications';


module.exports = {
  ...apps,
  ...jobs,
  ...empdash,
  ...appdash,
  ...profile,
  ...charts,
  ...applicantapp,
  ...employerunconsidered,
  ...employerconsidered,
  ...employerinterviews,
  ...employeroffers,
  ...employerposts,
  ...employerapp,
  ...notifications
};
