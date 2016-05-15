import {
  Sidebar,
  SidebarNav,
  SidebarNavItem,
  SidebarControls,
  SidebarControlBtn
} from 'global/jsx/sidebar_component';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
                  <SidebarNavItem glyph='icon-feather-map' name='Dashboard' href='/applicant' />
                  <SidebarNavItem glyph='icon-ikons-user-circle' name='Profile' href='/applicantprofile' />
                  <SidebarNavItem glyph='icon-fontello-dollar' name='Jobs' href='/applicantjobs' />
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
        <hr style={{borderColor: '#2AA38B', borderWidth: 2, marginTop: 15, marginBottom: 0, width:  125}} />
          <Grid gutterBottom>
            <Row>
              <Col xs={12}>
                <div className='sidebar-header'>EXTRAS</div>
                <div className='sidebar-nav-container'>
                  <SidebarNav style={{marginBottom: 0}}>
                    <SidebarNavItem glyph='icon-fontello-calendar-1' name='Calendar' href='/applicantcalendar' />
                    <SidebarNavItem glyph='icon-fontello-chart-pie' name='Charts' href='/applicantcharts' />
                  </SidebarNav>
                </div>
              </Col>
            </Row>
          </Grid>
         <hr style={{borderColor: '#2AA38B', borderWidth: 2, marginTop: 15, marginBottom: 0, width: 125}} />
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
        <div style={{'background-color':'#395660'}}id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col style={{'padding':'0px'}} xs={12} collapseRight>
                <img src={user.user.profile_picture} width='60' height='60'
                  style={{display: 'block', borderRadius: 45, border: '2px solid #2AA38B', padding:'3px', margin: 'auto'}} />
              </Col>
            </Row>
          </Grid>
        </div>
        <div id='sidebar-container'>
            <ApplicantSidebar />
        </div>
      </div>
    );
  }
}
