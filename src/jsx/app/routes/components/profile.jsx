import classNames from 'classnames';

import { connect } from 'react-redux';

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';


export default class Profile extends React.Component{

  render() {

    const user = this.props;
    console.log('Profile >>>>', this.props);

    return (
      <Container id='body' className='social'>
      {/*Begin: background photo*/}
      <div style={{height: 350, marginTop: -25, backgroundImage: 'url(/imgs/shots/Blick_auf_Manhattan.JPG)', backgroundSize: 'cover', position: 'relative', marginBottom: 25, backgroundPosition: 'center'}}>
      <div className='social-cover' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
      </div>

      <div className='social-desc'>
          <div>
              <h1 className='fg-white'>
                {user.location}
              </h1>
              <h5 className='fg-white' style={{opacity: 0.8}}>
                {/*today's date*/}
              </h5>

          </div>
      </div>
      <div className='social-avatar'>
          <Img src={user.profile_picture} height='100' width='100' style={{display: 'block', borderRadius: 100, border: '2px solid #fff', margin: 'auto', marginTop: 50}} />
          <h4 className='fg-white text-center'>
            {user.firstname} {user.lastname}
            </h4>
          <h5 className='fg-white text-center' style={{opacity: 0.8}}>
                {user.industry}
            </h5>
      </div>
  </div>
  {/*End: background photo*/}

        <Grid>
          <Row>
            <Col sm={6} collapseRight>
              <PanelContainer>
                <PanelBody style={{padding: 25, paddingTop: 12.5}}>
                  <ul className="list-group">


                    {/*<li className="list-group-item">{user.email}</li>
                    <li className="list-group-item">{user.linkedin_headline}</li>
                    <li className="list-group-item">{user.linkedin_url}</li>
                    <li className="list-group-item">{user.resume}</li>
                    <li className="list-group-item">{user.employer}</li>*/}
                  </ul>
                </PanelBody>
              </PanelContainer>
            </Col>
          </Row>
        </Grid>
        {/*{this.props.children}*/}
      </Container>
    );
  }
}
