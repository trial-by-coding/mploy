import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import ApplicantLane from 'routes/components/applicantLane';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

@connect(state => state)
export default class ApplicantDashboard extends React.Component {
	constructor(props) {
		super(props)
	}
  componentDidMount() {
    this.props.dispatch(actions.getApplicantUnconsidered(1))
  }

	render() {

    console.log("AppContainer state", this.props);
		return (
		<Container id='body'>
      <Grid>
        <Row>
        	<Col md={3}>
        		<ApplicantLane data={this.props.unconsidered}/>
          </Col>
          <Col md={3}>
        		<ApplicantLane data={this.props.considered} />
          </Col>
          <Col md={3}>
        		<ApplicantLane data={this.props.interviews} />
          </Col>
          <Col md={3}>
        		<ApplicantLane data={this.props.offers} />
          </Col>
        </Row>
      </Grid>
    </Container>
    )
	}
}
