import { Link, State, Navigation } from 'react-router';

import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

var Body = React.createClass({
  mixins: [State, Navigation],
  back: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.transitionTo('/app/blank');
  },
  componentDidMount: function() {
    $('html').addClass('authentication');
  },
  componentWillUnmount: function() {
    $('html').removeClass('authentication');
  },
  render: function() {
    return (
      <Container id='auth-container' className='login'>
        <Container id='auth-row'>
          <Container id='auth-cell'>
            <Grid>
              <Row>
                <Col sm={12}>
                  <PanelContainer noControls>
                    <Panel>
                      <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                          <h3 style={{margin: 0, padding: 25}}>Sign in to mploy</h3>
                        </div>
                        <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>
                          <div>You need to sign in for those awesome features</div>
                          <div style={{marginTop: 12.5, marginBottom: 12.5}}>
                            <Button id='linkedin-btn' lg bsStyle='darkblue' type='submit' onClick={this.back}>
                              <Icon glyph='icon-fontello-linkedin-6' />
                              <span>Sign in <span className='hidden-xs'>with linkedin</span></span>
                            </Button>
                          </div>
                          <div>
                            <a id='github-link' href='#' onClick={this.back}><Icon glyph='icon-fontello-github' /><span> or with github</span></a>
                          </div>
                        </div>
                        <div>
                          <div className='text-center' style={{padding: 12.5}}>
                            or use your mploy account
                          </div>
                          <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                            <Form onSubmit={this.back}>
                              <FormGroup>
                                <InputGroup lg>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-mail' />
                                  </InputGroupAddon>
                                  <Input autoFocus type='email' id='emailaddress' className='border-focus-blue' placeholder='support@sketchpixy.com' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup lg>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-key' />
                                  </InputGroupAddon>
                                  <Input type='password' id='password' className='border-focus-blue' placeholder='password' />
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <Grid>
                                  <Row>
                                    <Col xs={6} collapseLeft collapseRight style={{paddingTop: 10}}>
                                      <Link to='/app/signup'>Create a mploy account</Link>
                                    </Col>
                                    <Col xs={6} collapseLeft collapseRight className='text-right'>
                                      <Button outlined lg type='submit' bsStyle='blue' onClick={this.back}>Login</Button>
                                    </Col>
                                  </Row>
                                </Grid>
                              </FormGroup>
                            </Form>
                          </div>
                        </div>
                      </PanelBody>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
            </Grid>
          </Container>
        </Container>
      </Container>
    );
  }
});

@SidebarMixin
export default class extends React.Component {
  render() {
    var classes = classNames({
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
