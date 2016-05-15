import classnames from 'classnames';
import EmployerLane from 'routes/components/employerLane';
import { connect } from 'react-redux';
import actions from 'redux/actions';


@connect(state => state)
export default class EmployerDashboard extends React.Component {
	constructor(props) {
		super(props);
  }

  // Function that moves an application from one lane to the next depending on it's status. Also
  // sends AJAX request to change the status in the server database.
  advance = (appID, status, item, index)  => {
    if(status === 'unconsidered')     { this.props.dispatch(actions.removeUnconsidered(index));
                                        this.props.dispatch(actions.addConsidered(item));}
    else if(status === 'considered')  { this.props.dispatch(actions.removeConsidered(index));
                                        this.props.dispatch(actions.addInterview(item));}
    else if(status === 'interviews')  { this.props.dispatch(actions.removeInterview(index));
                                        this.props.dispatch(actions.addOffer(item));}
    else if(status === 'offers')      { this.props.dispatch(actions.removeOffer(index)); }

    this.props.dispatch(actions.advanceEmployerRequest(appID));
  };

  // Function that moves an application from one lane to the previous depending on it's status. Also
  // sends AJAX request to change the status in the server database.
  revert = (appID, status, item, index) => {
    if(status === 'unconsidered')     { this.props.dispatch(actions.removeUnconsidered(index)); }
    else if(status === 'considered')  { this.props.dispatch(actions.removeConsidered(index));
                                        this.props.dispatch(actions.addUnconsidered(item));}
    else if(status === 'interviews')  { this.props.dispatch(actions.removeInterview(index));
                                        this.props.dispatch(actions.addConsidered(item));}
    else if(status === 'offers')      { this.props.dispatch(actions.removeOffer(index)),
                                        this.props.dispatch(actions.addInterview(item)); }

    this.props.dispatch(actions.revertEmployerRequest(appID));
  };

  // Function that removes an application from the lane and deletes the application from the server.
  reject = (appID, status, index) => {
    ModalManager.remove();
    if(status === 'unconsidered')     { this.props.dispatch(actions.removeUnconsidered(index));
                                        this.props.dispatch(actions.nextUnconsidered(index));}
    else if(status === 'considered')  { this.props.dispatch(actions.removeConsidered(index));
                                        this.props.dispatch(actions.nextConsidered(index));}
    else if(status === 'interviews')  { this.props.dispatch(actions.removeInterview(index));
                                        this.props.dispatch(actions.nextInterview(index));}
    else if(status === 'offers')      { this.props.dispatch(actions.removeOffer(index));
                                        this.props.dispatch(actions.nextOffer(index));}


    this.props.dispatch(actions.rejectEmployerRequest(appID));
  };

  // Function used for a modal that moves an application forward and changes the status on the server database 
  // while opening the next modal.
  accept = (appID, status, item, index) => {
    ModalManager.remove();
    this.advance(appID, status, item, index);
  };


	render() {
    const laneTemplate = {
      'background-color':'white',
      'border-radius': '0px 0px 5px 5px',
       padding: '20px 10px 0px 10px',
      'margin-bottom': '20px',
      'box-shadow': '0px 3px 4px 0px rgba(0,0,0,0.20)'
    };

    const lanePad = {
      'padding':'0px 10px',
    };

    const laneHeader = {
      'box-shadow': '0px 2px 4px 0px rgba(0,0,0,0.20)',
      'background-color':'white',    //#2AA38B
      'height': '40px',
      'textAlign': 'center',
      'border-radius': '5px 5px 0px 0px',
    };

    const panelH = {
      'padding-top': '10px',
      'margin-top': '0px',
      'margin-bottom': '0px',
      'color':'#8D979E',
      'font-weight': '400!important'
    };

    const panelHr = {
      'margin-top': '8px',
      'margin-bottom': '25px',
      'border': '0',
      'border-top': '3px solid #2AA38B',
       width: '60%',
    };

    let unconsidered = this.props.unconsidered;
    let considered = this.props.considered;
    let interviews = this.props.interviews;
    let offers = this.props.offers;
    let currentModal = this.props.currentModal;

    if(this.props.posts.length === 0){
      return (
        <Container id='body'>
          <Grid>
            <Row>
              <Col sm={12} smCollapseRight>
                <PanelContainer>
                  <Panel>
                    <PanelBody style={{padding: 0}}>
                      <Grid>
                        <Row>
                          <Col xs={12}>
                            <h4><Icon glyph='icon-fontello-attention-alt-1' style={{textAlign: 'center'}}>  Create job postings then process applicants here on your board.</Icon></h4>
                          </Col>
                        </Row>
                      </Grid>
                    </PanelBody>
                  </Panel>
                </PanelContainer>
                </Col>
              </Row>
          </Grid>
        </Container>
      );
    }

    if(this.props.posts.length && this.props.currentPost.job_title && unconsidered.length === 0 && considered.length === 0 && interviews.length === 0 && offers.length === 0){
      return (
        <Container id='body'>
          <Grid>
            <Row>
              <Col sm={12} smCollapseRight>
                <PanelContainer>
                  <Panel>
                    <PanelBody style={{padding: 0}}>
                      <Grid>
                        <Row>
                          <Col xs={12}>
                              <h4><Icon glyph='icon-fontello-attention-alt-1' style={{textAlign: 'center'}}> No candidates have applied to the {this.props.currentPost.job_title} position with {this.props.currentPost.company_name} yet.</Icon></h4>
                            </Col>
                          </Row>
                        </Grid>
                      </PanelBody>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
            </Grid>
        </Container>
      );
    }

    if(!this.props.currentPost.job_title){
      return (
        <Container id='body'>
          <Grid>
            <Row>
              <Col sm={12} smCollapseRight>
                <PanelContainer>
                  <Panel>
                    <PanelBody style={{padding: 0}}>
                      <Grid>
                        <Row>
                          <Col xs={12}>
                              <h4><Icon glyph='icon-fontello-attention-alt-1' style={{textAlign: 'center'}}> Select a job post from the sidebar</Icon></h4>
                            </Col>
                          </Row>
                        </Grid>
                      </PanelBody>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
            </Grid>
        </Container>
      );
    }

		return (
		<Container id='body'>
      <Grid>
        <Row>
          <Col clearfix style={lanePad} xs={12} sm={6} md={3}>
            <div style={laneHeader} >
              <h4 style={panelH} > Unconsidered </h4>
              <hr style={panelHr}/>
            </div>
            <div style={laneTemplate} className={classnames('col-md-12 col-sm-12 col-xs-12')} >
              <EmployerLane data={unconsidered}
                            lane={'unconsidered'}
                            advance={this.advance}
                            accept={this.accept}
                            revert={this.revert}
                            reject={this.reject}
                            dispatch={this.props.dispatch}/>
            </div>
          </Col>
          <Col clearfix style={lanePad} xs={12} sm={6} md={3}>
            <div style={ laneHeader } >
              <h4 style={panelH}> Considered </h4>
              <hr style={panelHr}/>
            </div>
            <div style={laneTemplate} className={classnames('col-md-12 col-sm-12 col-xs-12')} >
          		<EmployerLane data={considered}
                            lane={'considered'}
                            advance={this.advance}
                            accept={this.accept}
                            revert={this.revert}
                            reject={this.reject}
                            dispatch={this.props.dispatch}/>
              </div>
          </Col>
          <Col clearfix style={lanePad} xs={12} sm={6} md={3}>
            <div style={ laneHeader } >
              <h4 style={panelH}> Interviews </h4>
              <hr style={panelHr}/>
            </div>
            <div style={laneTemplate} className={classnames('col-md-12 col-sm-12 col-xs-12')} >
          		<EmployerLane data={interviews}
                            lane={'interviews'}
                            advance={this.advance}
                            accept={this.accept}
                            revert={this.revert}
                            reject={this.reject}
                            dispatch={this.props.dispatch}/>
              </div>
          </Col>
          <Col clearfix style={lanePad} xs={12} sm={6} md={3}>
            <div style={ laneHeader } >
              <h4 style={panelH}> Offers </h4>
              <hr style={panelHr}/>
            </div>
            <div style={laneTemplate} className={classnames('col-md-12 col-sm-12 col-xs-12')} >
          		<EmployerLane data={offers}
                            lane={'offers'}
                            advance={this.advance}
                            accept={this.accept}
                            revert={this.revert}
                            reject={this.reject}
                            dispatch={this.props.dispatch}/>
            </div>
          </Col>
        </Row>
      </Grid>
    </Container>
    );
	}
}
