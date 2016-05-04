import classNames from 'classnames';
import Profile from 'routes/components/profile';
import { connect } from 'react-redux';
import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

@connect(state => state)
export default class ProfileContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchUser());
  }
  constructor(props){
    super(props);
}

render() {

  const firstname  = this.props.user.firstname;
  const lastname = this.props.user.lastname;
  const profile_picture = this.props.user.profile_picture;
  const email = this.props.user.email;
  const industry = this.props.user.industry;
  const linkedin_headline = this.props.user.linkedin_headline;
  const location = this.props.user.location;
  const resume = this.props.user.resume;
  const employer = this.props.user.employer;

const { dispatch } = this.props;

 if( !this.props.user ) {
   return ( <div>Loading...</div>);
 }

  return (
    <Container id='body' className='social'>
      <div>
        <Profile
        dispatch={dispatch}
        firstname={firstname}
        lastname={lastname}
        profile_picture={profile_picture}
        email={email}
        industry={industry}
        linkedin_headline={linkedin_headline}
        location={location}
        resume={resume}
        employer={employer}
        />
      </div>
    </Container>
  );
 }
}
