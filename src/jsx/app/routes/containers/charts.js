import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, History } from 'react-router';
import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

export default class Chart extends React.Component {
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

let interval = null;
export default class Body extends React.Component {
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentDidMount() {
    setTimeout(() => {
      (() => {
        let pie = Rubix.Pie('#pie-chart', {
          title: 'Pie chart',
          subtitle: 'Browser Share',
          height: 300
        });

        pie.addData([
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


      (() => {
        let pie2 = Rubix.Pie('#pie2-chart', {
          title: 'Pie2 chart',
          subtitle: 'Browser Share',
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

  render() {
    return (
      <Container id='body'>
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
      </Container>
    );
  }
}
