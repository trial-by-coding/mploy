import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SidebarBtn } from 'global/jsx/sidebar_component';


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

class HeaderNavigation extends React.Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
      window.location = '/auth/logout';
  }

  render() {
    let props = {
      ...this.props,
      className: classNames('pull-right', this.props.className)
    };

    return (
      <NavContent className='pull-right' {...this.props}>
        <Nav>
          <NavItem className='logout' href='#' onClick={() => this.logout()}>
            <Icon bundle='fontello' glyph='off-1' />
          </NavItem>
        </Nav>
      </NavContent>
    );
  }
};

export default class Header extends React.Component {
  render() {
    return (
      <Grid id='navbar' {...this.props}>
        <Row>
          <Col xs={12}>
            <NavBar style={{'background':'white', 'border-bottom':'1px solid rgba(0, 0, 0, 0.34)'}} fixedTop id='rubix-nav-header'>
              <Container fluid>
                <Row>
                  <Col xs={3} visible='xs'>
                    <SidebarBtn />
                  </Col>
                  <Col xs={6} sm={4}>
                    <Brand />
                  </Col>
                  <Col xs={3} sm={8}>
                    <HeaderNavigation pressed={this.props.pressed}  dispatch={this.props.dispatch} />
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
