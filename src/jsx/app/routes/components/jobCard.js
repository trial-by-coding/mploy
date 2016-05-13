import classNames from 'classnames';
import { connect } from 'react-redux';
import ApplyJob from 'routes/containers/apply_job';
import actions from 'redux/actions';

export class JobHeader extends React.Component {
  render() {
    return (
      <div>
      <div className='text-right'>
        <h6>
          <Img src={this.props.data.profile_picture} width='45' height='45'
              style={{display: 'block', borderRadius: 45, border: '2px solid #fff', margin: 'auto', float: 'right'}} />
        </h6>
        </div>
      <div className='text-left'>
      <h4 style={{color: 'black'}}>{this.props.data.job_title}</h4>
      <h6 style={{color: 'lightgray'}}>{this.props.data.company_name} - {this.props.data.location}</h6>
      <h6 overflowY='scroll' style={{height: 10}}>{this.props.data.job_description}</h6>
    </div>
  </div>
    );
  }
}
export class JobBody extends React.Component {
  render() {
    return (
      <PanelBody>
        <div>
          <h6 style={{float: "left"}}>{this.props.data.employment_type}</h6>
        </div>
        <div>
          <h6 className='text-right'>Salary: ${this.props.data.min_salary/1000}k-${this.props.data.max_salary/1000}k</h6>
        </div>
      </PanelBody>
    );
  }
}

export class JobApply extends React.Component {
  getLargeModal() {
    return (
      <Modal lg>
        <ApplyJob dispatch={this.props.dispatch} complete={false} skillsArray={this.props.skillsArray} data={this.props.data} />
      </Modal>
    );
  }

  render() {
    const btnStyles = {
      'textAlign': 'center',
      'margin': '0 auto'
    };
    return (
      <div className="jobapply">
        <Row>
          <Col md={12}>
                <Button outlined style={{marginBottom: 0, btnStyles}} bsStyle='lightgreen' onClick={ModalManager.create.bind(this, this.getLargeModal())}>Apply
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default class JobCard extends React.Component {
  render() {
    let skillsArr =[];
    this.props.data.skills.map(function(item){
      skillsArr.push(false);
    });

    return(
      <Col sm={4} smCollapseRight>
      <PanelContainer>
        <Panel>
          <PanelHeader className='text-left' style={{margin: 25, marginTop: 0}}>
            <JobHeader data={this.props.data} />
          </PanelHeader>
          <PanelBody style={{padding: 10}}>
            <Grid>
              <Row>
                <Col xs={12}>
                <JobBody data={this.props.data} />
                <PanelFooter className='text-center' style={{margin: 25, marginBottom: 5}}>
                  <JobApply data={this.props.data} dispatch={this.props.dispatch} openModal={this.props.openModal} skillsArray={skillsArr} />
                </PanelFooter>
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
      </Col>
		);
	}
}
