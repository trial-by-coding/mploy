import classNames from 'classnames';
import actions from 'redux/actions';
import AppCard from './appCard';

export default class empdashCard extends React.Component {

  getLargeModal() {
    

    return (
      <Modal lg>
        <ModalBody>
          <AppCard app={this.props.item}/>
        </ModalBody>
        <ModalFooter>
          <Button outlined bsStyle='danger' onClick={ModalManager.remove} onTouchEnd={ModalManager.remove}>Close</Button>
          <Button outlined bsStyle='primary'>Save changes</Button>
        </ModalFooter>
      </Modal>
    );
  }

  render() {

    let dispatch = this.props.dispatch;
    let advance = this.props.advance;
    let retract = this.props.retract;
    let status = this.props.lane;
    let index = this.props.index;
    let item = this.props.item;
    return (
      <div>
        <Col md={2}>
          <div className='deny' onClick={() => retract(item.appID, status, item, index)}>
            back
          </div>
        </Col>      
        <Col md={8}>
          <div className='applicantname' onClick={ModalManager.create.bind(this, this.getLargeModal())}>
           {this.props.item.firstname + ' ' + this.props.item.lastname}
          </div>
        </Col>
        <Col md={2}>
          <div onClick={() => advance(item.appID, status, item, index)}> > </div>
        </Col>
      </div>
    )
  }
}