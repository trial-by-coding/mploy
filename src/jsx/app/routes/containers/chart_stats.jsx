import classNames from 'classnames';
import Charts from 'routes/components/charts';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
      const denied = this.props.charts.denied;
      const rescinded = this.props.charts.rescinded;
      const applied = this.props.charts.applied;
      const considered = this.props.charts.considered;
      const interviewed = this.props.charts.interviewed;
      const offered = this.props.charts.offered;
      const total_apps = this.props.charts.total_apps;
      const statID = this.props.charts.statID;
      const user_id = this.props.charts.user_id;

 if(this.props.charts.total_apps === undefined) {
   return ( <div> Loading... </div>);
 }

 if (this.props.charts.total_apps === 0){
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={7} smCollapseRight>
              <PanelContainer>
                <Panel>
                  <PanelBody style={{padding: 0}}>
                    <Grid>
                      <Row>
                      	<Col xs={12}>
                          <h4 style={{textAlign: 'center'}}>Check back after you've submitted an application to see your stats.</h4>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelBody>
                </Panel>
              </PanelContainer>
            </Col>
          </Row>
        </Grid>
      </Container>
      );
  }

  return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={12} smCollapseRight>
              <PanelContainer>
                <Panel>
                  <PanelBody style={{padding: 0}}>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h4 style={{textAlign: 'center'}}>Apply to more jobs and watch as your charts update!</h4>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelBody>
                </Panel>
              </PanelContainer>
            </Col>
          </Row>
        </Grid>
        <Charts
        dispatch={dispatch}
        denied={denied}
        rescinded={rescinded}
        applied={applied}
        considered={considered}
        interviewed={interviewed}
        offered={offered}
        total_apps={total_apps}
        statID={statID}
        user_id={user_id}
        />
    </Container>
  );
 }
}
