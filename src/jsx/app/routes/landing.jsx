import { State, Navigation } from 'react-router';
import classNames from 'classnames';


class MainHero extends React.Component {
  render() {
    return (
      <div {...this.props}
           className={classNames(this.props.className,
                                 'homepage-hero')}>
        <Container style={{display:'table-cell', 'vertical-align':'middle'}}fixed>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

class Hero extends React.Component {
  render() {
    return (
      <div {...this.props}
           className={classNames(this.props.className,
                                 'homepage-hero')}>
        <Container fixed>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

class HeroHeader extends React.Component {
  render() {
    return (
      <div {...this.props}
           className={classNames(this.props.className,
                                 'homepage-hero-header')}>
        {this.props.children}
      </div>
    );
  }
}

class HeroHeader2 extends React.Component {
  render() {
    return (
      <div {...this.props}
           className={classNames(this.props.className,
                                 'homepage-hero-header2')}>
        {this.props.children}
      </div>
    );
  }
}

export default React.createClass({
  mixins: [State, Navigation],
  handleNavigation() {
    $('body').addClass('fade-out');
    setTimeout(() => {
      this.transitionTo('/app/dashboard');
    }, 250);
  },

  showLogin() {
     if ((this.props.currentUser)) {
       return {
         display: "none"
       };
     }
   },
  getLargeModal() {
    return (
      <Modal md>
    <ModalBody>
      <Grid>
        <Row>
          <Col sm={12} xs={12}>
          <PanelContainer noControls>
            <Panel>
              <PanelBody style={{padding: 5}}>
                <div className='text-center bg-darkblue fg-white'>
                  <h3 style={{margin: 0, padding: 25}}>Job Applicants</h3>
                </div>
                <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>
                  <div>Sign in to view and apply to jobs.</div>
                  <div style={{marginTop: 12.5, marginBottom: 12.5}}>
                    <a href="/auth/linkedin?employer=false">
                      <Button id='linkedin-btn' lg bsStyle='darkblue' type='submit' onClick={this.showLogin}>
                                <Icon glyph='icon-fontello-linkedin-6' />
                                <span>  Sign in <span className='hidden-xs'>with linkedin</span></span>
                              </Button>
                    </a>
                  </div>
                </div>
              </PanelBody>
            </Panel>
          </PanelContainer>
          </Col>
          <Col sm={12} xs={12}>
          <PanelContainer noControls>
            <Panel>
              <PanelBody style={{padding: 5}}>
                <div className='text-center bg-darkblue fg-white'>
                  <h3 style={{margin: 0, padding: 25}}>Employers</h3>
                </div>
                <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>
                  <div>Sign in to create job posts and consider candidates.</div>
                  <div style={{marginTop: 12.5, marginBottom: 12.5}}>
                    <a href="/auth/linkedin?employer=true">
                      <Button id='linkedin-btn' lg bsStyle='darkblue' type='submit' onClick={this.showLogin}>
                                <Icon glyph='icon-fontello-linkedin-6' />
                                <span>  Sign in <span className='hidden-xs'>with linkedin</span></span>
                              </Button>
                    </a>
                  </div>
                </div>
              </PanelBody>
            </Panel>
          </PanelContainer>
          </Col>
        </Row>
      </Grid>
    </ModalBody>
  </Modal>
    );
  },

  render() {
    const btnStyle = {
      color:'#2AA38B',
      'box-shadow': '0px 2px 20px 2px rgba(0,0,0,0.39)',
      'marginTop':'15px'
    };
    const btnStyle2 = {
      'backgroundColor':'#2AA38B',
       color:'white',
       'border':'1px solid #54D08B',
      'box-shadow': '0px 2px 20px 2px rgba(0,0,0,0.39)',
      'marginTop':'15px'
    };

    return (
      <Container id='homepage-container'>
    <div>
      <MainHero className='text-center ' style={{height: '100vh', display: 'table', width:
        '100%', backgroundImage: 'url(/imgs/mploy_landingBg.jpg)', backgroundRepeat:
        'no-repeat', backgroundSize: 'cover', overflow: 'hidden'}}>
        <img src='/imgs/mploy_all_white.png' width='100' verticalstyle={{marginTop: 5}} />
        <h1 style={{color: 'white'}}>Job hunting for modern times.</h1>
        <h4 style={{color: 'white'}}> Find and create jobs while staying informed </h4>
        <Button lg bsStyle='white' onClick={ModalManager.create.bind(this, this.getLargeModal())}
          style={btnStyle}> Login/Signup </Button>
      </MainHero>
    </div>
    <Hero>
      <div className='text-center'>
        <div>
          <Icon style={{ 'fontSize': '10rem',color: '#3BB58C'}} glyph="icon-stroke-gap-icons-Timer"
          />
        </div>
      </div>
      <HeroHeader style={{ 'marginBottom': '35px'}}>{"Time is money."}</HeroHeader>
      <p className='text-center'>
        MPLOY streamlines both sides of the hiring process. Candidates always know the status
        of their applications and employers can easily view applicants to find the
        best match.
      </p>
    </Hero>
    <Hero style={{ 'backgroundColor': '#F8F8F8'}}>
      <div className='text-center'>
        <div>
          <Icon style={{ 'fontSize': '10rem',color: '#3BB58C'}} glyph="icon-simple-line-icons-speedometer"
          />
        </div>
      </div>
      <HeroHeader style={{ 'marginBottom': '35px'}}>
        <span>{"Track your efforts."}</span></HeroHeader>

      <Grid className='hidden-xs'>
        <Row>
          <Col style={{overflow: 'hidden', 'textAlign': 'right'}} sm={6} xs={12}>
          <h2 style={{ 'fontWeight':300, color: '#395660'}}> For Job Seekers </h2>
          <h3 style={{color: '#395660'}}> Your Dashboard</h3>
          <p style={{marginTop: 10}}>
            No more wondering if an employer has viewed your app or not. Your dashboard updates
            any time an employer makes a decision with your application!
          </p>
          <h3 style={{color: '#395660'}}> Notifications</h3>
          <p>Get notified whenever an employer updates your application.</p>
          <p>
          </p>
          <h3 style={{color: '#395660'}}> Data Visualization</h3>
          <p>
            With MPLOY you have a <strong>dashboard</strong> and <strong>charts</strong>          that update if an employer decides to accept <em>or</em> reject your application
            so you always know where you stand.
          </p>
          </Col>
          <Col sm={6} xs={12} collapseLeft collapseRight>
          <div className='hidden-xs text-right'>
            <img style={{ 'max-width':1100}} src='/imgs/user_dashboard_mploy.png' />
          </div>
          <div className='visible-xs text-center'>
            <img width='250' src='/imgs/user_mobile_dashboard_mploy.png' />
          </div>
          </Col>
        </Row>
        <hr style={{margin: '50px 0px', 'borderTop': '1px solid #C0C0C0'}}/>

        <Row>
          <Col sm={6} xs={12} md={6}>
          <div style={{ float: 'right'}} className='hidden-xs text-right'>
            <img width='1100' src='/imgs/emp_dashboard_mploy.png' />
          </div>
          </Col>
          <Col xs={12} md={6} sm={6} collapseLeft collapseRight>
          <h2 style={{ 'fontWeight':300,color: '#395660'}}> For Employers </h2>
          <h3 style={{color: '#395660'}}> Your Dashboard</h3>
          <p style={{marginTop: 10}}>
            Visually track all candidates and their status in your hiring process. Save time
            and quickly see how much of a "match" each candidate is before viewing
            their resume.
          </p>
          <h3 style={{color: '#395660'}}> Create Jobs</h3>
          <p>Easily add a new job post for your company. Specify which level of education,
            visa status, and skills you would require your applicants to have.</p>
          <p>
          </p>
          <h3 style={{color: '#395660'}}> Manage Job Postings</h3>
          <p>
            Easily see all current open job postings. Delete any filled positions in a few clicks.
          </p>
          </Col>
        </Row>
      </Grid>

      <Grid className='visible-xs'>
        <Row>
          <Col style={{overflow: 'hidden'}} sm={6} xs={12}>
          <h2 style={{ 'fontWeight':300, color: '#395660'}}> For Job Seekers </h2>
          <h3 style={{color: '#395660'}}> Your Dashboard</h3>
          <p style={{marginTop: 10}}>
            No more wondering if an employer viewed your app or not. Your dashboard updates as
            soon as an employer makes a decision with your application!
          </p>
          <h3 style={{color: '#395660'}}> Notifications</h3>
          <p>Get notified once an employer updates your application.</p>
          <p>
          </p>
          <h3 style={{color: '#395660'}}> Data Visualization</h3>
          <p>
            With MPLOY you have a <strong>dashboard</strong> that updates if an employer
            decides to accept <em>or</em> reject your application.
          </p>
          </Col>
          <Col sm={6} xs={12} collapseLeft collapseRight>
          <div className='visible-xs text-center'>
            <img style={{maxWidth: '350px', 'marginTop': '30px'}} src='/imgs/user_mobile_dashboard_mploy.png'
            />
          </div>
          </Col>
        </Row>
        <hr style={{margin: '50px 0px', 'borderTop': '1px solid #C0C0C0' }}/>
        <Row>
          <Col xs={12} md={6} sm={6} collapseLeft collapseRight>
          <h2 style={{ 'fontWeight':300,color: '#395660'}}> For Employers </h2>
          <h3 style={{color: '#395660'}}> Your Dashboard</h3>
          <p style={{marginTop: 10}}>
            Visually track all candidates and their status in your hiring process. Save time
            and quickly see how much of a "match" each candidate is before viewing
            their resume.
          </p>
          <h3 style={{color: '#395660'}}> Create Jobs</h3>
          <p>Easily add a new job post for your company. Specify which level of education,
            visa status, salary rate, and more that you would require your applicants
            to have.</p>
          <p>
          </p>
          <h3 style={{color: '#395660'}}> Manage Job Postings</h3>
          <p>
            Easily see all current open job postings. Delete any un-needed positions in a few
            clicks.
          </p>
          </Col>
          <Col sm={6} xs={12} md={6} collapseLeft collapseRight>
          <div className='visible-xs text-center'>
            <img style={{maxWidth: '350px', 'marginTop': '30px'}} src='/imgs/emp_mobile_jobpost_mploy.png'
            />
          </div>
          </Col>
        </Row>
      </Grid>
    </Hero>
    <Hero>
      <div className='text-center'>
        <Icon style={{ 'fontSize': '10rem',color: '#3BB58C'}} glyph="icon-simple-line-icons-cup"
        />
      </div>
      <HeroHeader2 style={{color: '#395660', marginBottom: '35px'}}>{"Let's get to work!"}</HeroHeader2>
      <div className='text-center'>
        <p className='text-center'>
          Find your next great job or talent with MPLOY.
        </p>
        <Button lg bsStyle='white' onClick={ModalManager.create.bind(this, this.getLargeModal())}
          style={btnStyle2}> Login/Signup </Button>
      </div>
    </Hero>
  </Container>
    );
  }
});
