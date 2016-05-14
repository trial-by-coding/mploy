// import { Link, State, Navigation } from 'react-router';
// import classNames from 'classnames';
// import { connect } from 'react-redux';
// import actions from 'redux/actions';

// export default class Body extends React.Component {
//   constructor(props) {
//     super(props);
//  }
//   	showLogin() {
//   		if ((this.props.currentUser)) {
//   			return {
//   				display: "none"
//   			};
//   		}
//    }
// 		render() {
//       const middle = {
//         'marginTop': '15%',
//         'marginRight': '15%',
//         'marginLeft': '15%'
//       };
//       const wallpaper = {
//         'backgroundColor':'white'
//       };
// 				return (
//           <Container id="body" style={wallpaper}>
//     <Grid style={middle}>
//       <Row>
//         <Col sm={6} collapseRight>
//         <PanelContainer>
//           <Panel>
//             <PanelBody style={{padding: 0}}>
//               <div className='text-center bg-darkblue fg-white'>
//                 <h3 style={{margin: 0, padding: 25}}>Job Applicants</h3>
//               </div>
//               <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>
//                 <div>Sign in to view and apply to jobs.</div>
//                 <div style={{marginTop: 12.5, marginBottom: 12.5}}>
//                   <a href="/auth/linkedin?employer=false">
//                     <Button id='linkedin-btn' lg bsStyle='darkblue' type='submit' onClick={this.showLogin.bind(this).call()}>
//                               <Icon glyph='icon-fontello-linkedin-6' />
//                               <span>  Sign in <span className='hidden-xs'>with linkedin</span></span>
//                             </Button>
//                   </a>
//                 </div>
//               </div>
//             </PanelBody>
//           </Panel>
//         </PanelContainer>
//         </Col>
//         <Col sm={6} collapseRight>
//         <PanelContainer>
//           <Panel>
//             <PanelBody style={{padding: 0}}>
//               <div className='text-center bg-darkblue fg-white'>
//                 <h3 style={{margin: 0, padding: 25}}>Employers</h3>
//               </div>
//               <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>
//                 <div>Sign in to create job posts and consider candidates.</div>
//                 <div style={{marginTop: 12.5, marginBottom: 12.5}}>
//                   <a href="/auth/linkedin?employer=true">
//                     <Button id='linkedin-btn' lg bsStyle='darkblue' type='submit' onClick={this.showLogin.bind(this).call()}>
//                               <Icon glyph='icon-fontello-linkedin-6' />
//                               <span>  Sign in <span className='hidden-xs'>with linkedin</span></span>
//                             </Button>
//                   </a>
//                 </div>
//               </div>
//             </PanelBody>
//           </Panel>
//         </PanelContainer>
//         </Col>
//       </Row>
//     </Grid>
//   </Container>
// 				);
// 		}
// }


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
    const middle = {
      'marginTop': '15%',

    };
    const wallpaper = {
      'backgroundColor':'white'
    };

    return (
      <Modal md>
        <ModalBody>
    <Grid style={middle}>
      <Row>
        <Col sm={12} xs={12} >
        <PanelContainer>
          <Panel>
            <PanelBody style={{padding: 0}}>
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
        <Col sm={12} xs={12} >
        <PanelContainer>
          <Panel>
            <PanelBody style={{padding: 0}}>
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
        <ModalFooter>
        </ModalFooter>
      </Modal>
    );
  },

  render() {
    const btnStyle = {
      color:'#2AA38B', 
      'box-shadow': '0px 2px 20px 2px rgba(0,0,0,0.39)',
      'marginTop':'15px'
    }
    return (
      <Container id='homepage-container'>
        <Button bsStyle='deepred' id='demo-btn' onClick={this.handleNavigation}>View Demo</Button>
        <div>
          <MainHero className='text-center ' style={{height: '100vh', display:'table', width:'100%', backgroundImage: 'url(/imgs/mploy_landingBg.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', overflow: 'hidden'}}>
            <img src='/imgs/mploy_all_white.png' width='100' verticalstyle={{marginTop: 5}} />
            <h1 style={{color:'white'}}>Job hunting for modern times.</h1>
            <h4 style={{color:'white'}}> Find and create jobs with real time updates </h4>
            <Button lg bsStyle='white' onClick={ModalManager.create.bind(this, this.getLargeModal())} style={btnStyle}> Login/Signup </Button>
          </MainHero>
        </div>
        <Hero>
          <HeroHeader>
            <span>{"No more wondering."}</span></HeroHeader>
          <HeroHeader2 style={{marginBottom:'30px'}}>{"Stay informed. "}</HeroHeader2>
          <Grid>
            <Row>
              <Col style={{overflow:'hidden'}} sm={7} xs={12}  >
                <h3> For Job Seekers </h3>
                <p style={{marginTop: 10}}>
                  Looking for a new career can be tricky. Especially if an employer doesn't notify you if you are being considered or not.
                </p>
                <p>
                 With MPLOY you have a <strong>real time dashboard</strong> that updates if an empolyer decides to accept <em>or</em> reject your application.
                </p>
              </Col>
              <Col sm={5} collapseLeft collapseRight>
                <div className='hidden-xs text-right'>
                  <img width='700' src='/imgs/user_dashboard_mploy.png' />
                </div>
                <div className='visible-xs text-center'>
                  <img width='250' src='/imgs/homepage/reactcode.png' />
                </div>
              </Col>
            </Row>  
            <hr style={{marginBottom:'40px'}}/>          
            <Row>
              <Col  sm={7} xs={12}  >
                <div style={{ marginRight:' 100px', float: 'right'}} className='hidden-xs text-right'>
                  <img width='700' src='/imgs/user_dashboard_mploy.png' />
                </div>
                <div className='visible-xs text-center'>
                  <img width='250' src='/imgs/homepage/reactcode.png' />
                </div>
              </Col>
              <Col sm={5} collapseLeft collapseRight>
                <h3> For Employers </h3>
                <p style={{marginTop: 10}}>
                  Looking for a new career can be tricky. Especially if an employer doesn't notify you if you are being considered or not.
                </p>
                <p>
                 With MPLOY you have a <strong>real time dashboard</strong> that updates if an empolyer decides to accept <em>or</em> reject your application.
                </p>
                
              </Col>
            </Row>
          </Grid>
        </Hero>
        <Hero>
          <HeroHeader2>{"Bootstrap on Steroids"}</HeroHeader2>
          <div className='text-center' style={{marginTop: 25, marginBottom: 25}}>
            <div className='hidden-xs'>
              <img src='/imgs/homepage/bootstrapreact.png' />
            </div>
            <div className='visible-xs'>
              <img width='250' src='/imgs/homepage/bootstrapreact.png' />
            </div>
          </div>
          <p className='text-center'>
            Rubix implements custom React Components for Bootstrap enabling you to write shorter, semantic markup. Say Goodbye to unwieldy classnames and spaghetti code!
          </p>
        </Hero>
        <Hero>
          <HeroHeader>{"Internationalization and Localization"}</HeroHeader>
          <HeroHeader2>{"Mozilla L20n.js"}</HeroHeader2>
          <div className='text-center' style={{marginTop: 25, marginBottom: 25}}>
            <div className='hidden-xs'>
              <img src='/imgs/homepage/mozflags.png' />
            </div>
            <div className='visible-xs'>
              <img width='250' src='/imgs/homepage/mozflags.png' />
            </div>
          </div>
          <p className='text-center'>
            {"Mozilla L20n is a developer friendly framework that places languages in the localizer's hand to create better translations. "}
          </p>
          <p className='text-center'>
            {"It removes the need for developers to thoroughly understand the specifics of a natural language and provides an opportunity for localizers to create better translations. Rubix ships with custom React component bindings for the framework."}
          </p>
        </Hero>
        <Hero>
          <HeroHeader2>{"Rubix Charts"}</HeroHeader2>
          <div className='text-center' style={{marginTop: 25, marginBottom: 25}}>
            <div className='hidden-xs'>
              <img src='/imgs/homepage/rubixcharts.png' />
            </div>
            <div className='visible-xs'>
              <img width='250' src='/imgs/homepage/rubixcharts.png' />
            </div>
          </div>
          <p className='text-center'>
            Rubix Charts is an aesthetically beautiful, hand-crafted charting library created exclusively for Rubix Admin app. We used the awesome D3.JS library to write all the charting components (Line, Area, Stacked, Bar, Column, Pie and Donut) that power Rubix Charts.
          </p>
        </Hero>
        <Hero>
          <HeroHeader>{"Create complex layouts easily"}</HeroHeader>
          <HeroHeader2>{"Panels"}</HeroHeader2>
          <div className='text-center' style={{marginTop: 25, marginBottom: 25}}>
            <div className='hidden-xs'>
              <img src='/imgs/homepage/panels.png' />
            </div>
            <div className='visible-xs'>
              <img width='250' src='/imgs/homepage/panels.png' />
            </div>
          </div>
          <p className='text-center'>
            {"Rubix Panels empowers developers to create complex layouts in addition to the awesome Grid provided by Twitter Bootstrap. Pretty much every example page showcased in the demo makes use of Panels for layout."}
          </p>
        </Hero>
        <Hero style={{position: 'relative', zIndex: 2}}>
          <HeroHeader>
            <span>{"The Asset Pipeline "}</span>
            <sup><BLabel className='bg-deepred fg-white'>NEW!</BLabel></sup>
          </HeroHeader>
          <HeroHeader2>{"Gulp, Flip and Bless!"}</HeroHeader2>
          <div className='text-center' style={{marginTop: 25, marginBottom: 25}}>
            <div className='hidden-xs'>
              <img src='/imgs/homepage/assetpipeline.png' />
            </div>
            <div className='visible-xs'>
              <img width='250' src='/imgs/homepage/assetpipeline.png' />
            </div>
          </div>
          <p className='text-center'>
            {"Gulp is a streaming build system. It's use of streams and code-over-configuration makes for a simpler and more intuitive build system. Rubix's Asset Pipeline depends entirely on Gulp as its backbone. "}<strong>{"Everything is automated"}</strong>{": be it compiling JSX, SASS or even WebFonts!"}
          </p>
          <p className='text-center'>
            {"Rubix relies on Webpack which takes modules with dependencies and generates static assets representing those modules. We make use of Twitter's "}<strong>{"css-flip"}</strong>{" for RTL support and the awesome "}<strong>{"blesscss"}</strong>{" library for fixing IE9 selectors and stylesheet bug."}
          </p>
        </Hero>
        <Hero style={{position: 'relative', zIndex: 2}}>
          <HeroHeader>
            <span>{"Isomorphic Javascript "}</span>
            <sup><BLabel className='bg-deepred fg-white'>NEW!</BLabel></sup>
          </HeroHeader>
          <HeroHeader2>{"Render client code on the server!"}</HeroHeader2>
          <div className='text-center' style={{marginTop: 25, marginBottom: 25}}>
            <div className='hidden-xs'>
              <img src='/imgs/homepage/isomorphic.png' />
            </div>
            <div className='visible-xs'>
              <img width='250' src='/imgs/homepage/isomorphic.png' />
            </div>
          </div>
          <p className='text-center'>
            {"Rubix uses React-Router to provide routing client side and reuses the same routing logic for rendering compiled HTML from the server making your app SEO friendly."}
          </p>
        </Hero>
        <Hero style={{position: 'relative', zIndex: 2}}>
          <HeroHeader>
            <span>{"BrowserSync + React Hot Loader "}</span>
            <sup><BLabel className='bg-deepred fg-white'>NEW!</BLabel></sup>
          </HeroHeader>
          <HeroHeader2>{"Time-saving synchronised browser testing!"}</HeroHeader2>
          <div className='text-center' style={{marginTop: 25, marginBottom: 25}}>
            <video loop autoPlay width='100%'>
              <source src="/video/homepage/livereload.mp4" type="video/mp4" />
              <source src="/video/homepage/livereload.ogv" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className='text-center'>
            {"When you’re making responsive websites, there’s a lot of tweaking and testing to do. BrowserSync makes your workflow faster by "}<strong>synchronising URLs, interactions and code changes across multiple devices.</strong>{" BrowserSync is enabled for SASS files, Image files, Locale files and WebFonts."}
          </p>
          <p className='text-center'>
            {"Rubix comes integrated with React Hot loader for live editing of React components using Webpack's Hot Module Replacement."}
          </p>
        </Hero>
        <Hero style={{position: 'relative', zIndex: 2}}>
          <HeroHeader>
            <span>{"BabelJS "}</span>
            <sup><BLabel className='bg-deepred fg-white'>NEW!</BLabel></sup>
          </HeroHeader>
          <HeroHeader2>{"Use the next generation Javascript, today!"}</HeroHeader2>
          <div className='text-center' style={{marginTop: 25, marginBottom: 25}}>
            <img src='/imgs/homepage/babel.png' />
          </div>
          <p className='text-center'>
            {"Rubix uses Babel for Javascript transformations. It ships with a set of ES2015 syntax transformers. These allow you to use new syntax, right now without waiting for browser support. It also ships with built-in support for JSX."}
          </p>
        </Hero>
        <Hero style={{position: 'relative', zIndex: 2}}>
          <HeroHeader>
            <span>{"Multiple Language + Framework Integrations "}</span>
            <sup><BLabel className='bg-deepred fg-white'>NEW!</BLabel></sup>
          </HeroHeader>
          <div className='text-center' style={{marginTop: 25, marginBottom: 25}}>
            <img src='/imgs/homepage/rubix-implementations.png' />
          </div>
          <p className='text-center'>
            {"We will be providing implemention of Rubix in multiple languages/frameworks to ease development. Rubix 3.0 ships with a Ruby on Rails seed project with server side rendering powered by react-rails."}
          </p>
        </Hero>
        <Hero className='subtle-bottom-shadow'>
          <HeroHeader>{"One Last Thing"}</HeroHeader>
          <HeroHeader2>{"Fanatical Support!"}</HeroHeader2>
          <div className='text-center' style={{marginTop: 25, marginBottom: 25}}>
            <img src='/imgs/homepage/support.png' />
          </div>
          <p className='text-center'>
            {"We have already provided extensive documentation on using/implementing Rubix. However, we take this a step further by ensuring version releases (which includes bug fixes, new features etc) for the next 6 months and general support for 1 year."}
          </p>
        </Hero>
        <div>
          <Hero className='text-center' style={{height: 215, backgroundImage: 'url(/imgs/homepage/background.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', overflow: 'hidden', backgroundPosition: '0% 100%'}}>
            <h1 className='fg-white' style={{marginTop: 0, marginBottom: 25, fontWeight: 100}}>So what are you waiting for?</h1>
            <Button lg outlined inverse retainBackground bsStyle='red' onClick={this.handleNavigation}>Click here to View Demo</Button>
          </Hero>
        </div>
      </Container>
    );
  }
});
