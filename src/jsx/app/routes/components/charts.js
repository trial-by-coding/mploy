import classNames from 'classnames';
import { connect } from 'react-redux';
// import { Link, History } from 'react-router';
import actions from 'redux/actions';


export default class Charts extends React.Component {
  render() {
    const charts = this.props;
    console.log('PIE ~>',this.props);
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
  componentDidMount() {
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
            value: 45.0,
            color: '#4572a7'
          },
          {
            name: 'Considered',
            value: 26.8,
            color: '#aa4643'
          },
          {
            name: 'Denied',
            value: 12.8,
            color: '#89a54e'
          },
          {
            name: 'Offered',
            value: 8.5,
            color: '#80699b'
          },
          {
            name: 'Rescinded',
            value: 0.7,
            color: '#db843d'
          }
        ]);
      })();
    }, 15);
  }
  render() {

  const charts = this.props;
  console.log('chart COMPONENT bottom ->', this.props);

    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={6} collapseRight>
              <Charts id='resume-chart' />
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}
