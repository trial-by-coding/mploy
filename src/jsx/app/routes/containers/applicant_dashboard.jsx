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
