import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn
} from 'global/jsx/sidebar_component';

import { Link } from 'react-router';
import LoremIpsum from 'global/jsx/loremipsum';

class ApplicationSidebar extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className='sidebar-header'>PAGES</div>
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}}>
                  <SidebarNavItem glyph='icon-fontello-gauge' name='Dashboard' href='/' />
                  <SidebarNavItem glyph='icon-feather-mail' name={<span>Menu <BLabel className='bg-darkgreen45 fg-white'>3</BLabel></span>}>
                    <SidebarNav>
                      <SidebarNavItem glyph='icon-feather-inbox' name='Inbox' />
                      <SidebarNavItem glyph='icon-outlined-mail-open' name='Mail' />
                      <SidebarNavItem glyph='icon-dripicons-message' name='Compose' />
                    </SidebarNav>

                      </SidebarNavItem>
                        <SidebarNavItem glyph='icon-feather-share' name='Social' href='/social' />
                          <SidebarNavItem href='/timeline' glyph='icon-ikons-time' name='Static Timeline' />
                          <SidebarNavItem href='/interactive-timeline' glyph='icon-fontello-back-in-time' name='Interactive Timeline' />
                    <SidebarNavItem href='/lists' glyph='icon-fontello-flow-cascade' name='Lists' />
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

class TimelineComponent extends React.Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} collapseLeft collapseRight>
              <TimelineView className='border-black50 tl-blue'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineAvatar src='/imgs/avatars/avatar5.png' className='border-blue' />
                    <TimelineTitle>
                      Jordyn Ouellet
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div>
                          <div className='fg-lightgray'><small><strong>Aug 10, 2014</strong></small></div>
                          <div><small>Sent you a friend request!</small></div>
                        </div>
                        <br/>
                        <div className='text-center'>
                          <Button xs outlined bsStyle='darkgreen45'>
                            Accept
                          </Button>{' '}
                          <Button xs outlined bsStyle='red'>
                            Reject
                          </Button>
                        </div>
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
              <TimelineView className='border-black50 tl-green'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineAvatar src='/imgs/avatars/avatar7.png' className='border-green' />
                    <TimelineTitle>
                      Toby King
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div className='fg-lightgray'><small><strong>Aug 9, 2014</strong></small></div>
                        <div>
                          <small>Visiting <strong className='fg-darkgreen45'>The Museum of Modern Art</strong> at <strong><em>11 W 53rd St, New York, NY 10019</em></strong></small>
                        </div>
                        <br/>
                        <img border='0' src='/imgs/staticmap.png' alt='Points of Interest in Lower Manhattan' />
                      </li>
                      <li>
                        <div className='fg-lightgray'><small><strong>Aug 8, 2014</strong></small></div>
                        <div>
                          <small>Driving through! :)</small>
                        </div>
                        <br/>
                        <img border='0' width='155' src='/imgs/gallery/tumblr_n7yhe1sTa41st5lhmo1_1280-thumb.jpg' alt='the taxi' />
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
              <TimelineView className='border-black50 tl-yellow'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineAvatar src='/imgs/avatars/avatar10.png' className='border-yellow' />
                    <TimelineTitle>
                      Angelina Mills
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div className='fg-lightgray'><small><strong>Aug 8, 2014</strong></small></div>
                        <div>
                          <small>Hey you free tomorrow? Lets go shopping!</small>
                        </div>
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

class NotificationComponent extends React.Component {
  componentDidMount() {
    (function() {
      $(this.refs.sparklineOne.getDOMNode()).sparkline([2,3,5,1,2,5,8,6,7,9,3,5,7,8,3,3,2,9,5,3,2,2,4,6,7,8,9,1,12,14,11,3,4,6,9,10,12,9,5,3,2,2,4,6,7,8,9,10,11,12,14,23], {
          type: 'bar',
          barWidth: 2,
          height: '40',
          barSpacing: 1,
          barColor: '#D71F4B'});
      $(this.refs.sparklineTwo.getDOMNode()).sparkline([10,40,20,30,20,20,40,20,25,35,44,55,66,20,20,30,50,60,30,40,50,60,50,30,20,90,100,100,100,100,100,100], {
          type: 'bar',
          barWidth: 4,
          height: '40',
          barSpacing: 1,
          barColor: '#FADD7F'});
      $(this.refs.pieOne.getDOMNode()).sparkline([1,0.2], {
          type: 'pie',
          width: '35',
          height: '35',
          sliceColors: ['#FADD7F','#D71F4B']});
      $(this.refs.pieTwo.getDOMNode()).sparkline([0.2,1], {
          type: 'pie',
          width: '35',
          height: '35',
          sliceColors: ['#ff9900','#109618']});
      $(this.refs.pieThree.getDOMNode()).sparkline([1,0.2,0.3,0.2], {
          type: 'pie',
          width: '35',
          height: '35',
          sliceColors: ['#ff9900','#109618','#66aa00','#dd4477']});
      $(this.refs.pieFour.getDOMNode()).sparkline([0.2,0.3,0.4,0.1,1,0.2], {
          type: 'pie',
          width: '35',
          height: '35',
          sliceColors: ['#dd4477','#0099c6','#990099','#ff9900','#B4A1DD','#66aa00']});
    }.bind(this))();
  }
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} collapseLeft collapseRight>
              <TimelineView className='border-black50 tl-deepred'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineIcon glyph='icon-fontello-attention-3 bg-deepred fg-white' />
                    <TimelineTitle>
                      SYSTEM-WIDE ALERTS
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div>
                          <div className='fg-lightgray'><small><strong>Aug 12, 2014</strong></small></div>
                          <div><small>Spike in network traffic detected.</small></div>
                          <div><div ref='sparklineOne'></div></div>
                        </div>
                      </li>
                      <li>
                        <div>
                          <div className='fg-lightgray'><small><strong>Aug 10, 2014</strong></small></div>
                          <div><small>Node 1 down for 30 minutes! Take action!</small></div>
                        </div>
                        <br/>
                        <div className='text-center'>
                          <Button xs outlined bsStyle='darkgreen45'>
                            Restore
                          </Button>{' '}
                          <Button xs outlined bsStyle='red'>
                            Destroy
                          </Button>
                        </div>
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
              <TimelineView className='border-black50 tl-yellow'>
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineIcon glyph='icon-fontello-attention-3 bg-yellow fg-red' />
                    <TimelineTitle>
                      NODE ALERTS
                    </TimelineTitle>
                  </TimelineHeader>
                  <TimelineBody>
                    <ul>
                      <li>
                        <div>
                          <div className='fg-lightgray'><small><strong>Aug 12, 2014</strong></small></div>
                          <div><small>CPU running at 100% on Node 1.</small></div>
                          <div><div ref='sparklineTwo'></div></div>
                        </div>
                      </li>
                      <li>
                        <div>
                          <div className='fg-lightgray'><small><strong>Aug 10, 2014</strong></small></div>
                          <div><small>Running out of disk space on <strong className='fg-yellow'>Node 2</strong>, <strong className='fg-yellow'>Node 3</strong>, <strong className='fg-yellow'>Node 5</strong> and <strong className='fg-yellow'>Node 7</strong></small></div>
                        </div>
                        <br/>
                        <div className='text-center'>
                          <span ref='pieOne' style={{marginLeft: 5}}></span>
                          <span ref='pieTwo' style={{marginLeft: 5}}></span>
                          <span ref='pieThree' style={{marginLeft: 5}}></span>
                          <span ref='pieFour' style={{marginLeft: 5}}></span>
                        </div>
                      </li>
                    </ul>
                  </TimelineBody>
                </TimelineItem>
              </TimelineView>
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


export default class extends React.Component {
  render() {
    return (
      <div id='sidebar' {...this.props}>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                <img src='/imgs/app/avatars/avatar0.png' width='40' height='40' />
              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                <div style={{top: 23, fontSize: 16, lineHeight: 1, position: 'relative'}}>User</div>
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
          <SidebarControlBtn bundle='fontello' glyph='chat-1' sidebar={1} />
          <SidebarControlBtn bundle='fontello' glyph='chart-pie-2' sidebar={2} />
          <SidebarControlBtn bundle='fontello' glyph='th-list-2' sidebar={3} />
          <SidebarControlBtn bundle='fontello' glyph='bell-5' sidebar={4} />
        </SidebarControls>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <ApplicationSidebar />
          </Sidebar>
          <Sidebar sidebar={1}>
            <TimelineComponent />
          </Sidebar>
          <Sidebar sidebar={2}>
            <DummySidebar />
          </Sidebar>
          <Sidebar sidebar={3}>
            <DummySidebar />
          </Sidebar>
          <Sidebar sidebar={4}>
            <NotificationComponent />
          </Sidebar>
        </div>
      </div>
    );
  }
}
