import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn
} from 'global/jsx/sidebar_component';

import { Link } from 'react-router';
import LoremIpsum from 'global/jsx/loremipsum';

class EmployerSidebar extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className='sidebar-header'>PAGES</div>
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}}>
                <SidebarNavItem glyph='icon-fontello-gauge' name='Dashboard' href='/employer_dashboard' />
                <SidebarNavItem glyph='icon-fontello-user' name='Profile' href='/profile' />
                <SidebarNavItem glyph='icon-fontello-user' name='Calendar' href='/calendar' />
                <SidebarNavItem glyph='icon-ikons-bar-chart-2 float-right-rtl' name={<span>Job Posts<BLabel className='bg-brown50 fg-white'>4</BLabel></span>}>
                <SidebarNav>
                <SidebarNavItem glyph='icon-outlined-todolist-add' name='Add New Post' />
                </SidebarNav>
                </SidebarNavItem>
                <SidebarNavItem glyph='icon-ikons-bar-chart-2 float-right-rtl' name={<span>Menu <BLabel className='bg-brown50 fg-white'></BLabel></span>}>
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
    return (
      <div id='sidebar' {...this.props}>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>

    {/*<Avatar src = {this.props.currentAvatar} float = 'left' style = {this.avatarStyle.bind(this).call()} size = {55}/>*/}
                {/*<img src='/imgs/app/avatars/avatar0.png' width='40' height='40' />*/}

              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                {/*<div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>LinkedIn User</div>*/}

              </Col>
            </Row>
          </Grid>
        </div>
        <SidebarControls>
        <SidebarControlBtn bundle='fontello' glyph='docs' sidebar={0} />
        <SidebarControlBtn bundle='fontello' glyph='chart-pie-2' sidebar={1} />
        <SidebarControlBtn bundle='fontello' glyph='th-list-2' sidebar={2} />
        </SidebarControls>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <EmployerSidebar />
          </Sidebar>
          <Sidebar sidebar={1}>
            <EmployerSidebar />
          </Sidebar>
          <Sidebar sidebar={2}>
            <EmployerSidebar />
          </Sidebar>
        </div>
      </div>
    );
  }
}
