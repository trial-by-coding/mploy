import classNames from 'classnames';
import moment from 'moment';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

// const AppCard = ({app}) => {

export default class AppCard extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    // console.log('app be:', this.props.app)
    let skillList = [];
    for (var key in this.props.app) {
      if (key.indexOf('skill') !== -1 && this.props.app[key] !== null) {
        skillList.push(key)
      }
    }

    const styles = {
      margin: '12.5px 0',
      paddingBottom: '10px',
      'text-align': 'left'
    };
      console.log('props in appCard:',this.props)

    return (


      //appCard info
      <div>

        <Row className>
          <Col xs={4} collapseRight>
            <Img src={this.props.app.profile_picture} width='45' height='45'
              style={{display: 'block', borderRadius: 45, border: '2px solid #fff', margin: 'auto', float: 'left'}} />
          </Col>
          <Col xs={8} collapseLeft id='avatar-col'>
            <div style={{top: 23, fontSize: 28, lineHeight: 1, position: 'relative'}}>
            {this.props.app.username}
            </div>
          </Col>
        </Row>
    
        <Row style={styles}>
          <h4> Skills:</h4>
          <row className='skills'>
          { skillList.map( skill => <div className="label col-md-3 label-primary"> {skill} </div> ) }
          </row>
        </Row>

        <Row style={styles}>
          <h4>Personal statement: </h4>
          <row className='skills'>
            { this.props.app.personal_statement }
          </row>
        </Row> 

        <Row style={styles}>
          <h4>Years of Relevant Experience:</h4>
          <row className='skills'>
          { this.props.app.years_experience }
          </row>
        </Row> 

        <Row style={styles}>
          <h4>Education:</h4>
          <row className='skills'>
          { this.props.app.education }
          </row>
        </Row> 

        <Row style={styles}>
          <h4>Requires Visa Sponsorship</h4>
          <row className='skills'>
          { this.props.app.can_work_here === true ? 'No' : 'Yes' }
          </row>
          <row className='skills'>
            <h4> Applied on: </h4>
            {moment(this.props.app.created_at).format('LLLL')}
          </row>
        </Row> 


        <div style={styles}>
          <a href={this.props.app.resume}
            download={this.props.app.resume}>Download Resume</a>
        </div>
        <div>
          <a href={this.props.app.cover_letter}
            download={this.props.app.cover_letter}>Download Cover Letter</a>
        </div>

        <Row style={styles}>
          <button 
          className='btn btn-primary accept'>
          Move Forward
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


