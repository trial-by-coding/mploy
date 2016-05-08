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
    let skills_met= JSON.parse(this.props.app.skills_met);
    let skillsArray = this.props.app.skills

    const styles = {
      margin: '12.5px 0',
      paddingBottom: '10px',
      'text-align': 'left'
    };
      console.log('props in appCard:',this.props)

    if(!this.props.app) {
        return ( <div>Loading...</div>);
    }

    return (
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
          <h4> Has Specified Skills:</h4>
          <row className='skills'>
          { skillsArray.filter(function(skill, idx) {return skills_met[idx] === true}).map( skill => <div className="label col-md-3 label-success"> {skill} </div> ) }
          </row>
        </Row>

        <Row style={styles}>
          <h4> Lacking Specified Skills:</h4>
          <row className='skills'>
          { skillsArray.filter(function(skill, idx) {return skills_met[idx] === false}).map( skill => <div className="label col-md-3 label-danger"> {skill} </div> ) }
          </row>
        </Row>

        <Row style={styles}>
          <h4>Personal Statement: </h4>
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
          <h4>Would Require Visa Sponsorship:</h4>
          <row className='skills'>
          { this.props.app.can_work_here === true ? 'No' : 'Yes' }
          </row>
          <row className='skills'>
            <h4> Applied on: </h4>
            {moment(this.props.app.created_at).format('LLLL')}
          </row>
        </Row> 

       <Row style={styles}>
          <h4>Documents:</h4>
            <div style={styles}>
              <a href={this.props.app.resume}
                download={this.props.app.resume}>Download Resume</a>
            </div>
            <div>
              <a href={this.props.app.cover_letter}
                download={this.props.app.cover_letter}>Download Cover Letter</a>
            </div>
        </Row>

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


