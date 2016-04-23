import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

class Confirm extends React.Component {
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

class Description extends React.Component {
	render() {
		const styles = {
      margin: '12.5px 0',
      borderBottom: '1px dotted #999',
      paddingBottom: 12.5,
      'text-align': 'center'
    };
		return (
			<Row style={styles}>
				<div class='skills'>
				Skills
				</div>
				<div class='experience'>
				Experience
				</div>
				<div class='education'>
				Education
				</div>
				<div class='description'>
				Description
				</div>
			</Row>
		)
	}
}

class Headline extends React.Component {
	render() {
		const styles = {
      margin: '12.5px 0',
      borderBottom: '1px dotted #999',
      paddingBottom: 12.5,
      'text-align': 'center'
    };
		return (
			<Row>
				<div style={styles} class="header">
					<img></img>
						Name
				</div>
			</Row>
		)
	}
}

class Application extends React.Component {
	render() {
    const styles = {
      margin: '12.5px 0',
      borderBottom: '1px dotted #999',
      paddingBottom: 12.5,
      'text-align': 'center'
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

	return (
		<Col xs={12} sm={6} md={4}>
			<PanelContainer>
				<Panel>
					<PanelBody >
						<Grid>
							<Row>
								<Headline />
								<Description />
								<Confirm />
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
						return <Application />
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