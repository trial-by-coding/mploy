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
    this.props.dispatch(actions.getApplications(2))
  }
  advance = (appID, status, item, index)  => {
    console.log('employer dashboard props', this.props);
    if(status === 'unconsidered')     { this.props.dispatch(actions.removeUnconsidered(index))
                                        this.props.dispatch(actions.addConsidered(item))}
    else if(status === 'considered')  { this.props.dispatch(actions.removeConsidered(index))
                                        this.props.dispatch(actions.addInterview(item))}
    else if(status === 'interviews')  { this.props.dispatch(actions.removeInterview(index))
                                        this.props.dispatch(actions.addOffer(item))}
    else if(status === 'offers')      { this.props.dispatch(actions.removeOffer(index)) }  

    this.props.dispatch(actions.advanceEmployerRequest(appID));
  };
  retract = (appID, status, item, index) => {
    if(status === 'unconsidered')     { this.props.dispatch(actions.removeUnconsidered(index)) }
    else if(status === 'considered')  { this.props.dispatch(actions.removeConsidered(index))
                                        this.props.dispatch(actions.addUnconsidered(item))}
    else if(status === 'interviews')  { this.props.dispatch(actions.removeInterview(index))
                                        this.props.dispatch(actions.addConsidered(item))}
    else if(status === 'offers')      { this.props.dispatch(actions.removeOffer(index)),
                                        this.props.dispatch(actions.addInterview(item)) }  
  };


	render() {
    console.log('employer dashboard props', this.props);
    let unconsidered = this.props.unconsidered;
    let considered = this.props.considered;
    let interviews = this.props.interviews;
    let offers = this.props.offers;

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
                          lane={'unconsidered'}
                          advance={this.advance}
                          retract={this.retract}
                          dispatch={this.props.dispatch}/>
          </Col>
          <Col md={3}>
            <div> Considered </div>
        		<EmployerLane data={considered} 
                          lane={'considered'}
                          advance={this.advance}
                          retract={this.retract}
                          dispatch={this.props.dispatch}/>
          </Col>
          <Col md={3}>
            <div> Interviews </div>
        		<EmployerLane data={interviews} 
                          lane={'interviews'}
                          advance={this.advance}
                          retract={this.retract}
                          dispatch={this.props.dispatch}/>
          </Col>
          <Col md={3}>
            <div> Offers </div>
        		<EmployerLane data={offers} 
                          lane={'offers'}
                          advance={this.advance}
                          retract={this.retract}
                          dispatch={this.props.dispatch}/>
          </Col>
        </Row>
      </Grid>
    </Container>
    )
	}
}
