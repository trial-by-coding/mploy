import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn
} from 'global/jsx/sidebar_component';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, History } from 'react-router';
import actions from 'redux/actions';


export default class ApplicantSidebar extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className='sidebar-header'>PAGES</div>
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}}>
                  <SidebarNavItem glyph='icon-fontello-user' name='Profile' href='/applicant/profile' />
                  <SidebarNavItem glyph='icon-fontello-dollar' name='Jobs' href='/applicant/jobs' />
                  <SidebarNavItem glyph='icon-dripicons-calendar' name='Calendar' href='/applicant/calendar' />
                  <SidebarNavItem glyph='icon-fontello-chart-pie' name='Charts' href='/applicant/charts' />
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


@connect(state => state)
export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.dispatch(actions.fetchUser());
  }

  render() {

  const user = this.props;

    return (
      <div id='sidebar' {...this.props}>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <Img src={user.user.profile_picture} width='45' height='45'
                  style={{display: 'block', borderRadius: 45, border: '2px solid #fff', margin: 'auto', float: 'left'}} />
              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>
                {user.user.firstname} {user.user.lastname}
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <SidebarControls>
          <SidebarControlBtn bundle='fontello' glyph='home' sidebar={0} />
          <SidebarControlBtn bundle='fontello' glyph='user-1' sidebar={1} />
        </SidebarControls>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <ApplicantSidebar />
          </Sidebar>
          <Sidebar sidebar={1}>
            <ApplicantSidebar />
          </Sidebar>
        </div>
      </div>
    );
  }
}
