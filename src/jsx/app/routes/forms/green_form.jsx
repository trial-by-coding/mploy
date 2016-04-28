import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';
import { Link } from 'react-router';
import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

class Body extends React.Component {
  onChange() {
    console.log('onChange');
  }
  render() {
    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={6} collapseRight>

              <PanelContainer noOverflow controlStyles='bg-green fg-white'>
                <Panel>
                  <PanelHeader className='bg-green fg-white'>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>Default form</h3>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelHeader>
                  <PanelBody>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <Form>
                            <FormGroup>
                              <Label htmlFor='emailaddress'>Email address</Label>
                              <InputGroup>
                                <InputGroupAddon>
                                  <Icon glyph='icon-fontello-mail' />
                                </InputGroupAddon>
                                <Input autoFocus type='email' id='emailaddress' placeholder='Email address' />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='password'>Password</Label>
                              <InputGroup>
                                <Input type='password' id='password' placeholder='Password' />
                                <InputGroupAddon>
                                  <Icon glyph='icon-fontello-key' />
                                </InputGroupAddon>
                              </InputGroup>
                            </FormGroup>
                            <FormGroup feedback>
                              <Label htmlFor='withicon' control>With icon</Label>
                              <Input type='text' id='withicon' placeholder='Search' />
                              <Icon bundle='fontello' glyph='search' feedback/>
                            </FormGroup>
                            <FormGroup feedback>
                              <Label htmlFor='inputwithicon' control>Input with icon</Label>
                              <InputGroup>
                                <InputGroupAddon>
                                  <Icon glyph='icon-fontello-alert' />
                                </InputGroupAddon>
                                <Input type='text' id='inputwithicon' placeholder='Search' />
                                <Icon bundle='fontello' glyph='search' feedback/>
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='disabled'>Disabled</Label>
                              <Input disabled type='text' id='disabled' placeholder='Disabled' />
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='readonly'>Read only</Label>
                              <Input readOnly type='text' id='readonly' placeholder='Read only' />
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='dropdownselect'>Dropdown Select</Label>
                              <Select id='dropdownselect' defaultValue='1'>
                                <option value='1'>Option 1</option>
                                <option value='2'>Option 2</option>
                                <option value='3'>Option 3</option>
                                <option value='4'>Option 4</option>
                                <option value='5'>Option 5</option>
                              </Select>
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='multiselect'>Multiple Select</Label>
                              <Select id='multiselect' multiple>
                                <option value='1'>Option 1</option>
                                <option value='2'>Option 2</option>
                                <option value='3'>Option 3</option>
                                <option value='4'>Option 4</option>
                                <option value='5'>Option 5</option>
                              </Select>
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='textarea'>Textarea</Label>
                              <Textarea id='textarea' rows='3' placeholder='Some text here...' />
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='fileinput'>File input</Label>
                              <Input id='fileinput' type='file' />
                              <HelpBlock>some help text here.</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                              <Label>Checkboxes</Label>
                              <Checkbox value='option1' name='checkbox-options'>
                                Option one is great
                              </Checkbox>
                              <Checkbox value='option2' defaultChecked name='checkbox-options'>
                                Option two is checked
                              </Checkbox>
                              <Checkbox value='option3' disabled name='checkbox-options'>
                                Option three is disabled
                              </Checkbox>
                              <hr/>
                            </FormGroup>
                            <FormGroup>
                              <Label>Inline checkboxes</Label>
                              <div>
                                <Checkbox inline value='option1' name='inline-checkbox-options' onChange={this.onChange}>
                                  Option one
                                </Checkbox>
                                <Checkbox inline value='option2' defaultChecked name='inline-checkbox-options'>
                                  Option two
                                </Checkbox>
                                <Checkbox inline value='option3' disabled name='inline-checkbox-options'>
                                  Option disabled
                                </Checkbox>
                              </div>
                              <hr/>
                            </FormGroup>
                            <FormGroup>
                              <Label>Radios</Label>
                              <Radio value='option1' defaultChecked name='radio-options'>
                                Option 1
                              </Radio>
                              <Radio value='option2' name='radio-options'>
                                Option 2
                              </Radio>
                              <Radio value='option3' disabled name='radio-options'>
                                Option disabled
                              </Radio>
                              <hr/>
                            </FormGroup>
                            <FormGroup>
                              <Label>Inline radios</Label>
                              <div>
                                <Radio inline value='option1' name='inline-radio-options'>
                                  Option one
                                </Radio>
                                <Radio inline value='option2' defaultChecked name='inline-radio-options'>
                                  Option two
                                </Radio>
                                <Radio inline value='option3' disabled name='inline-radio-options'>
                                  Option disabled
                                </Radio>
                              </div>
                            </FormGroup>
                          </Form>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelBody>
                  <PanelFooter className='bg-darkgreen45 text-right'>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <br/>
                          <div>
                            <Button outlined bsStyle='lightgreen'>cancel</Button>{' '}
                            <Button outlined bsStyle='lightgreen'>submit</Button>
                          </div>
                          <br/>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelFooter>
                </Panel>
              </PanelContainer>

            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

@SidebarMixin
export default class extends React.Component {
  render() {
    var classes = classNames({
      'container-open': this.props.open
    });

    return (
      <Container id='container' className={classes}>

      <Body />
        <Sidebar />
        <Header />
        <Body />
        <Footer />
      </Container>
    );
  }
}
