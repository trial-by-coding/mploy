import classNames from 'classnames';

export default class dashboardAlert extends React.Component {
	render() {
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={12} smCollapseRight>
              <PanelContainer>
                <Panel>
                  <PanelBody style={{padding: 0}}>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h4><Icon glyph='icon-fontello-attention-alt-1' style={{textAlign: 'center'}}> {this.props.message} </Icon></h4>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelBody>
                </Panel>
              </PanelContainer>
              </Col>
            </Row>
        </Grid>
      </Container>		
    )
  }
}
