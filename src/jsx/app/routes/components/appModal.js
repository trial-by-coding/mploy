import AppCard from './appCard';


export default class appModal extends React.Component {
  onHide() {
    let currentID = this.props.index;
    let maxID = this.props.listLength;
    let nextID = ++currentID;

    if (nextID > maxID) {
      // reached last button
      return;
    }

    // adding a timeout as we need to wait for Modal transition to complete
    setTimeout(() => {
      ModalManager.create(getModal(nextID, maxID));
    }, 15);
  }

	render() {

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
          <Button outlined bsStyle='lightred' onClick={() => {
                    reject(item.appID, item, status, index);
                  }
                }
                  onTouchEnd={ModalManager.remove}>Reject</Button>
                <Button outlined bsStyle='lightgreen' onClick={() => accept(item.appID, status, item, index)}>Accept</Button>
        </ModalFooter>
      </Modal>
    );
  }

}
