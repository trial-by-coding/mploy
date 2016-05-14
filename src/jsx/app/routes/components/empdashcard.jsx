import classNames from 'classnames';
import actions from 'redux/actions';
import AppCard from './appCard';

export default class empdashCard extends React.Component {

  getLargeModal() {

    let dispatch = this.props.dispatch;
    let advance = this.props.advance;
    let revert = this.props.revert;
    let status = this.props.lane;
    let index = this.props.index;
    let item = this.props.item;
    let reject = this.props.reject;
    let accept = this.props.accept;

    return (
      <Modal lg>
        <ModalBody>
          <AppCard app={this.props.item}/>
        </ModalBody>
        <ModalFooter>
          <Button outlined bsStyle='danger' onClick={() => reject(item.job_id, item.appID, item, status, index)} onTouchEnd={ModalManager.remove}>Reject</Button>
          <Button outlined bsStyle='primary' onClick={() => accept(item.appID, status, item, index)}>Accept</Button>
        </ModalFooter>
      </Modal>
    );
  }

  render() {

    let profilePic = this.props.item.profile_picture;
    let dispatch = this.props.dispatch;
    let advance = this.props.advance;
    let revert = this.props.revert;
    let status = this.props.lane;
    let index = this.props.index;
    let item = this.props.item;

    console.log('empdashcarddata', this.props)


    const card = {
      'border': '1px solid black',
      'border-radius': '5px'
    }

    const panelStyle = {
      'padding': '0px 10px',
    };

    const panelStyle1 = {
      'padding': '0px',
      // 'border': '1px solid rgba(0, 0, 0, 0.30)',
      'border-bottom':'1px solid rgba(0,0,0,.30)',
      'min-height' : '80px',
      // 'border-radius':'10px',
      'maxWidth': '300px',
      'margin':'auto',
      'margin-bottom': '15px',

    };     

    const panelStyle3 = {
      'padding': '0px',

    };    

    const profileImg = {
      'padding': '0px',
      'marginTop':'10px'

    };   

    const panelBody = {
      'padding-top': '5px',
    };    

    const companyName = {
      'margin': '10px 0px'
    };  

    const position = {
      'margin': '8px 0px',
      'color':'black'
    };


    return (

      <div>
        <Col style={panelStyle} sm={12} xs={12} md={12}>
          <PanelContainer  style={panelStyle1} >
              <Panel style={panelStyle}>
                <PanelBody style={panelBody} >
                  <Grid>
                    <Row >
                      <Col style={profileImg} xs={4} collapseRight>
                        <img src={profilePic} width='45' height='45'
                          style={{display: 'block', borderRadius: 45,  margin: 'auto', float: 'left', 'border':'2px solid #2AA38B', 'padding':'3px'}} />
                      </Col>
                      <Col xs={8} style={panelStyle3} className="jobcard">
                        <div >
                          <h4 onClick={ModalManager.create.bind(this, this.getLargeModal())} style={position}> {this.props.item.firstname + ' ' + this.props.item.lastname} </h4>
                        </div>
                        <div>
                          <Col  style={{padding:'0px'}} xs={10} sm={10} xs={10}>
                            <Icon onClick={() => revert(item.appID, status, item, index)}
                                                              style={{'font-size':'16px', 'cursor':'pointer'}}
                                                              bundle='fontello' 
                                                              glyph='angle-left' />
                          </Col>
                          <Col style={{'padding':'0px'}} xs={2} md={2} sm={2} >
                            <Icon onClick={() => advance(item.appID, status, item, index)}
                                  style={{'float':'right','font-size':'16px', 'cursor':'pointer'}}
                                  bundle='fontello' 
                                  glyph='angle-right' />
                          </Col>
                        </div>
                      </Col>                      
                    </Row>
                  </Grid>
                </PanelBody>
              </Panel>
            </PanelContainer>
        </Col>
      </div>
    );
  }
}
