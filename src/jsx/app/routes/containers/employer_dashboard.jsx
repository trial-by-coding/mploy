import classnames from 'classnames';
 
// import SidebarMixin from 'global/jsx/sidebar_component';

import EmployerLane from 'routes/components/employerLane';

import { connect } from 'react-redux';
import actions from 'redux/actions';


@connect(state => state)
export default class EmployerDashboard extends React.Component {
	constructor(props) {
		super(props);
  }


  advance = (appID, status, item, index)  => {
    // console.log('employer dashboard props', this.props);
    if(status === 'unconsidered')     { this.props.dispatch(actions.removeUnconsidered(index));
                                        this.props.dispatch(actions.addConsidered(item));}
    else if(status === 'considered')  { this.props.dispatch(actions.removeConsidered(index));
                                        this.props.dispatch(actions.addInterview(item));}
    else if(status === 'interviews')  { this.props.dispatch(actions.removeInterview(index));
                                        this.props.dispatch(actions.addOffer(item));}
    else if(status === 'offers')      { this.props.dispatch(actions.removeOffer(index)); }

    this.props.dispatch(actions.advanceEmployerRequest(appID));
  };

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

  reject = (jobID, appID, status, index) => {
    ModalManager.remove();
    if(status === 'unconsidered')     { this.props.dispatch(actions.removeUnconsidered(index)); }
    else if(status === 'considered')  { this.props.dispatch(actions.removeConsidered(index));}
    else if(status === 'interviews')  { this.props.dispatch(actions.removeInterview(index));}
    else if(status === 'offers')      { this.props.dispatch(actions.removeOffer(index));}

    this.props.dispatch(actions.rejectApp(jobID, appID));

  };

  accept = (appID, status, item, index) => {
    // ModalManager.remove;
    // console.log('accept',this);
    this.advance(appID, status, item, index);
  };


	render() {

    const laneTemplate = {
      'background-color':'white',
      'border-radius': '0px 0px 5px 5px',
       padding: '20px 10px 0px 10px',
      'margin-bottom': '20px',
      // 'border':'1px solid rgba(0, 0, 0, 0.38)',
      'box-shadow': '0px 3px 4px 0px rgba(0,0,0,0.20)' 
    }   

    const lanePad = {
      'padding':'0px 10px',
    }

    const laneHeader = {
      'box-shadow': '0px 2px 4px 0px rgba(0,0,0,0.20)',
      'background-color':'white',    //#2AA38B
      'height': '40px',
      'textAlign': 'center',
      'border-radius': '5px 5px 0px 0px',
    }    

    const panelH = {
      'padding-top': '10px',
      'margin-top': '0px',
      'margin-bottom': '0px',
      'color':'#8D979E',
      'font-weight': '400!important'
    }

    const panelHr = {
      'margin-top': '8px',
      'margin-bottom': '25px',
      'border': '0',
      'border-top': '3px solid #2AA38B',
       width: '60%',
    }
    console.log('employer dashboard props', this.props);

    let unconsidered = this.props.unconsidered;
    let considered = this.props.considered;
    let interviews = this.props.interviews;
    let offers = this.props.offers;

    if(this.props.posts.length === 0){
      return (
        <Container id='body'>
          <h1 style={{textAlign: 'center'}}>You haven't posted any jobs yet.</h1>
          <h2 style={{textAlign: 'center'}}>Create job postings then process applicants here on your board.</h2>
        </Container>
      );
    }

    if(this.props.posts.length && unconsidered.length === 0 && considered.length === 0 && interviews.length === 0 && offers.length === 0){
      return (
        <Container id='body'>
          <h1 style={{textAlign: 'center'}}>No candidates have applied to the {this.props.currentPost.job_title} position with {this.props.currentPost.company_name} yet.</h1>
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
