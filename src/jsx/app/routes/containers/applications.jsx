import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';
import AppHeader from 'routes/components/appheader';
import AppDescription from 'routes/components/appdescription';
import AppConfirm from 'routes/components/appconfirm';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';


class ApplicationContainer extends React.Component {
	render() {
    const styles = {
      margin: '12.5px 0',
      borderBottom: '1px dotted #999',
      paddingBottom: 12.5,
      'textAlign': 'center'
    };
    const textStyle = {
      textDecoration: this.props.completed ? 'line-through' : '',
    };
    const buttonStyle = {
      height: 25,
      color: 'red',
      fontSize: 20,
      lineHeight: 0,
      marginTop: -3,
      border: 'none',
      background: 'none',
    };
    const panelStyle = {
    	'maxWidth': '400px'
    }

	return (
		<Col sm={12} md={4} lg={4}>
			<PanelContainer style={panelStyle}>
				<Panel>
					<PanelBody >
						<Grid>
							<Row>
								<AppHeader />
								<AppDescription />
								<AppConfirm />
							</Row>
					  </Grid>
					</PanelBody>
				</Panel>
			</PanelContainer>
		</Col>
	)}
}

@connect((state) => state)
class Body extends React.Component {


	render() {
		const app = ['Some text', 'More Text', 'Even More Text'];
		const { dispatch } = this.props;
		const { visibilityFilter } = this.props;
	return (
		<Container id='body'>
			<Grid>
				<Row>
					{app.map(function(text) {
						return <ApplicationContainer />
					})
					}
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