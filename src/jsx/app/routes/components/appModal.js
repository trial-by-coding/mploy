import AppCard from './appCard';


export default class appModal extends React.Component {
  onHide() {
    var currentID = this.props.index;
    var maxID = this.props.listLength;
    var nextID = ++currentID;

    if (nextID > maxID) {
      // reached last button
      return;
    }

    console.log('onHide');

    // adding a timeout as we need to wait for Modal transition to complete
    setTimeout(() => {
      console.log('opening next modal:', nextID);
      ModalManager.create(getModal(nextID, maxID));
    }, 15);
  }

	render() {

		console.log('in AppModal');
    let dispatch = this.props.dispatch;
    let advance = this.props.advance;
    let revert = this.props.revert;
    let status = this.props.lane;
    let index = this.props.index;
    let item = this.props.item;
    let reject = this.props.reject;
    let accept = this.props.accept;
    let listLength = this.props.listLength;

    return (
      <Modal onHide={::this.onHide}>
        <ModalBody>
          <AppCard app={item}/>
        </ModalBody>
        <ModalFooter>
          <Button outlined bsStyle='danger' onClick={() => {
                    reject(item.appID, item, status, index);
                  }
                }
                  onTouchEnd={ModalManager.remove}>Reject</Button>
          <Button outlined bsStyle='primary' onClick={() => accept(item.appID, status, item, index)}>Accept</Button>
        </ModalFooter>
      </Modal>
    );
  }

}
