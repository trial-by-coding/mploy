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
    this.props.dispatch(actions.getApplicantUnconsidered());
    this.props.dispatch(actions.getApplicantConsidered());
    this.props.dispatch(actions.getApplicantInterviews());
    this.props.dispatch(actions.getApplicantOffers());

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
        		{ apps.map(item => <ApplicantLane data={unconsidered}
                                              dispatch={dispatch}/>) }
          </Col>
        </Row>
      </Grid>
    </Container>
	);
	}
}
