import classNames from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';
import actions from 'redux/actions';

export default class AppCard extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let skills_met= JSON.parse(this.props.app.skills_met);
    let skillsArray = this.props.app.skills;
    let skillList = [];
    for (var key in this.props.app) {
      if (key.indexOf('skill') !== -1 && this.props.app[key] !== null) {
        skillList.push(key);
      }
    }

    const styles = {
      margin: '12.5px 0',
      paddingBottom: '10px',
      color: '#575757',
      'textAlign': 'left'
    };

    const titles = {
      color: '#575757',
      fontWeight: 'bold'
    };

    if(!this.props.app) {
        return ( <div>Loading...</div>);
    }

    return (
      <div>
        <Col md={12}>
          <Row style={styles}>
              <img src={this.props.app.profile_picture} width='60' height='60'
                  style={{display: 'block', borderRadius: 45, border: '2px solid #2AA38B', padding:'3px', margin: 'auto', float: 'right'}} />
              <div style={{top: 23, color: '#575757', fontSize: 28, lineHeight: 1, position: 'relative', textAlign: 'center'}}>
              {this.props.app.username}
              </div>
          </Row>
        <hr/>
        </Col>

        <Row style={styles}>
          <h4 style={titles}> Has Specified Skills:</h4>
          <row className='skills'>
          { skillsArray.filter(function(skill, idx) {return skills_met[idx] === true;}).map( skill => <div className="label label-success" style={{border: '1px solid black', padding:'3px'}}> {skill} </div> ) }
          </row>
        </Row>

        <Row style={styles}>
          <h4 style={titles}> Lacking Specified Skills:</h4>
          <row className='skills'>
          { skillsArray.filter(function(skill, idx) {return skills_met[idx] === false;}).map( skill => <div className="label label-danger" style={{border: '1px solid black', padding:'3px'}}> {skill} </div> ) }
          </row>
        </Row>

        <Row style={styles}>
          <h4 style={titles}>Personal Statement: </h4>
          <row className='skills'>
            { this.props.app.personal_statement }
          </row>
        </Row>

        <Row style={styles}>
          <h4 style={titles}>Years of Relevant Experience:</h4>
          <row className='skills'>
          { this.props.app.years_experience }
          </row>
        </Row>

        <Row style={styles}>
          <h4 style={titles}>Education:</h4>
          <row className='skills'>
          { this.props.app.education }
          </row>
        </Row>

        <Row style={styles}>
          <h4 style={titles}>Would Require Visa Sponsorship:</h4>
          <row className='skills'>
          { this.props.app.can_work_here === true ? 'No' : 'Yes' }
          </row>
          <row className='skills'>
            <h4 style={titles}> Applied on: </h4>
            {moment(this.props.app.created_at).format('LLLL')}
          </row>
        </Row>

       <Row style={styles}>
          <h4 style={titles}>Documents:</h4>
            <div style={styles}>
              <a href={this.props.app.resume}
                download={this.props.app.resume}>Download Resume</a>
              <br/>
              <a href={this.props.app.cover_letter}
                download={this.props.app.cover_letter}>Download Cover Letter</a>
            </div>
        </Row>

      </div>
    );
  }
}
