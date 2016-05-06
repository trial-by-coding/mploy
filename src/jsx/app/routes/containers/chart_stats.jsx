import classNames from 'classnames';
import Charts from 'routes/components/charts';
import { connect } from 'react-redux';
import { Link, History } from 'react-router';
import actions from 'redux/actions';

@connect(state => state)
export default class ChartContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchCharts());
  }
  constructor(props){
    super(props);
}

render() {

  const { dispatch } = this.props;

        const firstname  = this.props.charts.firstname;
        const applied = this.props.charts.applied;
        const considered = this.props.charts.considered;
        const denied = this.props.charts.denied;
        const offered = this.props.charts.offered;
        const rescinded = this.props.charts.rescinded;
        const statID = this.props.charts.statID;
        const total_apps = this.props.charts.total_apps;
        const user_id = this.props.charts.user_id;

 if( !this.props.charts ) {
   return ( <div>Loading...</div>);
 }

  return (
    <Container id='body' className='social'>
      <div>
        <Charts
        dispatch={dispatch}
        applied={applied}
        considered={considered}
        denied={denied}
        offered={rescinded}
        statID={statID}
        total_apps={total_apps}
        user_id={user_id}
        />
      </div>
    </Container>
  );
 }
}
