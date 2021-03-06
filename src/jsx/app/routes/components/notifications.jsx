import classNames from 'classnames';
import actions from 'redux/actions';
import moment from 'moment';


export default class Notifications extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const listNotifs = {
    'overflowY': 'scroll',
    'maxHeight': '400px',
    display: 'block',
    left: '-300px',
    'width': '370px',
    };

    const rowStyle = {
      padding: '0px 15px'
    };
    const avaCont = {
      'paddingLeft': '0px'
    };

    const timeAgo = {
      color:'#B2B2B2'
    };

    const keyWords = {
      'color':'#3888D3'
    };

    const label = {
      'backgroundColor':'#3888D3'
    };

    const cancelBtn = {
      'color':'black'
    };

    const icon = {
      'color':'#707070'
    };

    if(!this.props.notifications || (this.props.notifications && this.props.notifications.length === 0) ){
      return (
        <NavItem dropdown className='collapse-left' disabled>
            <DropdownButton nav>
              <Icon style={icon} bundle='fontello' glyph='bell-1'/>
              <Badge className='fg-darkbrown bg-orange notification-badge'>0</Badge>
            </DropdownButton>
        </NavItem>
      );
    }

    return (
      <NavItem dropdown className='collapse-left'>
    <DropdownButton nav>
      <Icon style={icon} outlined bundle='fontello' glyph='bell-1' bsStyle="success" />
      <Badge style={{ 'color': '#2AA38B', 'border': '1px solid black'}} className='fg-darkbrown bg-white notification-badge'>{this.props.notifications.length}</Badge>
    </DropdownButton>
    <Menu style={listNotifs} bsStyle='white'>
      {this.props.notifications.map((notif, index) =>
      <MenuItem href='#'>
      <Grid>
        <Row style={rowStyle}>
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
          <div style={timeAgo}>
            <span> {moment(notif.created_at).startOf('hour').fromNow('lll')} ago</span>
          </div>
          <hr/>
          </Col>
          <Col xs={2} style={avaCont} className='avatar-container' collapseRight>
          <div className='text-center'>
            <Icon onClick={(e)=> this.props.removeNotif(e, notif.notifyID, index)} style={cancelBtn} bundle='fontello' glyph='cancel-circle'/>
          </div>
          </Col>
        </Row>
      </Grid>
      </MenuItem>
      )}
    </Menu>
  </NavItem>
    );
  }
}
