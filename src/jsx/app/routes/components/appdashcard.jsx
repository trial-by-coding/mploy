import classNames from 'classnames';
import { JobBody, JobHeader} from './jobCard'

class JobModal extends React.Component {
   render() {

    console.log('jobModal', this.props);
    const styles = {
      'margin': '12.5px 0',
      'borderBottom': '1px dotted #999',
      'paddingBottom': 12.5,
      'textAlign': 'center'
    };

    const panelStyle = {
      'maxWidth': '400px',
      'paddingTop': '0px'
    };

    const colStyle = {
      'zIndex': -100
    };


    return(
  <Grid>
    <Row>
      <Col sm={12} md={12} lg={12}  className="clearfix">
      <PanelContainer >
        <Panel>
          <PanelBody >
            <Grid>
              <Row style={styles}>
              <div className="jobcard">
                <JobHeader data={this.props.data} />
                <JobBody data={this.props.data} />
              </div>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    </Col>
  </Row>
</Grid>
    );
  }
}




export default class appdashCard extends React.Component {
  getLargeModal() {
    return (
      <Modal md={6} >
        <ModalBody>
          <JobModal data={this.props.item} />
        </ModalBody>
        <ModalFooter>
          <Button outlined bsStyle='danger' onClick={ModalManager.remove} onTouchEnd={ModalManager.remove}>Close</Button>
          <Button outlined bsStyle='primary'>Save changes</Button>
        </ModalFooter>
      </Modal>
    );
  }

  render() {
    let jobtitle = this.props.item.job_title;
    let company = this.props.item.company_name;
    let profilePic = this.props.item.profile_picture;
    let appID = this.props.item.appID;
    let index = this.props.index;
    let status = this.props.item.status;
    console.log('appdashcarddata', this.props)
    
    const card = {
      'border': '1px solid black',
      'border-radius': '5px'
    }

    const panelStyle = {
    'padding': '0px 10px',
    };

    const panelStyle1 = {
    'padding': '0px',
    'border': '1px solid #A1A1A1',
    'height' : '80px',
    'border-radius':'10px',
    'maxWidth': '300px',
    'margin':'auto',
    'margin-bottom': '15px'

    };     

    const panelStyle3 = {
    'padding': '0px',

    };   

    const panelBody = {
    'padding-top': '5px',
    };    

    const companyName = {
    'margin': '10px 0px'
    };  

    const position = {
    'margin': '8px 0px'
    };



    return (
      

      <div>
        <Col style={panelStyle} sm={12} xs={6} md={12}>
          <PanelContainer  style={panelStyle1} >
              <Panel style={panelStyle}>
                <PanelBody style={panelBody} >
                  <Grid>
                    <Row onClick={ModalManager.create.bind(this, this.getLargeModal())}>
                      <Col xs={8} style={panelStyle3} className="jobcard">
                        <h5 style={position}> {jobtitle} </h5>
                        <h6 style={companyName} > {company} </h6>
                      </Col>
                      <Col style={panelStyle3} xs={4} collapseRight>
                        <img src={profilePic} width='45' height='45'
                          style={{display: 'block', borderRadius: 45, border: '2px solid #fff', margin: 'auto', float: 'left'}} />
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


                    // <Row>
                    //   <div onClick={() => this.props.rescind(appID, index, status)}> Rescind </div>
                    // </Row>