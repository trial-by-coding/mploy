import classNames from 'classnames';

import { connect } from 'react-redux'
// import JobModal from './jobModal'
import LoremIpsum from 'global/jsx/loremipsum';
import Controls from '../forms/controls'
import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

class JobHeader extends React.Component {
  render() {
    const pStyles = {
      fontSize: '10px'
    }
    return (
      <div className='jobheader'>
      <Row>
        <Col md={6}>
          <div class="jobtitle">
          <h5>{this.props.data.job_title}</h5>
          </div>
        </Col>
        <Col md={6}>
          <div class="jobimg">
          <h5> {this.props.data.company_name}</h5>
          </div>
        </Col>
      </Row>
      </div>
    )
  }
}

class JobBody extends React.Component {
  render() {
    const pStyles = {
      fontSize: '10px'
    }
    return (
      <div className='jobbody'>
      <Row>
        <div className="description">
        <h6>{this.props.data.location}</h6>
        Description:
        <p style={pStyles}>{this.props.data.job_description}</p>
        </div>
      </Row>
      <Row>
        <Col md={6}>
          <div className="type">
          Type:
          <p>{this.props.data.employment_type}</p>
          </div>
        </Col>
        <Col md={6}>
          <div className="Salary">
          Salary:<p>{this.props.data.min_salary}k-{this.props.data.max_salary}k</p>
          </div>
        </Col>
      </Row>
      </div>
    )
  }
}

class JobApply extends React.Component {

  getLargeModal() {
    return (
      <Modal lg>
        <ModalBody>
        <Controls dispatch={this.props.dispatch} complete={false} skillsArray={this.props.skillsArray} data={this.props.data} />
        </ModalBody>
        <ModalFooter>
          <Button outlined bsStyle='danger' onClick={ModalManager.remove} onTouchEnd={ModalManager.remove}>Close</Button>
          <Button outlined bsStyle='primary'>Save changes</Button>
        </ModalFooter>
      </Modal>
    );
  }

  render() {
    // console.log("props in motherfkn jobApply:", this.props.data)
    const btnStyles = {
      textAlign: 'center',
      margin: '0 auto'
    }
    return (
      <div className="jobapply">
        <Row>
          <Col md={12}>
            <Button bsStyle="primary"
                    bsSize="large"
                    onClick={ModalManager.create.bind(this, this.getLargeModal())}> Apply
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default class JobCard extends React.Component {

  render() {

    let skillsArr =[]

    this.props.data.skills.map(function(item){
      skillsArr.push(false);
    })

    // console.log('jobCard', this.state);
    const styles = {
      margin: '12.5px 0',
      borderBottom: '1px dotted #999',
      paddingBottom: 12.5,
      textAlign: 'center'
    };

    const panelStyle = {
      'max-width': '400px',
      'padding-top': '0px'
    }

    const colStyle = {
      zIndex: -100
    }


    return(
      <Col sm={12} md={4} lg={4}  className="clearfix">
      <PanelContainer style={panelStyle}>
        <Panel>
          <PanelBody >
            <Grid>
              <Row style={styles}>
              <div className="jobcard">
              	<JobHeader data={this.props.data} />
                <JobBody data={this.props.data} />
                <JobApply data={this.props.data}
                          dispatch={this.props.dispatch}
                          openModal={this.props.openModal}
                          skillsArray={skillsArr} />
              </div>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    </Col>
		)
	}
}