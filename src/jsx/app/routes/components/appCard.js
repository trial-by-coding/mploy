import classNames from 'classnames';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

export default class AppCard extends React.Component {
  render() {
    const styles = {
      margin: '12.5px 0',
      borderBottom: '1px dotted #999',
      paddingBottom: 12.5,
      'text-align': 'center'
    };
    return (
      //appCard info
      <div>
        <Row>
          <div style={styles} className="header">
            <img src='/imgs/app/logo.png'/>
              Name
          </div>
        </Row>

        <Row style={styles}>
          <div className='skills'>
          Skills
          </div>
          <div className='experience'>
          Experience
          </div>
          <div className='education'>
          Education
          </div>
          <div className='description'>
          Description
          </div>
        </Row>

        <Row style={styles}>
          <button 
          className='btn btn-primary accept'>
          Accept
          </button>
          <button 
          className='btn btn-default reject'>
          Reject
          </button>
        </Row>
      </div>
    )
  }
}


