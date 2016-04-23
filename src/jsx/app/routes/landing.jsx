import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

class Body extends React.Component {
	render() {
		return (
			<Grid>
				<Col>
					<div> 
					<button type='submit'>Log In</button>
					</div>
				</Col>
				<Col>
					<div>
					<button type='submit'>Log In</button>
					</div>
				</Col>
			</Grid>
		)
	}
}