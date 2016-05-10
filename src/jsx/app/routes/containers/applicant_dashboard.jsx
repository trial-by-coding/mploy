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

  rescind = (appID, index, status) => {
    console.log('appID', appID);
    console.log('index', index);
    if(status === 'unconsidered')     { this.props.dispatch(actions.removeUnconsidered(index)); }
    else if(status === 'considered')  { this.props.dispatch(actions.removeConsidered(index));}
    else if(status === 'interviews')  { this.props.dispatch(actions.removeInterview(index));}
    else if(status === 'offers')      { this.props.dispatch(actions.removeOffer(index));}
    this.props.dispatch(actions.rescindApp(appID));
  };

	render() {

    let unconsidered = this.props.unconsidered;
    let considered = this.props.considered;
    let interviews = this.props.interviews;
    let offers = this.props.offers;
    let dispatch = this.props.dispatch;
    let apps = [unconsidered, considered, interviews, offers];

    // console.log("AppContainer state", this.props);
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
            <ApplicantLane  data={unconsidered}
                            rescind={this.rescind}
                            lane={'unconsidered'}
                            dispatch={this.props.dispatch}/>
          </Col>
          <Col md={3}>
            <div> Considered </div>
            <ApplicantLane  data={considered}
                            rescind={this.rescind}
                            lane={'considered'}
                            dispatch={this.props.dispatch}/>
          </Col>
          <Col md={3}>
            <div> Interviews </div>
            <ApplicantLane  data={interviews}
                            rescind={this.rescind}
                            lane={'interviews'}
                            dispatch={this.props.dispatch}/>
          </Col>
          <Col md={3}>
            <div> Offers </div>
            <ApplicantLane  data={offers}
                            rescind={this.rescind}
                            lane={'offers'}
                            dispatch={this.props.dispatch}/>
          </Col>
        </Row>
      </Grid>
    </Container>
	);
	}
}
