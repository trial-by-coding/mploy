import classNames from 'classnames';
import EmployerDashboardCard from './empdashcard';



export default class EmployerLane extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    let list = this.props.data;
    let newList = ['First Item', 'Second Item', 'Third Item', 'Fourth Item']
    console.log("AppList data", list)
    return (
      <div className='shortcard'>
        <ul>
          {list.map((item, index) => <EmployerDashboardCard item={item}
                                                            index={index}
                                                            lane={this.props.lane}
                                                            advance={this.props.advance}
                                                            dispatch={this.props.dispatch}/>)}
        </ul>
      </div>
    );
  }
}


