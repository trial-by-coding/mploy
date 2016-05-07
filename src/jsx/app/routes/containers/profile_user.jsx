import classNames from 'classnames';
import Profile from 'routes/components/profile';
import { connect } from 'react-redux';
import { Link, History } from 'react-router';
import actions from 'redux/actions';

@connect(state => state)
export default class ProfileContainer extends React.Component {
  constructor(props){
    super(props);
  }
  componentWillMount() {
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
  const linkedin_url = this.props.user.linkedin_url;

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
        linkedin_url={linkedin_url}
        />
      </div>
    </Container>
  );
 }
}
