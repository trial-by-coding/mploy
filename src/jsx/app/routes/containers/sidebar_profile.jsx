import classNames from 'classnames';
import ApplicantSidebar from 'routes/components/applicant_sidebar';
import EmployerSidebar from 'routes/components/employer_sidebar';
import { connect } from 'react-redux';
import actions from 'redux/actions';


@connect(state => state)
export default class SideBarContainer extends React.Component {
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

const { dispatch } = this.props;

 if( !this.props.user ) {
   return ( <div>Loading...</div>);
 }

  return (
    <Container id='body' className='social'>
      <div>
        <ApplicantSidebar
        dispatch={dispatch}
        firstname={firstname}
        lastname={lastname}
        profile_picture={profile_picture}
        />
      </div>
    </Container>

  );
 }
}
