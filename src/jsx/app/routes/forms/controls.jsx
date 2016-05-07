import classNames from 'classnames';
import actions from 'redux/actions';
import request from 'superagent';
import { Link } from 'react-router';


export default class Body extends React.Component {
  constructor(props){
    super(props);

    //binding helper functions
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.eduChange = this.eduChange.bind(this);
    this.skillChange = this.skillChange.bind(this);
    this.visaChange = this.visaChange.bind(this);
    this.aboutChange = this.aboutChange.bind(this);
    this.expChange = this.expChange.bind(this);
    this.setCoverletter = this.setCoverletter.bind(this);
    this.setResume= this.setResume.bind(this);

    initial state
    this.state = {
      complete: (!this.props.complete) || false,
      formVal: {
        cover_letter:null,
        resume:null,
        years_experience:'less than 1 year',
        education:'',
        personal_statement:'',
        job_id:this.props.data.jobID,
        skills_met: this.props.skillsArray,
        user_id:null,
        can_work_here:false
      }
    };
  }

  //helper functions start
  onFormSubmit(e){
    e.preventDefault();

    this.props.dispatch(actions.applyToJob(this.state.formVal));

    console.log('app form is:', this.state.formVal);

  }

  eduChange(e){

  this.setState({ formVal: { ...this.state.formVal, education: e.target.value }},function(){
    console.log("after state_extend:", this.state);
  });
  // var newState = React.addons.update(this.state, {
  //   formVal: {
  //     education: e.target.value
  //   }
  // });
  // this.setState(newState,function(){
  //   console.log("after state_extend:", this.state)
  // });

  }

  visaChange(e){
    let visaBool = e.target.value;
    visaBool === '1' ? (visaBool = true) : (visaBool = false);

    this.setState({ formVal: { ...this.state.formVal, can_work_here:visaBool }},function(){
    console.log("after state_extend:", this.state);
    });
  }

  skillChange(e,idx){
    e.persist();
    console.log("e in skillChange:", e.target.checked);
    console.log("item in skillChange:", idx);


    let skills = this.state.formVal.skills_met.slice();
    console.log('skills before idx is:', skills);
    console.log('state before idx is:', this.state);

    skills[idx] = e.target.checked;
    console.log('skills after idx is:', skills);

    this.setState({ formVal: { ...this.state.formVal, skills_met: skills }},function(){
    console.log("after state_extend:", this.state);
    });

  }

  aboutChange(e){

    this.setState({ formVal: { ...this.state.formVal, personal_statement: e.target.value }},function(){
    console.log("after state_extend:", this.state);
    });

  }

  expChange(e){
    this.setState({ formVal: { ...this.state.formVal, years_experience: e.target.value }},function(){
    console.log("after state_extend:", this.state);
    });
  }

  setCoverletter(e){
    console.log("coverletter file upload is:",e.target.files);

    var coverLetter = new FormData();
    coverLetter.append("coverletter", e.target.files[0], e.target.files[0].name);
    var that = this;
    request.post('/user/applicant/uploadcoverletter')
    .send(coverLetter)
    .end(function(err, response) {
      console.log(response);
      that.setState({ formVal: { ...that.state.formVal, cover_letter: response.text}},function(){
        console.log("after state_extend:", that.state);
      });
  });
  }

  setResume(e){
    console.log("resume file upload is:",e.target.files);

    var resume = new FormData();
    resume.append("resume", e.target.files[0], e.target.files[0].name);
    var that = this;
    request.post('/user/applicant/uploadresume')
    .send(resume)
    .end(function(err, response) {
      console.log(response);
      that.setState({ formVal: { ...that.state.formVal, resume: response.text}},function(){
        console.log("after state_extend:", that.state);
      });
  });
  }
  //end helper funcs


  render() {
    console.log("wtf is props jCard:", this.props);
    console.log("wtf is dispatch:", this.props.dispatch);


    //helper func for keys in skills obj
    // let appFormList = this.props.data;
    // let skillsVals = [];

    // for (var key in appFormList) {
    //   if (key.indexOf('skill') !== -1 && appFormList[key] !== null) {
    //     skillsVals.push(appFormList[key])
    //   }
    // }

    return (
      <Container id='body'>
        <Grid>
          <Row>
            <Col sm={12} collapseRight>
              <PanelContainer noOverflow controlStyles='bg-green fg-white'>
                <Panel>
                <Form onSubmit={this.onFormSubmit}>
                  <PanelHeader className='bg-green fg-white'>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>Submit Application for {this.props.data.job_title} at {this.props.data.company_name}</h3>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelHeader>
                  <PanelBody>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                            <FormGroup>
                              <Label htmlFor='dropdownselect'>Years Experience</Label>
                              <Select id='dropdownselect' defaultValue='1' onChange={this.expChange}>
                                <option value='less than 1 year'>less than 1 year</option>
                                <option value='1-2 years'>1-2 years</option>
                                <option value='2-3 years'>2-3 years</option>
                                <option value='3+ years'>3+ years</option>
                              </Select>
                            </FormGroup>

                            <FormGroup>
                              <Label>Skills</Label>
                              {this.props.data.skills.map((item,idx) => <Checkbox onChange={(e) => this.skillChange(e,idx)}
                                                               value={item}
                                                               name='checkbox-options'>{item}</Checkbox>)}
                              <hr/>
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor='password' control>Education</Label>
                                <Input
                                onChange={this.eduChange}
                                autoFocus type='text'  placeholder='Degree(s)' />
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor='dropdownselect'>Would you require visa sponsorship?</Label>
                              <Select onChange={this.visaChange} id='dropdownselect' defaultValue='2'>
                                <option value='1'>Yes</option>
                                <option value='2'>No</option>
                              </Select>
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor='textarea'>Why are you the top candidate?</Label>
                              <Textarea id='textarea' rows='3'
                                        placeholder='Sell yourself!'
                                        onChange={this.aboutChange} />
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor='fileinput'>Upload Cover Letter </Label>
                              <Input onChange={this.setCoverletter} id='fileinput' type='file' name='coverletter' accept='application/msword,text/plain, application/pdf'/>
                              <HelpBlock>PDF,docx,doc files only.</HelpBlock>
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor='fileinput'>Upload Resume</Label>
                              <Input onChange={this.setResume} id='fileinput' type='file' name='resume' accept='application/msword,text/plain, application/pdf'/>
                              <HelpBlock>PDF,docx,doc files only.</HelpBlock>
                            </FormGroup>
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
                            <Button type="submit" outlined bsStyle='lightgreen'>submit</Button>
                          </div>
                          <br/>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelFooter>
                  </Form>
                </Panel>
              </PanelContainer>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

/*<FormGroup>
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
    </FormGroup>*/
