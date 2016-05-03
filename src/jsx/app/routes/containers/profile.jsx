import classNames from 'classnames';

import { connect } from 'react-redux';
import SidebarMixin from 'global/jsx/sidebar_component';
import Header from 'routes/components/header';
import Sidebar from 'routes/components/applicant_sidebar';
import Footer from 'routes/components/footer';


import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';


class Body extends React.Component{

  render() {
    return (
      <Container id='body' className='social'>
      {/*Begin: background photo*/}
      <div style={{height: 350, marginTop: -25, backgroundImage: 'url(/imgs/shots/Blick_auf_Manhattan.JPG)', backgroundSize: 'cover', position: 'relative', marginBottom: 25, backgroundPosition: 'center'}}>
      <div className='social-cover' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
      </div>

      <div className='social-desc'>
          <div>
              <h1 className='fg-white'>
                {/*user city,st*/}
              </h1>
              <h5 className='fg-white' style={{opacity: 0.8}}>
                {/*today's date*/}
              </h5>

          </div>
      </div>
      <div className='social-avatar'>
          <Img src= '' height='100' width='100' style={{display: 'block', borderRadius: 100, border: '2px solid #fff', margin: 'auto', marginTop: 50}} />
          <h4 className='fg-white text-center'>
              {/*linkedin name: first, last*/}
            </h4>
          <h5 className='fg-white text-center' style={{opacity: 0.8}}>
              {/*linkedin current job title/specialty*/}
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
                  {/*<li className="list-group-item">{users.username}</li>
                  <li className="list-group-item">{users.firstname}</li>
                  <li className="list-group-item">{users.lastname}</li>
                  <li className="list-group-item">profile_picture</li>
                  <li className="list-group-item">email</li>
                  <li className="list-group-item">industry</li>
                  <li className="list-group-item">linkedin_headline</li>
                  <li className="list-group-item">location</li>
                  <li className="list-group-item">linkedin_url</li>
                  <li className="list-group-item">resume</li>
                  <li className="list-group-item">employer</li>*/}
                  </ul>
                </PanelBody>
              </PanelContainer>
            </Col>
          </Row>
        </Grid>
        {this.props.children}
      </Container>
    );
  }
}


@SidebarMixin
export default class extends React.Component {
  render() {
    const classes = classNames({
      'container-open': this.props.open
    });

    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Header />
        <Body />
        <Footer />
      </Container>
    );
  }
}
