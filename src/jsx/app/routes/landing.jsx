import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

export default class Body extends React.Component {
	render() {
		return (
			<Container id="body">
			<Grid>
				<Col>
					<h2>Job Seeker</h2>
					<div> 
					<button type='submit'>Log In</button>
					</div>
				</Col>
				<Col>
					<div>
					<h2>Employers</h2>
					<button type='submit'>Log In</button>
					</div>
				</Col>
			</Grid>
			</Container>
		)
	}
}