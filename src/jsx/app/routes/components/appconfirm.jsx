import classNames from 'classnames';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

export default class AppConfirm extends React.Component {
	render() {
		const styles = {
			margin: '12.5px 0',
      borderBottom: '1px dotted #999',
      paddingBottom: 12.5,
      'text-align': 'center'
    };
    return (
    	<Row style={styles}>
				<div class='accept'>
				Accept
				</div>
				<div class='reject'>
				Reject
				</div>
			</Row>
    )
	}
}