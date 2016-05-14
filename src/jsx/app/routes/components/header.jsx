import { History, Link, State, Navigation } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Notifications from './notifications.jsx'
import { SidebarBtn } from 'global/jsx/sidebar_component';
import actions from 'redux/actions';

export default class Brand extends React.Component {
  render() {
    return (
      <NavHeader {...this.props}>
        <NavBrand tabIndex='-1'>
          <img src='/imgs/mploy_logo1.png' alt='mploy' style={{'top':'-10px'}} width='40' />
        </NavBrand>
      </NavHeader>
    );
  }
}


var DirectNavItem = React.createClass({
  mixins: [State, Navigation],
  render() {
    var active = false;
    var currentLocation = this.context.router.state.location.pathname;

    if(!active && this.props.path) {
      active = this.isActive(this.props.path) && (currentLocation === this.props.path);
    }

    var classes = classNames({
      'pressed': active
    });
    return (
      <NavItem className={classes} {...this.props}>
        <Link to={this.props.path}>
          <Icon bundle={this.props.bundle || 'fontello'} glyph={this.props.glyph} />
        </Link>
      </NavItem>
    );
  }
});




class  HeaderNavigation extends React.Component {
  constructor(props){
    super(props)

    this.logout = this.logout.bind(this)
  }


  logout() {
      window.location = '/auth/logout';
  }

  render() {
    console.log("HeaderNavigation:render:props:",this.props)
    var props = {
      ...this.props,
      className: classNames('pull-right', this.props.className)
    };

    const bullHorn = {
    position: `absolute`,
    right: `90px`
    }

    const logoutBtn = {
    position: `absolute`,
    right: `0`,
    'margin-right':'0px',
    'background-color':'#383838'
    }

    const rowMargins = {
      'marginRight': '-10px'
    }

    return (

      <NavContent className='pull-right' {...this.props}>
      <Row style={rowMargins}>
        <Nav xs={6} style={bullHorn} >
         <Notifications xs={5} notifications={this.props.notifications} 
                               dispatch={this.props.dispatch} 
                               removeNotif={this.props.removeNotif} />
        </Nav>
        <Nav xs={6} style={logoutBtn}>
          <NavItem  className='logout' href='#' onClick={() => this.logout()}>
            <Icon bundle='fontello' glyph='off-1' />
          </NavItem>
        </Nav>
      </Row>
      </NavContent>
    );
  }
};

export default class Header extends React.Component {
  constructor(props){
    super(props)
    this.removeNotif = this.removeNotif.bind(this)
  }


removeNotif(e, notifyID, ndx){
  e.preventDefault()
  this.props.dispatch(actions.deleteNotification(notifyID, ndx))
}


  render() {


    return (
      <Grid id='navbar' {...this.props}>
        <Row>
          <Col xs={12}>
            <NavBar style={{'background':'white', 'borderBottom':'1px solid rgba(0, 0, 0, 0.34)'}} fixedTop id='rubix-nav-header'>
              <Container fluid>
                <Row>
                  <Col xs={2} visible='xs'>
                    <SidebarBtn />
                  </Col>
                  <Col xs={6} sm={10}>
                    <Brand />
                  </Col>
                  <Col xs={4} sm={2}>
                    <HeaderNavigation pressed={this.props.pressed} 
                                      notifications={this.props.notifications} 
                                      dispatch={this.props.dispatch} 
                                      removeNotif={this.removeNotif} />
                  </Col>
                </Row>
              </Container>
            </NavBar>
          </Col>
        </Row>
      </Grid>
    );
  }
}
