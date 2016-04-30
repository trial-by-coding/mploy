import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'routes/componentsheader';
import Sidebar from 'routes/components/sidebar';
import Footer from 'routes/components/footer';
import JobCard from 'routes/components/jobCard';
import JobModal from 'routes/components/jobModal';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

@connect(state => state)
export default class JobsContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.getJobs());
  }
  constructor(props){
    super(props)
    this.state = {
      isOpen: false
    }
  }

  openModal = () => {
    console.log('openModal working');
    this.setState({
      isOpen: true
    });
  };

  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };

	render() {
    console.log()
		console.log('container props', this);
		let jobList = this.props.jobList.items;

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
			{jobList.map(job => <JobCard data={job} 
                                   openModal={this.openModal}/>)}
      <JobModal isOpen={this.state.isOpen}
                openModal={this.openModal}
                hideModal={this.hideModal} />
			</div>
		)
	}
}
