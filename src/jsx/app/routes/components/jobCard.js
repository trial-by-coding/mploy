import classNames from 'classnames';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

export default class JobHeader extends React.Component {
  render() {
    console.log('jobCard', this.props);
		const styles = {
      margin: '12.5px 0',
      borderBottom: '1px dotted #999',
      paddingBottom: 12.5,
      textAlign: 'center'
    };

    const pStyles = {
    	fontSize: '10px'
    }

    const btnStyles = {
      textAlign: 'center',
      margin: '0 auto'
    }
    const panelStyle = {
      'max-width': '400px',
      'padding-top': '0px'
    }

    return(
      <Col sm={12} md={4} lg={4} className="clearfix">
      <PanelContainer style={panelStyle}>
        <Panel>
          <PanelBody >
            <Grid>
              <Row>
              <div className="jobcard">
              	<Row style={styles}>
                  <Col md={6}>
          	    		<div class="jobtitle">
          	    		<h4>{this.props.data.job_title}</h4>
          	    		<p style={pStyles}>Location: {this.props.data.location}</p>
          	    		</div>
                  </Col>
                  <Col md={6}>
              			<div class="jobimg">
              				<img></img>
              			</div>
                  </Col>
              	</Row>
                <Row style={styles}>
                  <div className="description">
                  Description
                  <p style={pStyles}>{this.props.data.job_description}</p>
                  </div>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="experience">
                    Exp: placeholder
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="Salary">
                    Salary:<p>{this.props.data.min_salary}-{this.props.data.max_salary}</p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div className="btn" style={btnStyles}>
                    <button className="btn btn-primary"> Apply </button>
                    </div>
                  </Col>
                </Row>
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