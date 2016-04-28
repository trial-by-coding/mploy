import { Link, State, Navigation } from 'react-router';
import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

import { connect } from 'react-redux';

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

export default class Body extends React.Component {

	showLogin() {
		if ((this.props.currentUser)) {
			return {
				display: "none"
			};
		}
}

		render() {
				return (
					<Container id="body">
						<Grid>
							<Row>
  							<Col sm={6} collapseRight>
                  <PanelContainer>
                    <Panel>
                      <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                          <h3 style={{margin: 0, padding: 25}}>Candidates</h3>
                        </div>
								   <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>
                     <div>You need to sign in for those awesome features</div>
                        <div style={{marginTop: 12.5, marginBottom: 12.5}}>
													<a href="/auth/linkedin?employer=false">
													<Button id='linkedin-btn' lg bsStyle='darkblue' type='submit' onClick={this.showLogin.bind(this).call()}>
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
							<Col sm={6} collapseRight>
                  <PanelContainer>
                    <Panel>
                      <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                          <h3 style={{margin: 0, padding: 25}}>Employers</h3>
                        </div>
								   <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>
                     <div>You need to sign in for those awesome features</div>
                        <div style={{marginTop: 12.5, marginBottom: 12.5}}>
													<a href="/auth/linkedin?employer=true">
													<Button id='linkedin-btn' lg bsStyle='darkblue' type='submit' onClick={this.showLogin.bind(this).call()}>
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
				</Container>
				);
		}
}
