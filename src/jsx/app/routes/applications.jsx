import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

@connect((state) => state)
class Body extends React.Component {
	

	render() {
		const { dispatch } = this.props;
		const { visibilityFilter } = this.props;
	return (
		<Container id='body'>
			<Grid>
				<Row>
					<Col sm={12}>
						<PanelContainer>
							<Panel>
								<PanelBody >
									<Grid>
									This is Working!
									</Grid>
								</PanelBody>
							</Panel>
						</PanelContainer>
					</Col>
				</Row>
			</Grid>
		</Container>	
	)}	
}

@SidebarMixin
export default class extends React.Component {
	render() {
		var classes = classNames({
			'container-open': this.props.open
		})
		return (
			<Container id='container' className={classes}>
				<Sidebar />
				<Header />
				<Body />
				<Footer />
			</Container>
	)}
}