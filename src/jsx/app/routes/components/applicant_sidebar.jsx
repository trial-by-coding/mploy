import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn
} from 'global/jsx/sidebar_component';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, History } from 'react-router';
import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';


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

                  <SidebarNavItem glyph='icon-fontello-gauge' name={<span>Dashboard <BLabel className='bg-darkgreen45 fg-white'></BLabel></span>}>
                  <SidebarNav>
                  <SidebarNavItem glyph='icon-fontello-user' name='Profile' href='/profile' />
                </SidebarNav>
                  <SidebarNav>
                    <SidebarNavItem glyph='icon-fontello-dollar' name='Jobs' href='/jobs' />
                  </SidebarNav>
                  </SidebarNavItem>
                  <SidebarNavItem glyph='icon-feather-menu' name={<span>Menu <BLabel className='bg-darkgreen45 fg-white'></BLabel></span>}>
                    <SidebarNav>
                    <SidebarNavItem glyph='icon-dripicons-calendar' name='Calendar' href='/calendar' />
                    </SidebarNav>
                    <SidebarNav>
                    <SidebarNavItem glyph='icon-fontello-chart-pie' name='Charts' href='/charts' />
                    </SidebarNav>
                    </SidebarNavItem>


                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}



export default class extends React.Component {
  render() {
    const user = this.props;
    return (
      <div id='sidebar' {...this.props}>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <img src={user.profile_picture} width='40' height='40' />

                {/*<Avatar src = {user.profile_picture} float = 'left' style = {this.avatarStyle.bind(this).call()} size = {55}/>*/}

              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>
                {user.firstname} {user.lastname}
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <SidebarControls>
          <SidebarControlBtn bundle='fontello' glyph='home' sidebar={0} />
          <SidebarControlBtn bundle='fontello' glyph='chart-pie-2' sidebar={1} />
          <SidebarControlBtn bundle='fontello' glyph='user-1' sidebar={2} />
        </SidebarControls>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <ApplicantSidebar />
          </Sidebar>
          <Sidebar sidebar={1}>
            <ApplicantSidebar />
          </Sidebar>
          <Sidebar sidebar={2}>
            <ApplicantSidebar />
          </Sidebar>
        </div>
      </div>
    );
  }
}
