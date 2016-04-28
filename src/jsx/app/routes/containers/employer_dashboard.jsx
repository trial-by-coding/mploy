import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';
import AppList from '../components/lists';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

@connect(state => state)
class AppContainer extends React.Component {
	componentWillMount() {
		this.props.dispatch(actions.getUnconsidered)
	}

	constructor(props) {
		super(props)
		this.state = {
      unconsidered: [],
      considered: [],
      interviews: [],
      offers: []
    }
	}
	render() {
		return (
		<Container id='body'>
      <Grid>
        <Row>
        	<Col md={3}>
        		<AppList />
          </Col>
          <Col md={3}>
        		<AppList />
          </Col>
          <Col md={3}>
        		<AppList />
          </Col>
          <Col md={3}>
        		<AppList />
          </Col>
        </Row>
      </Grid>
    </Container>
    )
	}
}

@SidebarMixin
export default class extends React.Component {
	render() {
    const dispatch = this.props.dispatch
		var classes = classNames({
			'container-open': this.props.open
		})
		return (
			<Container id='container' className={classes}>
				<Sidebar />
				<Header />
        <AppContainer />
				<Footer />
			</Container>
	)}
}