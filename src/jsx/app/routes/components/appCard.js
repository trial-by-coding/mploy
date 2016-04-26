import classNames from 'classnames';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

// const AppCard = ({app}) => {

export default class AppCard extends React.Component {
  constructor(props){
    super(props)
  }

  deleteTask = (e) => {
    this.props.dispatch(actions.rejectApp(1));
    this.props.dispatch(actions.getApplications(1))  
  };

  render() {

    let skillList = [];
    for (var key in this.props.fuckingApps) {
      if (key.indexOf('skill') !== -1 && this.props.fuckingApps[key] !== null) {
        skillList.push(key)
      }
    }

    const styles = {
      margin: '12.5px 0',
      paddingBottom: '10px',
      'text-align': 'left'
    };
    return (
      //appCard info
      <div>
    
        <Row style={styles}>
          <h4> Skills </h4>
          <row className='skills'>
          { skillList.map( skill => <div className="label col-md-3 label-primary"> {skill} </div> ) }
          </row>
        </Row>

        <Row style={styles}>
          <h4>Years Experience</h4>
          <row className='skills'>
          { this.props.fuckingApps.years_experience }
          </row>
        </Row> 

        <Row style={styles}>
          <h4>Education</h4>
          <row className='skills'>
          { this.props.fuckingApps.education }
          </row>
        </Row> 

        <Row style={styles}>
          <h4>Visa Required</h4>
          <row className='skills'>
          { this.props.fuckingApps.can_work_here === true ? 'No' : 'Yes' }
          </row>
        </Row> 

        <Row style={styles}>
          <h4>About canidate </h4>
          <row className='skills'>
            { this.props.fuckingApps.personal_statement }
          </row>
          <row className='skills'>
            <h4> Applied on </h4>
            {this.props.fuckingApps.created_at}
          </row>
        </Row> 

        <Row style={styles}>
          <button 
          className='btn btn-primary accept'>
          Accept
          </button>
          <button 
          onClick={this.deleteTask}
          className='btn btn-default reject'>
          Reject
          </button>
        </Row>

      </div>
    )
}
}


