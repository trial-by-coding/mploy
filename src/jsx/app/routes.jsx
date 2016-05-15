import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import Landing from 'routes/landing';
import ApplicantApp from 'routes/applicant_app';
import EmployerApp from 'routes/employer_app';
import NewJob from 'routes/containers/newjob';
import Jobs from 'routes/containers/jobs';
import ApplyJob from 'routes/containers/apply_job';
import Profile from 'routes/containers/profile_user';
import Charts from 'routes/containers/chart_stats';
import Calendar from 'routes/components/calendar';
import EmployerDashboard from 'routes/containers/employer_dashboard';
import ApplicantDashboard from 'routes/containers/applicant_dashboard';
import Applicant_Sidebar from 'routes/components/applicant_sidebar';
import JobBoard from 'routes/tables/job_board';


export default (browserHistory, onUpdate) => {
  return (
    <Router history={browserHistory} onUpdate={onUpdate}>
      <Route path='/' component={Landing}/>

      <Route path='/applicant' component={ApplicantApp}>
        <IndexRoute component={ApplicantDashboard} />
        <Route path='/applicantprofile' component={Profile} />
        <Route path='/applicantjobs' component={Jobs} />
        <Route path='/applicantcharts' component={Charts} />
        <Route path='/applicantcalendar' component={Calendar} />
      </Route>

      <Route path='/employer' component={EmployerApp} >
        <IndexRoute component={EmployerDashboard} />
        <Route path='/employerprofile' component={Profile} />
        <Route path='/employernewjob' component={NewJob} />
        <Route path='/employercalendar' component={Calendar} />
        <Route path='/employerjobboard' component={JobBoard} />
      </Route>

    </Router>
  );
};
