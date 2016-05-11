import classNames from 'classnames';

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
        	<Col md={3}>
            <div> Unconsidered </div>
        		<EmployerLane data={unconsidered}
                          lane={'unconsidered'}
                          advance={this.advance}
                          accept={this.accept}
                          revert={this.revert}
                          reject={this.reject}
                          dispatch={this.props.dispatch}/>
          </Col>
          <Col md={3}>
            <div> Considered </div>
        		<EmployerLane data={considered}
                          lane={'considered'}
                          advance={this.advance}
                          accept={this.accept}
                          revert={this.revert}
                          reject={this.reject}
                          dispatch={this.props.dispatch}/>
          </Col>
          <Col md={3}>
            <div> Interviews </div>
        		<EmployerLane data={interviews}
                          lane={'interviews'}
                          advance={this.advance}
                          accept={this.accept}
                          revert={this.revert}
                          reject={this.reject}
                          dispatch={this.props.dispatch}/>
          </Col>
          <Col md={3}>
            <div> Offers </div>
        		<EmployerLane data={offers}
                          lane={'offers'}
                          advance={this.advance}
                          accept={this.accept}
                          revert={this.revert}
                          reject={this.reject}
                          dispatch={this.props.dispatch}/>
          </Col>
        </Row>
      </Grid>
    </Container>
    );
	}
}
