import classNames from 'classnames';
import AppCard from 'routes/components/appCard';
import { getApplications } from 'redux/actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from 'redux/actions';

@connect((state) => state)
export default class ApplicationContainer extends React.Component {
    constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(getApplications(2));
  }

	render() {
    const { dispatch } = this.props;

    const styles = {
      margin: '12.5px 0',
      borderBottom: '1px dotted #999',
      paddingBottom: 12.5,
      'textAlign': 'center'
    };
    const textStyle = {
      textDecoration: this.props.completed ? 'line-through' : '',
    };
    const buttonStyle = {
      height: 25,
      color: 'red',
      fontSize: 20,
      lineHeight: 0,
      marginTop: -3,
      border: 'none',
      background: 'none',
    };
    const panelStyle = {
    	'maxWidth': '400px'
    };
    const panelPad = {
      'padding': '0px 20px'
    };

  if(!this.props.appList.items) {
    return <div> Loading... </div>;
  }
	return (
    <Container id='body' className='social'>
      <Grid>
    		<Row>
          {this.props.appList.items.map(function(app){
             return (
                <Col sm={12} md={4} lg={4}>
                  <PanelContainer style={panelStyle}>
                    <Panel style={ panelPad }>
                      <PanelBody >
                          <AppCard dispatch={dispatch} fuckingApps={app} />
                      </PanelBody>
                    </Panel>
                  </PanelContainer>
                </Col>
              );
            })
          }
    		</Row>
      </Grid>
    </Container>
	);}
}
