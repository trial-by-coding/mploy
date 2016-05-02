import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn
} from 'global/jsx/sidebar_component';


import { Link, History } from 'react-router';
import LoremIpsum from 'global/jsx/loremipsum';

class ApplicantSidebar extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className='sidebar-header'>PAGES</div>
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}}>
                  <SidebarNavItem glyph='icon-fontello-user' name='Profile' href='/profile' />
                  <SidebarNavItem glyph='icon-fontello-user' name='Jobs' href='/jobs' />
                    <SidebarNavItem glyph='icon-ikons-bar-chart-2 float-right-rtl' name={<span>Charts <BLabel className='bg-brown50 fg-white'>4</BLabel></span>}>
                        <SidebarNav>
                              <SidebarNavItem glyph='icon-fontello-chart-pie' name='Pie + Donut Series' href='/rubix/piedonut' />
                        </SidebarNav>
                    </SidebarNavItem>
                  <SidebarNavItem glyph='icon-feather-mail' name={<span>Menu <BLabel className='bg-darkgreen45 fg-white'>2</BLabel></span>}>
                    <SidebarNav>
                        <SidebarNavItem glyph='icon-dripicons-view-list' name='Lists' href='/lists' />
                        <SidebarNavItem glyph='icon-dripicons-calendar' name='Calendar' href='/calendar' />
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

class DummySidebar extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div className='sidebar-header'>DUMMY SIDEBAR</div>
            {/*<LoremIpsum query='1p' />*/}
          </Col>
        </Row>
      </Grid>
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



                {/*<img src='/imgs/app/avatars/avatar0.png' width='40' height='40' />*/}

                {/*<Avatar src = {this.props.currentAvatar} float = 'left' style = {this.avatarStyle.bind(this).call()} size = {55}/>*/}


              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>LinkedIn User</div>
                {/*<div>
                  <Progress id='demo-progress' value={30} min={0} max={100} color='#ffffff'/>
                  <Icon id='demo-icon' bundle='fontello' glyph='lock-5' />
                </div>*/}
              </Col>
            </Row>
          </Grid>
        </div>
        <SidebarControls>
          <SidebarControlBtn bundle='fontello' glyph='columns' sidebar={0} />
          <SidebarControlBtn bundle='fontello' glyph='chat-1' sidebar={1} />
          <SidebarControlBtn bundle='fontello' glyph='chart-pie-2' sidebar={2} />
          <SidebarControlBtn bundle='fontello' glyph='th-list' sidebar={3} />
          <SidebarControlBtn bundle='fontello' glyph='user-1' sidebar={4} />
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
          <Sidebar sidebar={3}>
            <ApplicantSidebar />
          </Sidebar>
          <Sidebar sidebar={4}>
            <ApplicantSidebar />
          </Sidebar>
        </div>
      </div>
    );
  }
}
