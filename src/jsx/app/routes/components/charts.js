import classNames from 'classnames';
import { connect } from 'react-redux';
import actions from 'redux/actions';

export default class Charts extends React.Component {
  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 25}}>
            <div id={this.props.id}></div>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}

export default class Body extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    const charts = this.props;
    console.log('charts: ', charts)

    setTimeout(() => {


      (() => {
        var pie = Rubix.Pie('#resume-chart', {
          title: 'Status of Current Applications',
          height: 300
        });
        pie.addData([
          {
            name: 'Applied',
            value: charts.applied,
            color: '#4572a7'
          },
          {
            name: 'Considered',
            value: charts.considered,
            color: '#aa4643'
          },
          {
            name: 'Offered',
            value: charts.offered,
            color: '#89a54e'
          },
          {
            name: 'Interviewed',
            value: charts.interviewed,
            color: '#80699b'
          }

        ]);
      })();

      (() => {
        var pie = Rubix.Pie('#jobs-chart', {
          title: 'Past Application Outcomes',
          height: 300
        });
        pie.addData([
          {
            name: 'In Process',
            value: charts.total_apps - (charts.denied + charts.rescinded),
            color: '#89a54e'
          },
          {
            name: 'Denied',
            value: charts.denied,
            color: '#aa4643'
          },
          {
            name: 'Rescinded',
            value: charts.rescinded,
            color: '#db843d'
          }

        ]);
      })();
    }, 300);
  }

  render() {
    if (this.props.total_apps === 0){
      return (
        <Container id='body'>
          <h4>Check back after you've submitted an application to see your stats.</h4>
        </Container>
        );
    }

    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={6} collapseRight>
              <Charts id='resume-chart' />
            </Col>
            <Col sm={6} collapseRight>
              <Charts id='jobs-chart' />
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}
