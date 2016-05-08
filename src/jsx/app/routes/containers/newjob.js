import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import actions from 'redux/actions';
import { Link } from 'react-router';
import { PropTypes } from 'react';

export const fields = ['jobTitle', 'companyName', 'locationChange', 'jobDesc', 'skillChange', 'eduChange'];

// import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';
// import ReactStyle from 'global/jsx/react-styles/src/ReactStyle';
const validate = values => {
  const errors = {};
  if(!values.jobTitle) {
    errors.jobTitle = 'Enter a job title';
  }
  if(!values.companyName) {
    errors.companyName = 'Enter a company name';
  }
  if(!values.locationChange) {
    errors.locationChange = 'Enter a location';
  }
  if(!values.jobDesc) {
    errors.jobDesc = 'Enter a job description';
  }
  if(!values.skillChange) {
    errors.skillChange = 'Enter the required skills';
  }
  if(!values.eduChange) {
    errors.eduChange = 'Enter desired education';
  }
  return errors;
};


@reduxForm({
  form: 'NewJobForm',
  fields,
  validate
})

export default class NewJob extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };


  constructor(props){
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.jobTitle = this.jobTitle.bind(this);
    this.companyName = this.companyName.bind(this);
    this.locationChange = this.locationChange.bind(this);
    this.jobDesc = this.jobDesc.bind(this);
    this.eduChange = this.eduChange.bind(this);
    this.visaChange = this.visaChange.bind(this);
    this.minSalary = this.minSalary.bind(this);
    this.maxSalary = this.maxSalary.bind(this);
    this.skillChange = this.skillChange.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.empType = this.empType.bind(this);

    this.state = {
      formVal: {
        skillName:'',
        company_name: null,
        job_title: null,
        location: null,
        job_description: null,
        desired_education: null,
        min_salary: null,
        max_salary: null,
        location: null,
        employment_type: null,
        visa_required: null,
        skills: ['test']
      }
    };
  }

  jobTitle(e){
    this.setState({ formVal: { ...this.state.formVal, job_title: e.target.value }},function(){
    });
  }

  companyName(e){
    this.setState({ formVal: { ...this.state.formVal, company_name: e.target.value }},function(){
    });
  }

  locationChange(e){
    this.setState({ formVal: { ...this.state.formVal, location: e.target.value }},function(){
    });
  }

  jobDesc(e){
    this.setState({ formVal: { ...this.state.formVal, job_description: e.target.value }},function(){
    });
  }

  eduChange(e){
    this.setState({ formVal: { ...this.state.formVal, desired_education: e.target.value }},function(){
    });
  }

  visaChange(e){
    let visaBool = e.target.value;
    visaBool === '1' ? (visaBool = true) : (visaBool = false);
    this.setState({ formVal: { ...this.state.formVal, visa_required:visaBool }},function(){
    });
  }

  minSalary(e){
    this.setState({ formVal: { ...this.state.formVal, min_salary: e.target.value }},function(){
    });
  }

  maxSalary(e){
    this.setState({ formVal: { ...this.state.formVal, max_salary: e.target.value }},function(){
    });
  }

  skillChange(e){
    let skill = e.target.value;
    // skills.push(e.target.value),
    this.setState({ formVal: { ...this.state.formVal, skillName: skill }},function(){
    });
  }

  addSkill(){
    let skill = this.state.formVal.skillName;
    let skills = this.state.formVal.skills.slice();
    skills.push(skill);
    this.setState({ formVal: { ...this.state.formVal, skills: skills, skillName:'' }},function(){
    });
  }

  empType(e){
    let type = e.target.value;
    this.setState({ formVal: { ...this.state.formVal, employment_type:type }},function(){
    });
  }

  onFormSubmit(e){
    e.preventDefault();
    this.props.dispatch(actions.postNewJob(this.state.formVal));
  }

  render() {
   const align = {
    'margin': 'auto',
    'maxWidth':'700px'
    };

    const tagMargin = {
    'margin-left': '0px',
    'font-size': '16px'
    };


    const { fields: { jobTitle, companyName, locationChange, jobDesc, skillChange, eduChange }, resetForm, handleSubmit, submitting } = this.props;

    return (
      <Container id="body">
        <Grid>
          <Row style={align}>
            <Col sm={12}  collapseRight>
              <PanelContainer noOverflow controlStyles='bg-green fg-white'>
                <Panel>
                <Form onSubmit={handleSubmit(this.onFormSubmit)}>
                  <PanelHeader className='bg-green fg-white'>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                          <h3>New Job Posting</h3>
                        </Col>
                      </Row>
                    </Grid>
                  </PanelHeader>
                  <PanelBody>
                    <Grid>
                      <Row>
                        <Col xs={12}>
                            <FormGroup>
                              <div className={`form-group ${jobTitle.touched && jobTitle.invalid ? 'has-danger' : ''}`}>
                              <Label htmlFor='password' control>Job Title</Label>
                              <Input className='form-control' {...jobTitle} onChange={this.jobTitle} autoFocus type='text'  placeholder='Awesome Title here' />
                              <div className='text-help'>{jobTitle.touched ? jobTitle.error : ''}
                              </div>
                            </div>
                            </FormGroup>
                            <FormGroup>
                                <div className={`form-group ${companyName.touched && companyName.invalid ? 'has-danger' : ''}`}>
                              <Label htmlFor='password' control>Company Name</Label>
                                <Input className='form-control' {...companyName}
                                onChange={this.companyName}
                                autoFocus type='text'  placeholder='Mploy' />
                              <div className='text-help'>{companyName.touched ? companyName.error : ''}
                                </div>
                            </div>
                            </FormGroup>
                            <FormGroup>
                                  <div className={`form-group ${locationChange.touched && locationChange.invalid ? 'has-danger' : ''}`}>
                              <Label htmlFor='password' control>Location</Label>
                                <Input className='form-control' {...locationChange}
                                onChange={this.locationChange}
                                autoFocus type='text'  placeholder='City, State, Country' />
                              <div className='text-help'>{locationChange.touched ? locationChange.error : ''}
                            </div>
                            </div>
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='dropdownselect'>Employment type</Label>
                              <Select onChange={this.empType} id='dropdownselect' defaultValue='2'>
                                <option value='Part time'>Part time</option>
                                <option value='Full time'>Full Time</option>
                                <option value='Temporary'>Temporary</option>
                                <option value='Seasonal'>Seasonal</option>
                              </Select>
                            </FormGroup>
                            <FormGroup>
                                  <div className={`form-group ${jobDesc.touched && jobDesc.invalid ? 'has-danger' : ''}`}>
                              <Label htmlFor='textarea'>Job description:</Label>
                              <Textarea id='textarea' rows='5' className='form-control' {...jobDesc}
                                        placeholder='Position details'
                                        onChange={this.jobDesc} />
                                      <div className='text-help'>{jobDesc.touched ? jobDesc.error : ''}
                                    </div>
                                    </div>
                            </FormGroup>
                            <FormGroup>
                                  <div className={`form-group ${skillChange.touched && skillChange.invalid ? 'has-danger' : ''}`}>
                              <Label htmlFor='textarea'>What skills are needed for this position?</Label>
                                <InputGroup>
                                  <Input type='text' className='form-control' {...skillChange} id='searchbtnicon' placeholder='Enter skills here ...'
                                                                        onChange={this.skillChange}
                                                                        value={this.state.formVal.skillName} />
                                  <InputGroupAddon className='plain'>
                                    <Button onClick={this.addSkill}>
                                      <span> add </span>
                                      <Icon bundle='fontello' glyph='plus' />
                                    </Button>
                                  </InputGroupAddon>
                                </InputGroup>

                              <Row style={tagMargin} >
                                {this.state.formVal.skills.map(function(item){
                                     return <span>
                                              <BLabel>{item}</BLabel>{' '}
                                            </span>;
                                })}
                              </Row>
                              <div className='text-help'>{skillChange.touched ? skillChange.error : ''}
                                    </div>
                            </div>
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='password' control>Salary Min</Label>
                                <InputGroup>
                                  <HelpBlock>Please use numbers only.</HelpBlock>
                                  <Input
                                  onChange={this.minSalary}
                                  autoFocus type='text'  placeholder='70k' />
                                <Label htmlFor='password' control>Salary Max</Label>
                                  <Input
                                  onChange={this.maxSalary}
                                  autoFocus type='text'  placeholder='120k' />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                  <div className={`form-group ${eduChange.touched && eduChange.invalid ? 'has-danger' : ''}`}>
                              <Label htmlFor='password' control>Desired Education</Label>
                                <Input className='form-control' {...eduChange}
                                onChange={this.eduChange}
                                autoFocus type='text'  placeholder='Education level' />
                              <div className='text-help'>{eduChange.touched ? eduChange.error : ''}
                              </div>
                              </div>
                            </FormGroup>
                            <FormGroup>
                              <Label htmlFor='dropdownselect'>Will your company sponsor visa's?</Label>
                              <Select onChange={this.visaChange} id='dropdownselect' defaultValue='2'>
                                <option value='1'>Yes</option>
                                <option value='2'>No</option>
                              </Select>
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
                          <Button type="button" disabled={submitting} onClick={resetForm} outlined bsStyle='lightgreen'>
                            Clear Values
                          </Button>
                            <Button outlined bsStyle='lightgreen' href='/employer'>cancel</Button>{' '}
                            <Button type="submit" outlined bsStyle='lightgreen' onClick={handleSubmit} disabled={submitting}>{submitting ? <i/> : <i/>} Submit
                            </Button>
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
