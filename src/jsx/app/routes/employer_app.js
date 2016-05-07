import classNames from 'classnames';
import axios from 'axios';
import SidebarMixin from 'global/jsx/sidebar_component';
import actions from 'redux/actions';
import { connect } from 'react-redux'


import Header from 'routes/components/header';
import EmployerSidebar from 'routes/components/employer_sidebar';
import Footer from 'routes/components/footer';
import ApplicantDashboard from 'routes/containers/applicant_dashboard';
import EmployerDashboard from 'routes/containers/employer_dashboard';
import Applications from 'routes/containers/applications';
import Jobs from 'routes/containers/jobs';
import Profile from 'routes/containers/profile_user';



@SidebarMixin
@connect(state => state)
export default class EmployerApp extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
	}

	isEmployer = () => {
		axios.get('user/verifyuser')
			.then(function(user) {
				console.log('user data', user);
				console.log('previous page', document.referrer);
				if(!user.data.employer) {
					window.location.replace(document.referrer);
				}
			})
	};

	render() {
    const dispatch = this.props.dispatch;
		var classes = classNames({
			'container-open': this.props.open
		})
		let posts = this.props.posts;



		this.isEmployer();

		return (
			<Container id='container' className={classes}>
				<EmployerSidebar />
				<Header />
        {this.props.children}
				<Footer />
			</Container>
		);
	}
}
