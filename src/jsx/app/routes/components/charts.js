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
          title: 'Status of Current Applications',
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
            // value: charts.considered,
            value: 20,
            color: '#aa4643'
          },
          {
            name: 'Offered',
            value: charts.offered,
            color: '#89a54e'
          },
          {
            name: 'Interviewed',
            value: 23,
            //value: charts.interviewed,
            color: '#80699b'
          },
          {
            name: 'No Data',
            value: 18, // data placeholder.
            color: '#db843d'
          }

        ]);
      })();

      (() => {
        var pie = Rubix.Pie('#jobs-chart', {
          title: 'Outcomes',
          subtitle: 'May 2016',
          height: 300
        });
        pie.addData([
          {
            name: 'In Process',
            value: charts.applied,
            // in process = total apps - ( denied + rescinded)
            color: '#4572a7'
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
          },
          {
            name: 'No Data',
            value: 18, // data placeholder. Use line above when data available.
            color: '#80699b'
          }

        ]);
      })();
    }, 300);
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
