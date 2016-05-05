import classNames from 'classnames';

import { connect } from 'react-redux'

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';
import FileCard from './fileCard'

// const AppCard = ({app}) => {

export default class AppCard extends React.Component {
  constructor(props){
    super(props)
  }

  getTextModal(filePath) {
    console.log("appCard:filePath:",filePath)
    return (
      <Modal>
        <ModalBody>
          <FileCard app={filePath}/>
        </ModalBody>
        <ModalFooter>
          <Button outlined bsStyle='primary'>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }

  handleClick(ref){
    console.log("appCard:handleClick:ref=",ref);
    if (ref !== null)
      ModalManager.create.bind(this, this.getTextModal(ref));
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
    
        <Row style={styles}>
          <h2> {this.props.app.username}: </h2>
          <h4> Skills </h4>
          <row className='skills'>
          { skillList.map( skill => <div className="label col-md-3 label-primary"> {skill} </div> ) }
          </row>
        </Row>

        <Row style={styles}>
          <h4>Years Experience</h4>
          <row className='skills'>
          { this.props.app.years_experience }
          </row>
        </Row> 

        <Row style={styles}>
          <h4>Education</h4>
          <row className='skills'>
          { this.props.app.education }
          </row>
        </Row> 

        <Row style={styles}>
          <h4>Visa Required</h4>
          <row className='skills'>
          { this.props.app.can_work_here === true ? 'No' : 'Yes' }
          </row>
        </Row> 

        <Row style={styles}>
          <h4>About candidate </h4>
          <row className='skills'>
            { this.props.app.personal_statement }
          </row>
          <row className='skills'>
            <h4> Applied on </h4>
            {this.props.app.created_at}
          </row>
        </Row> 

        <Row style={styles}>
          <button
          onClick={() => this.handleClick(this.props.app.resume)}
          className='btn btn-info'>
          View Resume
          </button>
          <button
          onClick={() => this.handleClick(this.props.app.cover_letter)}
          className='btn btn-info'>
          View Cover Letter
          </button>
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


