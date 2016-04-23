import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';
import JobHeader from 'routes/components/jobheader';
// import Description from 'routes/components/description';
// import Confirm from 'routes/components/confirm';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

class JobsContainer extends React.Component {
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
    const panelStyle = {
    	'max-width': '400px'
    }
		return (
			<Col sm={12} md={4} lg={4}>
			<PanelContainer style={panelStyle}>
				<Panel>
					<PanelBody >
						<Grid>
							<Row>
								<JobHeader />
							</Row>
					  </Grid>
					</PanelBody>
				</Panel>
			</PanelContainer>
		</Col>
		)
	}
}

@connect((state) => state)
class Body extends React.Component {
	

	render() {
		const jobs = ['Sr Developer', 'Mid Developer', 'Entry Developer'];
		const { dispatch } = this.props;
		const { visibilityFilter } = this.props;
	return (
		<Container id='body'>
			<Grid>
				<Row>
					{jobs.map(function(text) {
						return <JobsContainer />
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