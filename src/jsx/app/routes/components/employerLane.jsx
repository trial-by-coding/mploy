import classNames from 'classnames';
import EmployerDashboardCard from './empdashcard';


export default class EmployerLane extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let list = this.props.data;
    let newList = ['First Item', 'Second Item', 'Third Item', 'Fourth Item'];
    return (
      <div className='shortcard'>
          {list.map((item, index) =>  <EmployerDashboardCard key={item.id}
                                                             item={item}
                                                             list={list}
                                                             currentModal={this.props.currentModal}
                                                             index={index}
                                                             lane={this.props.lane}
                                                             advance={this.props.advance}
                                                             accept={this.props.accept}
                                                             revert={this.props.revert}
                                                             reject={this.props.reject}
                                                             dispatch={this.props.dispatch}/>)}
      </div>
    );
  }
}
