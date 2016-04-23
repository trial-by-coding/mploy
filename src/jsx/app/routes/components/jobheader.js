import classNames from 'classnames';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

export default class JobHeader extends React.Component {
	render() {
		const styles = {
      margin: '12.5px 0',
      borderBottom: '1px dotted #999',
      paddingBottom: 12.5,
      'textAlign': 'center'
    };

    const pStyles = {
    	'fontSize': '10px'
    }

    return(
    	<Row style={styles}>
    		<Col md={6}>
	    		<div class="jobtitle">
	    		<h4>Sr Developer</h4>
	    		<p style={pStyles}>Apple Inc. - Cupertino, CA</p>
	    		</div>
    		</Col>
    		<Col md={6}>
    			<div class="jobimg">
    				<img></img>
    			</div>
    		</Col>
    	</Row>
		)
	}
}