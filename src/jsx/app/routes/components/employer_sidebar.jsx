import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn
} from 'global/jsx/sidebar_component';

import { connect } from 'react-redux'
import { Link } from 'react-router';
import LoremIpsum from 'global/jsx/loremipsum';
import actions from 'redux/actions';

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
                  <SidebarNavItem glyph='icon-fontello-gauge' name='Dashboard' href='/employer' />
                  <SidebarNavItem glyph='icon-fontello-user' name='Profile' href='/profile' />
                    <SidebarNavItem glyph='icon-ikons-bar-chart-2 float-right-rtl' name={<span>Job Posts<BLabel className='bg-brown50 fg-white'>4</BLabel></span>}>
                      <SidebarNav>
                        { posts.map(item => <SidebarNavItem glyph='icon-outlined-paper-sheet' name={item.job_title} href='/employer' />) }
                        <SidebarNavItem glyph='icon-outlined-todolist-add' name='Add New Post' href='/newjob' /> 
                      </SidebarNav>
                    </SidebarNavItem>
                    <SidebarNavItem glyph='icon-fontello-chart-pie' name='Charts' href='/charts' />
                    <SidebarNavItem glyph='icon-dripicons-calendar' name='Calendar' href='/calendar' />
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
    this.props.dispatch(actions.getJobPosts());
  }


  setJobPost = (jobID) => {
    this.props.dispatch(actions.setJobPost(jobID));
  };

  render() {
    console.log('siderbar props', this.props);
    let posts = this.props.posts
    if(!posts.length === 0) {
      return (<div> Loading... </div>)
    }

    return (
      <div id='sidebar' {...this.props}>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>

              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>

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
            <EmployerSidebar  posts={posts}
                              setJobPost={this.setJobPost}/>
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
