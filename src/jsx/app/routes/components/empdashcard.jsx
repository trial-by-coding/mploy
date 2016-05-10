import classNames from 'classnames';
import actions from 'redux/actions';
import AppCard from './appCard';

export default class empdashCard extends React.Component {

  getLargeModal() {

    let dispatch = this.props.dispatch;
    let advance = this.props.advance;
    let revert = this.props.revert;
    let status = this.props.lane;
    let index = this.props.index;
    let item = this.props.item;
    let reject = this.props.reject;
    let accept = this.props.accept;
    let jobList = this.props.jobList;

    return (
      <Modal lg>
        <ModalBody>
          <AppCard app={this.props.item}/>
        </ModalBody>
        <ModalFooter>
          <Button outlined bsStyle='danger' onClick={() => {
                  reject(item.appID, item, status, index)
                  ModalManager.create.bind(jobList[index], this.getLargeModal())}
                }
                  onTouchEnd={ModalManager.remove}>Reject</Button>
          <Button outlined bsStyle='primary' onClick={() => accept(item.appID, status, item, index)}>Accept</Button>
        </ModalFooter>
      </Modal>
    );
  }

  render() {

    let dispatch = this.props.dispatch;
    let advance = this.props.advance;
    let revert = this.props.revert;
    let status = this.props.lane;
    let index = this.props.index;
    let item = this.props.item;
    return (
      <div>
        <Col md={2}>
          <div className='revert' onClick={() => revert(item.appID, status, item, index)}>
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
    );
  }
}
