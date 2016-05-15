import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import actions from 'redux/actions';
import { Link } from 'react-router';
import { PropTypes } from 'react';


export const fields = ['job_title', 'company_name', 'job_description', 'desired_education', 'min_salary', 'max_salary', 'location', 'employment_type', 'visa_required', 'skills[]'];

const validate = values => {
  const errors = {};
  if(!values.job_title) {
    errors.job_title = 'Enter a job title';
  } else if (values.job_title.length > 25){
    errors.job_title = 'Must be fewer than 25 characters';
  }

  if(!values.company_name) {
    errors.company_name = 'Enter a company name';
  } else if (values.company_name.length > 50){
    errors.company_name = 'Must be fewer than 50 characters';
  }

  if(!values.location) {
    errors.location = 'Enter a location';
  } else if (values.location.length > 50){
    errors.location = 'Must be fewer than 50 characters';
  }

  if(!values.job_description) {
    errors.job_description = 'Enter a job description';
  } else if (values.job_description.length > 200){
    errors.job_description = 'Must be fewer than 200 characters';
  } else if (values.job_description.length < 10){
    errors.job_description = 'Describe the job a bit more';
  }

  if(!values.min_salary) {
    errors.min_salary = 'Enter minimum salary';
  } else if (isNaN(Number(values.min_salary))) {
    errors.min_salary = 'Must be a number';
  } else if (values.min_salary.length < 4){
    errors.min_salary = 'Salary should be at least 1000';
  }

  if(!values.max_salary) {
    errors.max_salary = 'Enter maximum salary';
  } else if (isNaN(Number(values.max_salary))) {
    errors.max_salary = 'Must be a number';
  } else if (values.min_salary && (values.max_salary < values.min_salary)){
    errors.max_salary = 'Must be larger than mininum salary';
  } else if (values.min_salary.length < 4){
    errors.max_salary = 'Salary should be at least 1000';
  }

  if(!values.desired_education) {
    errors.desired_education = 'Enter desired education';
  } else if (values.desired_education.length > 100){
    errors.desired_education = 'Must be fewer than 100 characters';
  }

  if (!values.skills || !values.skills.length) {
    errors.skills = { _error: 'At least one skill must be entered' };
  } else {
    const skillsArrayErrors = [];
    values.skills.forEach((skill, skillIndex) => {
      let skillErrors;
      if (!skill) {
        skillErrors = "Skill field can't be empty";
        skillsArrayErrors[skillIndex] = skillErrors;
      }
      else if (skill.length > 30){
        skillErrors = "Too many characters";
        skillsArrayErrors[skillIndex] = skillErrors;
      }
      return skillErrors;
    });
    if(skillsArrayErrors.length) {
      errors.skills = skillsArrayErrors;
    }
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
    addValue: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

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

    const {
      fields: { job_title, company_name, job_description, desired_education, min_salary, max_salary, location, employment_type, visa_required, skills},
               resetForm,
               handleSubmit,
               pristine,
               submitting
    } = this.props;

    const that = this;

    return (
      <Container id="body">
        <Grid>
        <Row style={align}>
          <Col sm={12} collapseRight>
          <PanelContainer noOverflow controlStyles='bg-green fg-white'>
            <Panel>
             <PanelHeader className='bg-green fg-white'>
                  <Grid>
                    <Row>
                      <Col xs={12}>
                      <h3>New Job Posting</h3>
                      </Col>
                    </Row>
                  </Grid>
                </PanelHeader>
                  <Form onSubmit={handleSubmit(function(data) {
                    if (data.employment_type === undefined){
                      data.employment_type = 'Full-Time';
                    }
                    if (data.visa_required === undefined){
                      data.visa_required = false;
                    }
                    that.props.dispatch(actions.addJobPost(data))
                    .then(function() {
                      that.props.history.push('/employer');
                    });
                  })}>
                <PanelBody>
                <Grid>
                    <Row>
                      <Col xs={12}>

                  <FormGroup>
                    <div className={`form-group ${job_title.touched && job_title.invalid ? 'has-danger' : ''}`}>
                        <Label htmlFor='password' control>Job Title:</Label>
                        <Input className='form-control' {...job_title} type='text' placeholder='Job Title' />
                        <div className='text-help' style={error}>{job_title.touched ? job_title.error : ''}
                        </div>
                    </div>
                  </FormGroup>

                    <FormGroup>
                      <div className={`form-group ${company_name.touched && company_name.invalid ? 'has-danger' : ''}`}>
                          <Label htmlFor='password' control>Company Name:</Label>
                          <Input className='form-control' {...company_name} type='text' placeholder='Company Name' />
                          <div className='text-help' style={error}>{company_name.touched ? company_name.error : ''}
                          </div>
                      </div>
                    </FormGroup>

                  <FormGroup>
                      <div className={`form-group ${job_description.touched && job_description.invalid ? 'has-danger' : ''}`}>
                          <Label htmlFor='textarea'>Job Description:</Label>
                          <Textarea id='textarea' rows='5' className='form-control' {...job_description} placeholder='Position details' />
                          <div className='text-help' style={error}>{job_description.touched ? job_description.error : ''}
                          </div>
                      </div>
                    </FormGroup>

                  <Row>
                  <Col md={12}>
                  <FormGroup>
                    <InputGroup>
                    <div className={`form-group ${min_salary.touched && min_salary.invalid ? 'has-danger' : ''}`}>
                        <Label htmlFor='password' control>Salary:</Label>
                      <Input className='form-control' {...min_salary} type='text' placeholder='Minimum (e.g. 1000)' />
                        <div className='text-help' style={error}>{min_salary.touched ? min_salary.error : ''}
                        </div>
                      </div>
                      </InputGroup>
                      <InputGroup>
                    <div className={`form-group ${max_salary.touched && max_salary.invalid ? 'has-danger' : ''}`}>
                        <Input className='form-control' {...max_salary} type='text' placeholder='Max (e.g. 150000)' />
                        <div className='text-help' style={error}>{max_salary.touched ? max_salary.error : ''}
                        </div>
                    </div>
                  </InputGroup>
                </FormGroup>
                </Col>
                </Row>


                <FormGroup>
                  <div className={`form-group ${desired_education.touched && desired_education.invalid ? 'has-danger' : ''}`}>
                      <Label htmlFor='password' control>Desired Education:</Label>
                      <Input className='form-control' {...desired_education} type='text' placeholder='Education level' />
                      <div className='text-help' style={error}>{desired_education.touched ? desired_education.error : ''}
                      </div>
                  </div>
                </FormGroup>

                <FormGroup>
                  <div className={`form-group ${location.touched && location.invalid ? 'has-danger' : ''}`}>
                      <Label htmlFor='password' control>Location:</Label>
                      <Input className='form-control' {...location} type='text' placeholder='City, State' />
                      <div className='text-help' style={error}>{location.touched ? location.error : ''}
                      </div>
                  </div>
                </FormGroup>

                <FormGroup>
                  <div className={`form-group ${employment_type.touched && employment_type.invalid ? 'has-danger' : ''}`}>
                      <Label htmlFor='dropdownselect'>Employment Type:</Label>
                        <Select className='form-control' {...employment_type} id='dropdownselect' defaultValue='Full time'>
                          <option value='Full time'>Full Time</option>
                          <option value='Part time'>Part time</option>
                          <option value='Temporary'>Temporary</option>
                          <option value='Seasonal'>Seasonal</option>
                        </Select>
                      <div className='text-help' style={error}>{employment_type.touched ? employment_type.error : ''}
                      </div>
                  </div>
                </FormGroup>

                <FormGroup>
                  <div className={`form-group ${visa_required.touched && visa_required.invalid ? 'has-danger' : ''}`}>
                      <Label htmlFor='dropdownselect'>Will your company sponsor visas?</Label>
                      <Select className='form-control' {...visa_required} id='dropdownselect' defaultValue='0'>
                          <option value='0'>No</option>
                          <option value='1'>Yes</option>
                          </Select>
                      <div className='text-help' style={error}>{visa_required.touched ? visa_required.error : ''}
                      </div>
                  </div>
                </FormGroup>

                <Row>
                  <FormGroup className={`form-group ${skills.touched && skills.invalid ? 'has-danger' : ''}`}>
                  <Col md={12}>
                  <Label htmlFor='dropdownselect'>Specify Desired Skills:</Label>
                   <div>
                      <Button onClick={function(event) {
                          event.preventDefault();
                          skills.addField();
                        }}>
                        Add a Skill
                      </Button>
                      <div className='text-help' style={error}>{!skills.length ? skills._error : ''}
                      </div>
                    </div>
                  </Col>
                    <div>
                        {skills.map((skill, index) =>
                        <Col md={6}>
                          <div key={index}>
                            <label>Skill #{index + 1}:</label>
                            <input type="text" placeholder="Enter a desired skill"{...skill}/>
                            <span>
                            <button
                              type="button"
                              title="Remove Skill"
                              onClick={() => skills.removeField(index)}>
                              x
                            </button>
                            </span>
                          </div>
                            <div className='text-help' style={error}>{skill.touched ? skill.error : ''}
                            </div>
                        </Col>)}
                      </div>
                  </FormGroup>
                </Row>
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
                        <Button type="button" disabled={pristine || submitting} onClick={resetForm} outlined bsStyle='lightgreen' style={float}>Clear Values</Button>{' '}
                        <Link to='/employer'>
                        <Button outlined bsStyle='lightgreen'>cancel</Button>
                        </Link>{' '}
                        <Button type="submit" disabled={submitting} outlined bsStyle='lightgreen'>Submit</Button>
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
