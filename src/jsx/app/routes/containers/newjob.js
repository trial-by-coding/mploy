import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form'
import actions from 'redux/actions';
import { Link } from 'react-router';
import { PropTypes } from 'react';

export const fields = ['job_title', 'company_name', 'job_description', 'desired_education', 'min_salary', 'max_salary', 'location', 'employment_type', 'visa_required', 'skills[]'];

const validate = values => {
  const errors = {};
  if(!values.job_title) {
    errors.job_title = 'Enter a job title';
  } 
  else if (values.job_title.length < 2) {
    errors.job_title = 'Must be longer than on letter!';
  }
    if(!values.company_name) {
    errors.company_name = 'Enter a company name';
  } else if (values.company_name.length < 2) {
    errors.company_name = 'Must be longer than on letter!';
  }
  if(!values.location) {
    errors.location = 'Enter a location';
  }
  if(!values.job_description) {
    errors.job_description = 'Enter a job description';
  }
  if(!values.employment_type) {
    errors.employment_type = 'Enter employment_type';
  }
  if(!values.min_salary) {
    errors.min_salary = 'Enter minimum salary';
  }

  if(!values.max_salary) {
    errors.max_salary = 'Enter maximum salary';
  }

  if(!values.desired_education) {
    errors.desired_education = 'Enter desired education';
  }
  if(!values.visa_required) {
    errors.visa_required = 'Enter visa requirement';
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
                    console.log('data: ', data)
                    that.props.dispatch(actions.postNewJob(data))
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

                  <FormGroup>
                    <InputGroup>
                    <div className={`form-group ${min_salary.touched && min_salary.invalid ? 'has-danger' : ''}`}>
                        <Label htmlFor='password' control>Salary:</Label>
                      <Input className='form-control' {...min_salary} type='text' placeholder='Minimum Salary' />
                        <div className='text-help' style={error}>{min_salary.touched ? min_salary.error : ''}
                        </div>
                      </div>
                      </InputGroup>
                      <InputGroup>
                    <div className={`form-group ${max_salary.touched && max_salary.invalid ? 'has-danger' : ''}`}>
                        <Input className='form-control' {...max_salary} type='text' placeholder='Maximum Salary' />
                        <div className='text-help' style={error}>{max_salary.touched ? max_salary.error : ''}
                        </div>
                    </div>
                  </InputGroup>
                </FormGroup>

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
                          <option value='1'>Yes</option>
                          <option value='0'>No</option>
                          </Select>
                      <div className='text-help' style={error}>{visa_required.touched ? visa_required.error : ''}
                      </div>
                  </div>
                </FormGroup>

                <FormGroup>
                  <div>
                    <ul>
                      {skills.map((skill, index) => 
                      <li key={index}>
                        <label>Skill #{index + 1}:</label>
                        <input type="text" {...skill}/>
                      </li>)}
                    </ul>
                    <button onClick={() => skills.addField()}>Add Skill</button>
                  </div>
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
