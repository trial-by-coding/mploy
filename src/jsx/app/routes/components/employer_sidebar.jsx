import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn
} from 'global/jsx/sidebar_component';

import { connect } from 'react-redux'
import { Link } from 'react-router';
import LoremIpsum from 'global/jsx/loremipsum';
import actions from 'redux/actions'

class EmployerSidebar extends React.Component {
  render() {
    let posts = this.props.posts;


    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className='sidebar-header'>PAGES</div>
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}}>
                  <SidebarNavItem glyph='icon-fontello-gauge' name='Home' href='/employer' />
                  <SidebarNavItem glyph='icon-fontello-user' name='Profile' href='/profile' />
                  <SidebarNavItem glyph='icon-fontello-user' name='Calendar' href='/calendar' />
                    <SidebarNavItem glyph='icon-ikons-bar-chart-2 float-right-rtl' name={<span>Job Posts<BLabel className='bg-brown50 fg-white'>4</BLabel></span>}>
                      <SidebarNav>
                        { posts.map(item => <SidebarNavItem glyph='icon-outlined-paper-sheet' name={item.job_title} href='/employer' />)}
                        <SidebarNavItem glyph='icon-outlined-todolist-add' name='Add New Post' href='/newjob' /> 
                        
                      </SidebarNav>
                    </SidebarNavItem>
                    <SidebarNavItem glyph='icon-ikons-bar-chart-2 float-right-rtl' name={<span>Charts <BLabel className='bg-brown50 fg-white'>4</BLabel></span>}>
                        <SidebarNav>
                          <SidebarNavItem glyph='icon-fontello-chart-area' name='Rubix Charts'>
                            <SidebarNav>
                              <SidebarNavItem name='Pie + Donut Series' href='/rubix/piedonut' />
                            </SidebarNav>
                          </SidebarNavItem>
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
            <LoremIpsum query='1p' />
          </Col>
        </Row>
      </Grid>
    );
  }
}

@connect(state => state)
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(actions.getJobPosts());
  }


  setJobPost = (jobID) => {
    this.props.dispatch(actions.setJobPost(jobID));
  };

  render() {
    console.log('siderbar props', this.props);


    return (
      <div id='sidebar' {...this.props}>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <img src='/imgs/app/avatars/avatar0.png' width='40' height='40' />



              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>LinkedIn User</div>
                <div>
                  <Progress id='demo-progress' value={30} min={0} max={100} color='#ffffff'/>
                  <Icon id='demo-icon' bundle='fontello' glyph='lock-5' />
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <SidebarControls>
          <SidebarControlBtn bundle='fontello' glyph='docs' sidebar={0} />
          <SidebarControlBtn bundle='fontello' glyph='bell-5' sidebar={4} />
        </SidebarControls>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <EmployerSidebar  posts={this.props.posts}
                              setJobPost={this.setJobPost}/>
          </Sidebar>
        </div>
      </div>
    );
  }
}