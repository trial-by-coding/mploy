import classNames from 'classnames';
import EmployerDashboardCard from './empdashcard';


export default class EmployerLane extends React.Component {
  constructor(props) {
    super(props);
  }

  getLargeModal = () => {

    let dispatch = refs['item0'].props.dispatch;
    let advance = refs['item0'].props.advance;
    let revert = refs['item0'].props.revert;
    let status = refs['item0'].props.lane;
    let index = refs['item0'].props.index;
    let item = refs['item0'].props.item;
    let reject = refs['item0'].props.reject;
    let accept = refs['item0'].props.accept;
    let jobList = refs['item0'].props.jobList;

    return (
      <Modal show={false}>
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
  };

  render() {
    let list = this.props.data;
    console.log('list is:', list);
    let newList = ['First Item', 'Second Item', 'Third Item', 'Fourth Item'];
    return (
      <div className='shortcard'>
        <ul>
          {list.map((item, index) => {console.log('item in map', item);
                                     return <EmployerDashboardCard item={item}
                                                                   listLength={this.props.data.length}
                                                                   list={list}
                                                                   currentModal={this.props.currentModal}
                                                                   index={index}
                                                                   ref={'item'+index}
                                                                   lane={this.props.lane}
                                                                   advance={this.props.advance}
                                                                   accept={this.props.accept}
                                                                   revert={this.props.revert}
                                                                   reject={this.props.reject}
                                                                   dispatch={this.props.dispatch}/>;})}
        </ul>
      </div>
    );
  }
}
