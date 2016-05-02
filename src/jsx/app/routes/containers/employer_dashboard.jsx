import classNames from 'classnames';

import SidebarMixin from 'global/jsx/sidebar_component';

import EmployerLane from 'routes/components/employerLane';

import { connect } from 'react-redux'
import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';


@connect(state => state)
export default class EmployerDashboard extends React.Component {
	constructor(props) {
		super(props)
  }
  componentWillMount() {
    this.props.dispatch(actions.getEmployerUnconsidered(1));
    this.props.dispatch(actions.getEmployerConsidered(3));
    this.props.dispatch(actions.getEmployerInterviews(4));
    this.props.dispatch(actions.getEmployerOffers(2));
  }
  


	render() {
    let unconsidered = this.props.employerdashboard.unconsidered;
    let considered = this.props.employerdashboard.considered;
    let interviews = this.props.employerdashboard.interviews;
    let offers = this.props.employerdashboard.offers;

    if( !offers ) {
      console.log('Loading');
      return (<div> Loading... </div>)
    }

		return (
		<Container id='body'>
      <Grid>
        <Row>
        	<Col md={3}>
            <div> Unconsidered </div>
        		<EmployerLane data={unconsidered}
                          lane={'unconsidered'}/>
          </Col>
          <Col md={3}>
            <div> Considered </div>
        		<EmployerLane data={considered} 
                          lane={'considered'}/>
          </Col>
          <Col md={3}>
            <div> Interviews </div>
        		<EmployerLane data={interviews} 
                          lane={'interviews'}/>
          </Col>
          <Col md={3}>
            <div> Offers </div>
        		<EmployerLane data={offers} 
                          lane={'offers'}/>
          </Col>
        </Row>
      </Grid>
    </Container>
    )
	}
}
