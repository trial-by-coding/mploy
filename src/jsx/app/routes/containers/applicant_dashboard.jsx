import classNames from 'classnames';
import ApplicantLane from 'routes/components/applicantLane';
import { connect } from 'react-redux';
import actions from 'redux/actions';


@connect(state => state)
export default class ApplicantDashboard extends React.Component {
	constructor(props) {
		super(props);
	}
  componentWillMount() {


  }

	render() {

    let unconsidered = this.props.unconsidered;
    let considered = this.props.considered;
    let interviews = this.props.interviews;
    let offers = this.props.offers;
    let dispatch = this.props.dispatch;
    let apps = [unconsidered, considered, interviews, offers];

    console.log("AppContainer state", this.props);
    if(unconsidered.length === 0 && considered.length === 0 && interviews.length === 0 && offers.length === 0){
      return (
        <Container id='body'>
          <h1 style={{textAlign: 'center'}}>You haven't applied to any jobs yet! </h1>
          <h2 style={{textAlign: 'center'}}>Apply to jobs and track your progress here on your board.</h2>
        </Container>
      );
    }

		return (
		<Container id='body'>
      <Grid>
        <Row>
        	<Col md={3}>
            <div> Unconsidered </div>
            <ApplicantLane data={unconsidered}
                          lane={'unconsidered'}
                          dispatch={this.props.dispatch}/>
          </Col>
          <Col md={3}>
            <div> Considered </div>
            <ApplicantLane data={considered} 
                          lane={'considered'}
                          dispatch={this.props.dispatch}/>
          </Col>
          <Col md={3}>
            <div> Interviews </div>
            <ApplicantLane data={interviews} 
                          lane={'interviews'}
                          dispatch={this.props.dispatch}/>
          </Col>
          <Col md={3}>
            <div> Offers </div>
            <ApplicantLane data={offers} 
                          lane={'offers'}
                          dispatch={this.props.dispatch}/>
          </Col>
        </Row>
      </Grid>
    </Container>
	);
	}
}
