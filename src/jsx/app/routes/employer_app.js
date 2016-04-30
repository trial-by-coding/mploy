import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';
import ApplicantDashboard from 'routes/containers/applicant_dashboard';
import EmployerDashboard from 'routes/containers/employer_dashboard';
import Applications from 'routes/containers/applications'
import Jobs from 'routes/containers/jobs';
import Profile from 'routes/containers/profile'



@SidebarMixin
export default class EmployerApp extends React.Component {
	render() {
    const dispatch = this.props.dispatch
		var classes = classNames({
			'container-open': this.props.open
		})
		return (
			<Container id='container' className={classes}>
				<Sidebar />
				<Header />
        {this.props.children}
				<Footer />
			</Container>
	)}
}