import classNames from 'classnames';

import actions from 'redux/actions';
import { VisibilityFilters } from 'redux/actions/actionTypes';



export default class Notifications extends React.Component { 
  constructor(props){
    super(props) 

  }



  render(){

 
    console.log('lowest level notifs:', this.props.notifications) 

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
          <Badge className='fg-darkbrown bg-orange notification-badge'>3</Badge>
        </DropdownButton>
        <Menu  bsStyle='green'>
        {this.props.notifications.map(notif => 
          <MenuItem href='#'>
            <Grid>
              <Row>
                <Col xs={2} className='avatar-container' collapseRight>
                  <div><img src='/imgs/avatars/avatar22.png' width='40' height='40' alt='sarah_patchett' /></div>
                  <div className='text-center'>
                    <BLabel bsStyle='info'>NEW</BLabel>
                  </div>
                </Col>
                <Col xs={10} className='notification-container' collapseLeft collapseRight>
                  <div className='time'>
                    <strong className='fg-darkgray50'><Icon bundle='fontello' glyph='chat-5'/><em></em></strong>
                  </div>
                  <div className='message-header'>
                    <strong className='fg-darkgreen45'>{notif.company_name}</strong>
                  </div>
                  <div className='message-details fg-text'>
                    <span>{"Hey Anna! Sorry for delayed response. I've just finished reading the mail you sent couple of days ago..."}</span>
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
