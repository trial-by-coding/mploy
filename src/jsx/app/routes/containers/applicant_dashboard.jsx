import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';
import JobList from '../components/jobList';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

@connect(state => state)
class AppContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      isFetching: true,
      unconsidered:[],
      considered: [],
      interviews: [],
      offers: []
    }
	}
  componentDidMount() {
    this.props.dispatch(actions.getApplicantUnconsidered(1));
    this.props.dispatch(actions.getApplicantConsidered(3));
    this.props.dispatch(actions.getApplicantInterviews(4));
    this.props.dispatch(actions.getApplicantOffers(2));
  }



	render() {


    console.log("AppContainer state", this.state);
		return (
		<Container id='body'>
      <Grid>
        <Row>
        	<Col md={3}>
        		<JobList data={this.props.unconsidered}/>
          </Col>
          <Col md={3}>
        		<JobList data={this.props.considered} />
          </Col>
          <Col md={3}>
        		<JobList data={this.props.interviews} />
          </Col>
          <Col md={3}>
        		<JobList data={this.props.offers} />
          </Col>
        </Row>
      </Grid>
    </Container>
    )
	}
}

@SidebarMixin
export default class extends React.Component {
	render() {
    const dispatch = this.props.dispatch
		var classes = classNames({
			'container-open': this.props.open
		})
		return (
			<Container id='container' className={classes}>
				<Sidebar />
				<Header />
        <AppContainer />
				<Footer />
			</Container>
	)}
}