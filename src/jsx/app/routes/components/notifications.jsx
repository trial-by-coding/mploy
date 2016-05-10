import classNames from 'classnames';

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';
import moment from 'moment'

export default class Notifications extends React.Component { 
  constructor(props){
    super(props) 

  }




  render(){
    const listNotifs = {
    'min-height': '200px',
    display: 'block',
    left: '-300px',
    'width': '370px',
    }

    const rowStyle = {
      padding: '0px 15px'
    }    
    const avaCont = {
      'padding-left': '0px'
    }

    const timeAgo = {
      color:'#B2B2B2'
    }

    const keyWords = {
      'color':'#3888D3'
    }    

    const label = {
      'background-color':'#3888D3'
    }  

    const cancelBtn = {
      'color':'black'
    }
    
 
    console.log('lowest level notifs:', this.props) 

    if(!this.props.notifications){
      return (

    <NavItem dropdown className='collapse-left'>
        <DropdownButton nav> 
          <Icon bundle='fontello' glyph='bullhorn' />
          <Badge className='fg-darkbrown bg-orange notification-badge'>3</Badge>
        </DropdownButton>
        <Menu bsStyle='green'>
          <MenuItem active href='#'>Action</MenuItem>
          <MenuItem href='#'>Another action</MenuItem>
          <MenuItem href='#'>Something else here</MenuItem>
          <MenuItem divider/>
          <MenuItem href='#'>Separated link</MenuItem>
        </Menu>
    </NavItem>
      )
    }

    return (

    <NavItem dropdown className='collapse-left'>
        <DropdownButton nav> 
          <Icon bundle='fontello' glyph='bullhorn' />
          <Badge className='fg-darkbrown bg-orange notification-badge'>{this.props.notifications.length}</Badge>
        </DropdownButton>
        <Menu style={listNotifs}  bsStyle='white'>
        {this.props.notifications.map(notif => 
          <MenuItem href='#'>
            <Grid>
              <Row style={rowStyle} >
                <Col xs={10} className='notification-container' collapseLeft collapseRight>
                  <div className='time'>
                    <strong className='fg-darkgray50'><Icon bundle='fontello' glyph='chat-5'/><em></em></strong>
                  </div>
                  <div className='message-header'>
                    <strong className='fg-darkgreen45'>{notif.company_name}</strong>
                  </div>
                  <div className='message-details fg-text'>
                    <span>Your application for <strong style={keyWords}> {notif.job_title}</strong> at <strong style={keyWords}>{notif.company_name}</strong>, now has a status of <strong style={keyWords}>{notif.new_status}</strong></span>
                  </div>
                  <div style={timeAgo} >
                    <span> {moment(notif.created_at).startOf('hour').fromNow('lll')} ago</span>
                  </div>
                  <hr/>
                </Col>
                <Col xs={2} style={avaCont} className='avatar-container' collapseRight>
                  <div className='text-center'>
                    <Icon onClick={(e)=> this.props.xNotif(e,notif.notifyID)} style={cancelBtn}  bundle='fontello' glyph='cancel-circle'/>
                  </div>
                </Col>
              </Row>
            </Grid>
          </MenuItem>
        )}

        </Menu>
    </NavItem>


      )

  }
}


// <div><img src='/imgs/avatars/avatar22.png' width='40' height='40' alt='sarah_patchett' /></div>