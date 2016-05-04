import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, History } from 'react-router';
import actions from 'redux/actions';

class Chart extends React.Component {
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

@connect(state => state)
export default class Body extends React.Component {



componentWillMount() {
  this.props.dispatch(actions.fetchChart());


  setTimeout(() => {

      (() => {
        let pie = Rubix.Pie('#pie-chart', {
          title: 'Application Progress',
          subtitle: 'none',
          height: 300
        });

        pie.addData([
          {
            name: '',
            value: 45.0,
            color: '#4572a7'
          },
          {
            name: 'IE',
            value: 26.8,
            color: '#aa4643'
          },
          {
            name: 'Chrome',
            value: 12.8,
            color: '#89a54e'
          },
          {
            name: 'Safari',
            value: 8.5,
            color: '#80699b'
          },
          {
            name: 'Opera',
            value: 6.2,
            color: '#3d96ae'
          },
          {
            name: 'Others',
            value: 0.7,
            color: '#db843d'
          }
        ]);

      })();


      (() => {
        let pie2 = Rubix.Pie('#pie2-chart', {
          title: 'Application Outcome',
          subtitle: 'none',
          height: 300
        });

        pie2.addData([
          {
            name: 'Firefox',
            value: 45.0,
            color: '#4572a7'
          },
          {
            name: 'IE',
            value: 26.8,
            color: '#aa4643'
          },
          {
            name: 'Chrome',
            value: 12.8,
            color: '#89a54e'
          },
          {
            name: 'Safari',
            value: 8.5,
            color: '#80699b'
          },
          {
            name: 'Opera',
            value: 6.2,
            color: '#3d96ae'
          },
          {
            name: 'Others',
            value: 0.7,
            color: '#db843d'
          }
        ]);

      })();
    }, 15);
  }

  constructor(props){
    super(props);
}

  render() {

    console.log('CHART STATS', this.props);

    if( !this.props.chart ) {
      return ( <div>Loading...</div>);
    }

   const { dispatch } = this.props;


    return (
      <Container id='body'>
      <div>
      <Chart dispatch={dispatch} />
        <Grid>
          <Row>
            <Col sm={6} collapseRight>
            <Chart id='pie2-chart' />
            </Col>
            <Col sm={6} collapseRight>
              <Chart id='pie-chart' />
            </Col>
          </Row>
        </Grid>
        </div>
      </Container>
    );
  }
}
