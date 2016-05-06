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

    setTimeout(() => {
      (() => {
        var pie = Rubix.Pie('#resume-chart', {
          title: 'Application Status',
          subtitle: 'May 2016',
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
            name: 'Denied',
            value: charts.denied,
            color: '#89a54e'
          },
          {
            name: 'Offered',
            value: charts.offered,
            color: '#80699b'
          },
          {
            name: 'Rescinded',
            // value: charts.rescinded,
            value: 25,  // data placeholder. Use line above when data available.
            color: '#db843d'
          },
          {
            name: 'Pending',
            // value: charts.pending,
            value: 8.5, // data placeholder. Use line above when data available.
            color: '#80699b'
          },
          {
            name: 'Said No',
            value: 6.2,
            color: '#3d96ae'
          }
        ]);
      })();

      (() => {
        var pie = Rubix.Pie('#jobs-chart', {
          title: 'Jobs Chart',
          subtitle: 'May 2016',
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
            name: 'Denied',
            value: charts.denied,
            color: '#89a54e'
          },
          {
            name: 'Offered',
            value: charts.offered,
            color: '#80699b'
          },
          {
            name: 'Rescinded',
            // value: charts.rescinded,
            value: 10,  // data placeholder. Use line above when data available.
            color: '#db843d'
          },
          {
            name: 'Pending',
            // value: charts.pending,
            value: 17.5, // data placeholder. Use line above when data available.
            color: '#80699b'
          },
          {
            name: 'Said No',
            value: 33,
            color: '#3d96ae'
          }
        ]);
      })();
    }, 15);
  }

  render() {
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
