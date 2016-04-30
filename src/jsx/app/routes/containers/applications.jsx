import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'routes/components/header';
import Sidebar from 'routes/components/sidebar';
import Footer from 'routes/components/footer';
import AppCard from 'routes/components/appCard';
import { getApplications } from 'redux/actions/index.js';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';

@connect((state) => state)
class ApplicationContainer extends React.Component {
    constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.dispatch(getApplications(1))  
  }




	render() {
    const { dispatch } = this.props;


    console.log('in render func props:', this.props)

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
    }
    const panelPad = {
      'padding': '0px 20px'
    }

  if(!this.props.appList.items) {
    return <div> Loading... </div>
  } 
console.log("applist before render:", this.props.applist)
	return (
    <Grid>
  		<Row>
        {this.props.appList.items.map(function(app){
          // console.log('inside applist:', app)
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
            ) 
          })
        }
  		</Row>
    </Grid>
	)}
}
