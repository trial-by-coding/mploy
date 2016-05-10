import classNames from 'classnames';
import ApplicantDashboardCard from './appdashcard';


export default class ApplicantLane extends React.Component {

  render() {
    let list = this.props.data;
    let newList = ['First Item', 'Second Item', 'Third Item', 'Fourth Item'];
    // console.log("AppList data", list);
    return (
      <div className='shortcard'>
        {list.map((item, index) => <ApplicantDashboardCard  item={item}
                                                            index={index}
                                                            rescind={this.props.rescind}/>)}
      </div>
    );
  }
}
