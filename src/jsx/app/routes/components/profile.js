import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, History } from 'react-router';
import actions from 'redux/actions';

export default class Profile extends React.Component{

goLinkedIn() {
  const user = this.props;
  window.open(user.linkedin_url);
};

render() {
  const user = this.props;

    return (
    <Container id='body' className='social'>
      <div style={{height: 350, marginTop: -25, backgroundImage: 'url(/imgs/shots/Blick_auf_Manhattan.JPG)', backgroundSize: 'cover', position: 'relative', marginBottom: 25, backgroundPosition: 'center'}}>
        <div className='social-cover' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
          </div>
        <div className='social-desc'>
          <div>
              <h1 className='fg-white'>{user.location}</h1>
            <div>
              <h5 className='fg-white' style={{opacity: 0.8}}><Link to={user.email}>{user.email}</Link></h5>
            </div>
            <div>
              <h5 className='fg-white' style={{opacity: 0.8}}>{user.linkedin_headline}</h5>
            </div>
          </div>
      </div>
        <div className='social-avatar'>
          <Img src={user.profile_picture} height='100' width='100' style={{display: 'block', borderRadius: 100, border: '2px solid #fff', margin: 'auto', marginTop: 50}} />
            <h4 className='fg-white text-center'>{user.firstname} {user.lastname}</h4>
              <h5 className='fg-white text-center' style={{opacity: 0.8}}>{user.industry}</h5>
                <div className='text-center'>
                  <Button outlined inverse retainBackground bsStyle='brightblue' type='active' onClick={() => this.goLinkedIn()}>
                <span>LinkedIn</span>
            </Button>
          </div>
      </div>
  </div>

        <Grid>
          <Row>
            {/*<Col sm={6} collapseRight>*/}
            {/*</Col>*/}
          </Row>
        </Grid>
      </Container>
    );
  }
}
