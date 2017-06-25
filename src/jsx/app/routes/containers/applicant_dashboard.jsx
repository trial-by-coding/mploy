import classnames from 'classnames';
import ApplicantLane from 'routes/components/applicantLane';
import { connect } from 'react-redux';
import actions from 'redux/actions';


@connect(state => state)
export default class ApplicantDashboard extends React.Component {
	constructor(props) {
		super(props);
	}

  rescind = (appID, index, status) => {
    if(status === 'unconsidered')     { this.props.dispatch(actions.removeUnconsidered(index));}
    else if(status === 'considered')  { this.props.dispatch(actions.removeConsidered(index));}
    else if(status === 'interviews')  { this.props.dispatch(actions.removeInterview(index));}
    else if(status === 'offers')      { this.props.dispatch(actions.removeOffer(index));}
    this.props.dispatch(actions.rescindApp(appID));
  };

	render() {
    const laneTemplate = {
    'backgroundColor':'white',
    'borderRadius': '0px 0px 5px 5px',
     padding: '20px 10px 0px 10px',
    'marginBottom': '20px',
    'boxShadow': '0px 3px 4px 0px rgba(0,0,0,0.20)'
	};

    const lanePad = {
      'padding':'0px 10px',
    };

    const laneHeader = {
      'boxShadow': '0px 2px 4px 0px rgba(0,0,0,0.20)',
      'backgroundColor':'white',    //#2AA38B
      'height': '40px',
      'textAlign': 'center',
      'borderRadius': '5px 5px 0px 0px',
    };

    const panelH = {
      'paddingTop': '10px',
      'marginTop': '0px',
      'marginBottom': '0px',
      'color':'#8D979E',
      'fontWeight': '400!important'
    };

    const panelHr = {
      'marginTop': '8px',
      'marginBottom': '25px',
      'border': '0',
      'borderTop': '3px solid #2AA38B',
       width: '60%',
    };

    let unconsidered = this.props.unconsidered;
    let considered = this.props.considered;
    let interviews = this.props.interviews;
    let offers = this.props.offers;
    let dispatch = this.props.dispatch;
    let apps = [unconsidered, considered, interviews, offers];

    if(unconsidered.length === 0 && considered.length === 0 && interviews.length === 0 && offers.length === 0){
      return (
        <Container id='body'>
					<Grid>
						<Row>
							<Col sm={7} smCollapseRight>
								<PanelContainer noControls>
									<Panel>
										<PanelBody style={{padding: 0}}>
											<Grid>
												<Row>
													<Col xs={12}>
													<h4>
														<Icon glyph='icon-fontello-attention-alt-1' style={{textAlign: 'center'}}>  Apply to jobs and track your progress here on your board!</Icon></h4>
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
            <div  style={laneTemplate} className={classnames('col-md-12 col-sm-12 col-xs-12')} >
              <ApplicantLane  data={unconsidered}
                              rescind={this.rescind}
                              lane={'unconsidered'}
                              dispatch={this.props.dispatch}/>
            </div>
          </Col>
          <Col clearfix style={lanePad} xs={12} sm={6} md={3}>
            <div style={ laneHeader } >
              <h4 style={panelH}> Considered </h4>
              <hr style={panelHr}/>
            </div>
            <div style={laneTemplate} className={classnames('col-md-12 col-sm-12 col-xs-12')} >
              <ApplicantLane  data={considered}
                              rescind={this.rescind}
                              lane={'considered'}
                              dispatch={this.props.dispatch}/>
            </div>
          </Col>
          <Col clearfix style={lanePad} xs={12} sm={6} md={3}>
            <div style={ laneHeader } >
              <h4 style={panelH}> Interviews </h4>
              <hr style={panelHr}/>
            </div>
            <div style={laneTemplate} className={classnames('col-md-12 col-sm-12 col-xs-12')} >
              <ApplicantLane  data={interviews}
                              rescind={this.rescind}
                              lane={'interviews'}
                              dispatch={this.props.dispatch}/>
            </div>
          </Col>
          <Col clearfix style={lanePad} xs={12} sm={6} md={3}>
            <div style={ laneHeader } >
              <h4 style={panelH}> Offers </h4>
              <hr style={panelHr}/>
            </div>
            <div style={laneTemplate} className={classnames('col-md-12 col-sm-12 col-xs-12')} >
              <ApplicantLane  data={offers}
                              rescind={this.rescind}
                              lane={'offers'}
                              dispatch={this.props.dispatch}/>
            </div>
          </Col>
        </Row>
      </Grid>
    </Container>
	);
	}
}
