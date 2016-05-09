import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import actions from 'redux/actions';
import { Link } from 'react-router';
import { PropTypes } from 'react';

export const fields = ['job_title', 'company_name', 'job_description', 'desired_education', 'min_salary', 'max_salary', 'location'];

const validate = values => {
  const errors = {};
  if(!values.job_title) {
    errors.job_title = 'Enter a job title';
  } 
  // else if (values.job_title.length < 2) {
  //   errors.job_title = 'Must be longer than on letter!';
  // }
  //   if(!values.company_name) {
  //   errors.company_name = 'Enter a company name';
  // } else if (values.company_name.length < 2) {
  //   errors.company_name = 'Must be longer than on letter!';
  // }
  // if(!values.location) {
  //   errors.location = 'Enter a location';
  // }
  // if(!values.job_description) {
  //   errors.job_description = 'Enter a job description';
  // }
  // if(!values.skillChange) {
  //   errors.skillChange = 'Enter the required skills';
  // }
  // if(!values.addSkill) {
  //   errors.addSkill = 'Enter desired skills';
  // }
  // if(!values.employment_type) {
  //   errors.employment_type = 'Enter employment_type';
  // }
  // if(!values.min_salary) {
  //   errors.min_salary = 'Enter minimum salary';
  // }
  // if(!values.max_salary) {
  //   errors.max_salary = 'Enter maximum salary';
  // }
  // if(!values.desired_education) {
  //   errors.desired_education = 'Enter desired education';
  // }
  // if(!values.visa_required) {
  //   errors.visa_required = 'Enter visa requirement';
  // }
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

  // static contextTypes = {
  //   router: PropTypes.object
  // };

  constructor(props){
    super(props);
  }

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

    const { fields: { job_title, company_name, job_description, desired_education, min_salary, max_salary, location}, resetForm, handleSubmit, submitting } = this.props;
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
              <form onSubmit={handleSubmit((data) =>{
                that.props.dispatch(actions.postNewJob(data))
              })}>

              <div>
                <label>Job Title</label>
                <div>
                  <input type="text" placeholder="Job Title" {...job_title}/>
                </div>
                {job_title.touched && job_title.error && <div>{job_title.error}</div>}
              </div>

              <div>
                <label>Job Description</label>
                <div>
                  <input type="text" placeholder="Job Description" {...job_description}/>
                </div>
                {job_description.touched && job_description.error && <div>{job_description.error}</div>}
              </div>

              <div>
                <label>Desired Education</label>
                <div>
                  <input type="text" placeholder="Desired Education" {...company_name}/>
                </div>
                {desired_education.touched && desired_education.error && <div>{desired_education.error}</div>}
              </div>

              <div>
                <label>Minimum Salary</label>
                <div>
                  <input type="text" placeholder="Minimum Salary" {...min_salary}/>
                </div>
                {min_salary.touched && min_salary.error && <div>{min_salary.error}</div>}
              </div>

              <div>
                <label>Maximum Salary</label>
                <div>
                  <input type="text" placeholder="Maximum Salary" {...min_salary}/>
                </div>
                {min_salary.touched && min_salary.error && <div>{min_salary.error}</div>}
              </div>

              <div>
                <label>Location</label>
                <div>
                  <input type="text" placeholder="Location" {...location}/>
                </div>
                {location.touched && location.error && <div>{location.error}</div>}
              </div>

              <div>
              <button type="submit" disabled={submitting}>
                {submitting ? <i/> : <i/>} Submit
              </button>
              <button type="button" disabled={submitting} onClick={resetForm}>
                Clear Values
              </button>
              </div>
              </form>
            </Panel>
          </PanelContainer>
          </Col>
        </Row>
        </Grid>
      </Container>
    );
  }
}
