import classNames from 'classnames';
import { connect } from 'react-redux';
import ApplyJob from 'routes/containers/apply_job';
import actions from 'redux/actions';

export class JobHeader extends React.Component {
  render() {
    return (
      <div>
      <Img src={this.props.data.profile_picture} width='40' height='40'
              style={{display: 'block', borderRadius: 40, padding: 3, border: '2px solid #55c9a6', margin: 'auto', float: 'right'}} />
      <div className='text-left'>
      <h4 style={{color: 'black'}}>{this.props.data.job_title}</h4>
      <h6 style={{color: 'lightgray'}}>{this.props.data.company_name} - {this.props.data.location}</h6>
    </div>
  </div>
    );
  }
}
export class JobBody extends React.Component {
  render() {
    const tableLines = {
      'padding': 0,
      'border': 'none'
    };
    return (
      <Grid>
    <Row>
      <Col xs={12}>
      <p style={{lineHeight: 1.6, paddingBottom: 15}}>{this.props.data.job_description}</p>
      <Table>
        <tbody>
          <tr>
            <td style={{padding: 0}}>
              <h6><strong>Education</strong></h6></td>
            <td style={{padding: 0}}>
              <h6>{this.props.data.desired_education}</h6></td>
          </tr>
          <tr>
            <td style={tableLines}>
              <h6><strong>Job Type</strong></h6></td>
            <td style={tableLines}>
              <h6>{this.props.data.employment_type}</h6></td>
          </tr>
          <tr>
            <td style={tableLines}>
              <h6><strong>Visa Sponsor</strong></h6></td>
            <td style={tableLines}>
              <h6>{this.props.data.visa_required ? 'Yes' : 'No'}</h6></td>
          </tr>
          <tr>
            <td style={tableLines}>
              <h6><strong>Salary</strong></h6></td>
            <td style={tableLines}>
              <h6>${this.props.data.min_salary/1000}k-${this.props.data.max_salary/1000}k</h6></td>
          </tr>
        </tbody>
      </Table>
      </Col>
    </Row>
  </Grid>
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
    return (
      <div className="jobapply">
        <Row>
          <Col md={12}>
                <Button outlined style={{marginBottom: 10}} bsStyle='lightgreen' onClick={ModalManager.create.bind(this, this.getLargeModal())}>Apply
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
  <PanelContainer style={{marginBottom: 15, marginTop: 15}}>
    <Panel>
      <PanelHeader className='text-left' style={{margin: 25}}>
        <JobHeader data={this.props.data} />
      </PanelHeader>
      <PanelBody>
        <JobBody data={this.props.data} />
      </PanelBody>
      <PanelFooter className='text-center' style={{paddingBottom: 10}}>
        <JobApply data={this.props.data} dispatch={this.props.dispatch} openModal={this.props.openModal} skillsArray={skillsArr}
        />
      </PanelFooter>
    </Panel>
  </PanelContainer>
  </Col>
		);
	}
}
