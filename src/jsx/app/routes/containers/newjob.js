import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import actions from 'redux/actions';
import { Link } from 'react-router';
import { PropTypes } from 'react';

export const fields = ['jobTitle', 'companyName', 'locationChange', 'jobDesc', 'skillChange', 'addSkill','eduChange', 'visaChange', 'minSalary', 'maxSalary', 'empType'];

const validate = values => {
  const errors = {};
  if(!values.jobTitle) {
    errors.jobTitle = 'Enter a job title';
  } else if (values.jobTitle.length < 2) {
    errors.jobTitle = 'Must be longer than on letter!';
  }
    if(!values.companyName) {
    errors.companyName = 'Enter a company name';
  } else if (values.companyName.length < 2) {
    errors.companyName = 'Must be longer than on letter!';
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
  if(!values.addSkill) {
    errors.addSkill = 'Enter desired skills';
  }
  if(!values.empType) {
    errors.empType = 'Enter employment_type';
  }
  if(!values.minSalary) {
    errors.minSalary = 'Enter minimum salary';
  }
  if(!values.maxSalary) {
    errors.maxSalary = 'Enter maximum salary';
  }
  if(!values.eduChange) {
    errors.eduChange = 'Enter desired education';
  }
  if(!values.visaChange) {
    errors.visaChange = 'Enter visa requirement';
  }
  return errors;
};


@reduxForm({
  form: 'NewJobForm',
  fields,
  validate
})
@connect(state => state)
export default class NewJob extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props){
    super(props);

    //binding helper functions
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

    // initial state
    this.state = {
      formVal: {
        skillName: '',
        company_name: null,
        job_title: null,
        location: null,
        job_description: null,
        desired_education: null,
        min_salary: null,
        max_salary: null,
        employment_type: null,
        visa_required: null,
        skills: ['test']
      }
    };
  }

//helper functions start

jobTitle(e) {
  this.setState({
      formVal: {...this.state.formVal,
        job_title: e.target.value
      }
    }, function () {});
}

companyName(e) {
  this.setState({
      formVal: {...this.state.formVal,
        company_name: e.target.value
      }
    }, function () {});
}

locationChange(e) {
  this.setState({
    formVal: {...this.state.formVal,
      location: e.target.value
    }
  }, function () {});
}

jobDesc(e) {
  this.setState({
    formVal: {...this.state.formVal,
      job_description: e.target.value
    }
  }, function () {});
}

eduChange(e) {
  this.setState({
    formVal: {...this.state.formVal,
      desired_education: e.target.value
    }
  }, function () {});
}

visaChange(e) {
  let visaBool = e.target.value;
  visaBool === '1' ? (visaBool = true) : (visaBool = false);
  this.setState({
    formVal: {...this.state.formVal,
      visa_required: visaBool
    }
  }, function () {});
}

minSalary(e) {
  this.setState({
    formVal: {...this.state.formVal,
      min_salary: e.target.value
    }
  }, function () {});
}

maxSalary(e) {
  this.setState({
    formVal: {...this.state.formVal,
      max_salary: e.target.value
    }
  }, function () {});
}

skillChange(e) {
  let skill = e.target.value;
  // skills.push(e.target.value),
  this.setState({
    formVal: {...this.state.formVal,
      skillName: skill
    }
  }, function () {});
}

addSkill() {
  let skill = this.state.formVal.skillName;
  let skills = this.state.formVal.skills.slice();
  skills.push(skill);
  this.setState({
    formVal: {...this.state.formVal,
      skills,
      skillName: ''
    }
  }, function () {});
}

empType(e) {
  let type = e.target.value;
  this.setState({
    formVal: {...this.state.formVal,
      employment_type: type
    }
  }, function () {});
}

onFormSubmit(e) {
  e.preventDefault();
  this.props.dispatch(actions.postNewJob(this.state.formVal))
  .then(() => {
    console.log("R o u t e r!");
    this.context.router.push('/employer/jobs');
  });
}


//end helper funcs


  render() {
   const align = {
    'margin': 'auto',
    'maxWidth':'700px'
    };

    const tagMargin = {
    'marginLeft': '0px',
    'fontSize': '16px'
    };

    const float = {
      'float': 'left'
    };

    const error = {
      'color': '#A94442'
    };


    const { fields: { jobTitle, companyName, locationChange, jobDesc, skillChange, addSkill, eduChange, visaChange, minSalary, maxSalary, empType }, resetForm, handleSubmit, submitting } = this.props;

    return (
      <Container id="body">
      <Grid>
        <Row style={align}>
          <Col sm={12} collapseRight>
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
                      <div className={`form-group ${jobTitle.touched && jobTitle.invalid ? 'has-danger' : ''}`}>
                        <FormGroup>
                          <Label htmlFor='password' control>Job Title</Label>
                          <Input className='form-control' {...jobTitle} autoFocus type='text' placeholder='' />
                          <div className='text-help' style={error}>{jobTitle.touched ? jobTitle.error : ''}
                          </div>
                        </FormGroup>
                      </div>
                      <div className={`form-group ${companyName.touched && companyName.invalid ? 'has-danger' : ''}`}>
                        <FormGroup>
                          <Label htmlFor='password' control>Company Name</Label>
                          <Input className='form-control' {...companyName} autoFocus type='text' placeholder='' />
                          <div className='text-help' style={error}>{companyName.touched ? companyName.error : ''}
                          </div>
                        </FormGroup>
                      </div>
                      <div className={`form-group ${locationChange.touched && locationChange.invalid ? 'has-danger' : ''}`}>
                        <FormGroup>
                          <Label htmlFor='password' control>Location</Label>
                          <Input className='form-control' {...locationChange} autoFocus type='text' placeholder='City, State, Country' />
                          <div className='text-help' style={error}>{locationChange.touched ? locationChange.error : ''}
                          </div>
                        </FormGroup>
                      </div>
                      <div className={`form-group ${empType.touched && empType.invalid ? 'has-danger' : ''}`}>
                        <FormGroup>
                          <Label htmlFor='dropdownselect'>Employment type</Label>
                          <Select className='form-control' {...empType} id='dropdownselect' defaultValue='2'>
                                              <option value='Part time'>Part time</option>
                                              <option value='Full time'>Full Time</option>
                                              <option value='Temporary'>Temporary</option>
                                              <option value='Seasonal'>Seasonal</option>
                                            </Select>
                          <div className='text-help' style={error}>{empType.touched ? empType.error : ''}
                          </div>
                        </FormGroup>
                      </div>
                      <div className={`form-group ${jobDesc.touched && jobDesc.invalid ? 'has-danger' : ''}`}>
                        <FormGroup>
                          <Label htmlFor='textarea'>Job description:</Label>
                          <Textarea id='textarea' rows='5' className='form-control' {...jobDesc} placeholder='Position details' />
                          <div className='text-help' style={error}>{jobDesc.touched ? jobDesc.error : ''}
                          </div>
                        </FormGroup>
                      </div>

                      <div className={`form-group ${skillChange.touched && skillChange.invalid ? 'has-danger' : ''}`}>
                        <FormGroup>
                          <Label htmlFor='textarea'>What skills are needed for this position?</Label>
                          <InputGroup>
                            <Input type='text' className='form-control' {...skillChange} id='searchbtnicon' placeholder='Enter skills here ...'
                              onChange={this.skillChange} value={this.state.formVal.skillName} />
                            <InputGroupAddon className='plain'>
                              <Button onClick={this.addSkill}>
                                  <span> add </span>
                                  <Icon bundle='fontello' glyph='plus' />
                                </Button>
                            </InputGroupAddon>
                          </InputGroup>

                          <Row style={tagMargin}>
                            {this.state.formVal.skills.map(function(item){ return <span>
                                          <BLabel>{item}</BLabel>{' '}
                                        </span>; })}
                          </Row>
                          <div className='text-help'>{skillChange.touched ? skillChange.error : ''}
                          </div>
                        </FormGroup>
                      </div>


                      <FormGroup>
                        <div className={`form-group ${minSalary.touched && minSalary.invalid ? 'has-danger' : ''}`}>
                          <InputGroup>
                            <Label htmlFor='password' control>Salary</Label>
                            <HelpBlock>Please use numbers only.</HelpBlock>
                          <Input className='form-control' {...minSalary} autoFocus type='text' placeholder='minimum salary' />
                            <div className='text-help' style={error}>{minSalary.touched ? minSalary.error : ''}
                            </div>
                          </InputGroup>
                        </div>
                        <div className={`form-group ${maxSalary.touched && maxSalary.invalid ? 'has-danger' : ''}`}>
                          <InputGroup>
                            <Input className='form-control' {...maxSalary} autoFocus type='text' placeholder='maximum salary' />
                            <div className='text-help' style={error}>{maxSalary.touched ? maxSalary.error : ''}
                            </div>
                          </InputGroup>
                        </div>
                      </FormGroup>
                      <div className={`form-group ${eduChange.touched && eduChange.invalid ? 'has-danger' : ''}`}>
                        <FormGroup>
                          <Label htmlFor='password' control>Desired Education</Label>
                          <Input className='form-control' {...eduChange} autoFocus type='text' placeholder='Education level' />
                          <div className='text-help' style={error}>{eduChange.touched ? eduChange.error : ''}
                          </div>
                        </FormGroup>
                      </div>
                      <div className={`form-group ${visaChange.touched && visaChange.invalid ? 'has-danger' : ''}`}>
                        <FormGroup>
                          <Label htmlFor='dropdownselect'>Will your company sponsor visa's?</Label>
                          <Select className='form-control' {...visaChange} id='dropdownselect' defaultValue='2'>
                              <option value='1'>Yes</option>
                              <option value='2'>No</option>
                              </Select>
                          <div className='text-help' style={error}>{visaChange.touched ? visaChange.error : ''}
                          </div>
                        </FormGroup>
                      </div>
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
                        <Button type="button" disabled={submitting} onClick={resetForm} outlined bsStyle='lightgreen' style={float}>Clear Values</Button>{' '}
                        <Link to='/employer'>
                        <Button outlined bsStyle='lightgreen'>cancel</Button>
                        </Link>{' '}
                        <Button type="submit" outlined bsStyle='lightgreen' disabled={submitting}>{submitting ? <i/> : <i/>} Submit</Button>
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
