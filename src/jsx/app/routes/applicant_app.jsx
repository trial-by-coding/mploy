import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'routes/components/header';
import ApplicantSidebar from 'routes/components/applicant_sidebar';
import Footer from 'routes/components/footer';
import ApplicantDashboard from 'routes/containers/applicant_dashboard';
import EmployerDashboard from 'routes/containers/employer_dashboard';
import Applications from 'routes/containers/applications'
import Jobs from 'routes/containers/jobs';
import Profile from 'routes/containers/profile'



@SidebarMixin
export default class ApplicantApp extends React.Component {
	render() {
    const dispatch = this.props.dispatch
		var classes = classNames({
			'container-open': this.props.open
		})
		return (
			<Container id='container' className={classes}>
				<ApplicantSidebar />
				<Header />
        {this.props.children}
				<Footer />
			</Container>
	)}
}