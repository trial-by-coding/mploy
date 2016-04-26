import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';
import JobCard from 'routes/components/jobCard';
// import Description from 'routes/components/description';
// import Confirm from 'routes/components/confirm';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

@connect(state => state)
class JobsContainer extends React.Component {
	getInitialState() {
		return {showModal: false}
	}
	close() {
		return {showModal: false}
	}
	open() {
		return {showModal:true}
	}
	componentWillMount(){
    this.props.dispatch(actions.getJobs()); 
    // this.setState({applicants:this.props.appList.items})
    // console.log('appList.items:', this.props.appList.item)
  }

	render() {

		let jobList = this.props.jobList.items;
		console.log('JobsContainer', jobList);
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

    if(!jobList) {
    	return <div> Loading... </div>
    }

		return (
			<div>
			{jobList.map(job => <JobCard data={job}/>)}
			</div>
		)
	}
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
        <Container id='body'>
          <Grid>
            <Row>
            	<Col md={12}>
            		<JobsContainer />
              </Col>
            </Row>
          </Grid>
        </Container>
				<Footer />
			</Container>
	)}
}