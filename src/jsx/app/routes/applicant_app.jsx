import classNames from 'classnames';
import { connect } from 'react-redux';
import actions from 'redux/actions';
import Charts from 'routes/containers/chart_stats';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'routes/components/header';
import ApplicantSidebar from 'routes/components/applicant_sidebar';
import Footer from 'routes/components/footer';
import ApplicantDashboard from 'routes/containers/applicant_dashboard';
import EmployerDashboard from 'routes/containers/employer_dashboard';
import ApplicationContainer from 'routes/containers/applications';
import Jobs from 'routes/containers/jobs';
import Profile from 'routes/containers/profile_user';
import Calendar from 'routes/components/calendar';




@SidebarMixin
@connect(state => state)
export default class ApplicantApp extends React.Component {

	constructor(props) {
		super(props);
	}
		componentDidMount() {
			this.props.dispatch(actions.fetchApplicantRequests());
		}



	render() {
    const { dispatch } = this.props;
		var classes = classNames({
			'container-open': this.props.open
		});
		return (
			<Container id='container' className={classes}>
				<ApplicantSidebar />
				<Header notifications={this.props.notifications} dispatch={ dispatch } />
        {this.props.children}
				<Footer />
			</Container>
	);}
}
