import {
  Sidebar,
  SidebarNav,
  SidebarNavItem,
  SidebarControls,
  SidebarControlBtn
} from 'global/jsx/sidebar_component';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import actions from 'redux/actions';

class EmployerSidebar extends React.Component {
  render() {
      let posts = this.props.posts;
      if(posts === undefined || posts.length === 0) {
        return (
          <div>
          <Grid>
            <Row>
              <Col xs={12}>
                <div className='sidebar-header'>PAGES</div>
                <div className='sidebar-nav-container' overflowY='scroll'>
                  <SidebarNav style={{marginBottom: 0}}>
                    <SidebarNavItem glyph='icon-fontello-gauge' name='Dashboard' href='/employer' />
                    <SidebarNavItem glyph='icon-fontello-user' name='Profile' href='/employerprofile' />
                      <SidebarNavItem glyph='icon-ikons-bar-chart-2 float-right-rtl' name={<span>Job Posts</span>}>
                        <SidebarNav>
                          <SidebarNavItem glyph='icon-outlined-todolist-add' name='Add New Post' href='/employernewjob' />
                        </SidebarNav>
                      </SidebarNavItem>
                      <SidebarNavItem glyph='icon-dripicons-calendar' name='Calendar' href='/employercalendar' />
                  </SidebarNav>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        );
      }

      return (
        <div>
          <Grid>
            <Row>
              <Col xs={12}>
                <div className='sidebar-header'>PAGES</div>
                <div className='sidebar-nav-container' overflowY='scroll'>
                  <SidebarNav style={{marginBottom: 0}}>
                    <SidebarNavItem glyph='icon-fontello-gauge' name='Dashboard' href='/employer' />
                    <SidebarNavItem glyph='icon-fontello-user' name='Profile' href='/employerprofile' />
                      <SidebarNavItem glyph='icon-ikons-bar-chart-2 float-right-rtl' name={<span>Job Posts<BLabel className='bg-brown50 fg-white'>{posts.length}</BLabel></span>}>
                        <SidebarNav>
                          {
                            posts.map(item => <SidebarNavItem glyph='icon-outlined-paper-sheet' name={item.job_title} onClick={() => this.props.select(item.jobID)} />)
                          }
                          <SidebarNavItem glyph='icon-outlined-todolist-add' name='Add New Post' href='/employernewjob' />
                        </SidebarNav>
                      </SidebarNavItem>
                      <SidebarNavItem glyph='icon-dripicons-calendar' name='Calendar' href='/employercalendar' />
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

  selectJobPost = (jobID) => {
    console.log('job post selected', this);
    this.props.dispatch(actions.selectJob(jobID));
    
  };

  render() {
    const user = this.props;
    // console.log('siderbar props', this.props);

    let posts = this.props.posts;

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
        <div id='sidebar-container'>
            <EmployerSidebar  posts={this.props.posts}
                              select={this.selectJobPost}/>
        </div>
      </div>
    );
  }
}
