import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import actions from 'redux/actions';
import { Link } from 'react-router';
import { PropTypes } from 'react';
import request from 'superagent';

export const fields = ['eduChange', 'aboutChange'];

const validate = values => {
  const errors = {};
  if(!values.eduChange) {
    errors.eduChange = 'Enter your education';
  }
  if(!values.aboutChange) {
    errors.aboutChange = 'Enter something about yourself';
  }
  return errors;
};

@reduxForm({
  form: 'NewAppForm',
  fields,
  validate
})

export default class Body extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  };

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

    // initial state
    this.state = {
      complete: (!this.props.complete) || false,
      formVal: {
        cover_letter: null,
        resume: null,
        years_experience: 'less than 1 year',
        education: '',
        personal_statement:'',
        job_id: this.props.data.jobID,
        skills_met: this.props.skillsArray,
        user_id: null,
        can_work_here: false
      }
    };
  }

  //helper functions start
  onFormSubmit(e) {
  e.preventDefault();
  this.props.dispatch(actions.applyToJob(this.state.formVal));
}

eduChange(e) {
  this.setState({
    formVal: {...this.state.formVal,
      education: e.target.value
    }
  }, function () {});
  // var newState = React.addons.update(this.state, {
  //   formVal: {
  //     education: e.target.value
  //   }
  // });
  // this.setState(newState,function(){
  //   console.log("after state_extend:", this.state)
  // });

}

visaChange(e) {
  let visaBool = e.target.value;
  visaBool === '1' ? (visaBool = true) : (visaBool = false);
  this.setState({
    formVal: {...this.state.formVal,
      can_work_here: visaBool
    }
  }, function () {});
}

skillChange(e, idx) {
  e.persist();
  let skills = this.state.formVal.skills_met.slice();
  skills[idx] = e.target.checked;
  this.setState({
    formVal: {...this.state.formVal,
      skills_met: skills
    }
  }, function () {});
}

aboutChange(e) {
  this.setState({
    formVal: {...this.state.formVal,
      personal_statement: e.target.value
    }
  }, function () {});
}

expChange(e) {
  this.setState({
    formVal: {...this.state.formVal,
      years_experience: e.target.value
    }
  }, function () {});
}

setCoverletter(e) {
  var coverLetter = new FormData();
  coverLetter.append("coverletter", e.target.files[0], e.target.files[0].name);
  var that = this;
  request.post('/user/applicant/uploadcoverletter')
    .send(coverLetter)
    .end(function (err, response) {
      console.log(response);
      that.setState({
        formVal: {...that.state.formVal,
          cover_letter: response.text
        }
      }, function () {});
    });
}

setResume(e) {
  var resume = new FormData();
  resume.append("resume", e.target.files[0], e.target.files[0].name);
  var that = this;
  request.post('/user/applicant/uploadresume')
    .send(resume)
    .end(function (err, response) {
      console.log(response);
      that.setState({
        formVal: {...that.state.formVal,
          resume: response.text
        }
      }, function () {});
    });
}
  //end helper funcs

  render() {

    //helper func for keys in skills obj
    // let appFormList = this.props.data;
    // let skillsVals = [];

    // for (var key in appFormList) {
    //   if (key.indexOf('skill') !== -1 && appFormList[key] !== null) {
    //     skillsVals.push(appFormList[key])
    //   }
    // }
    const { fields: { eduChange, aboutChange }, resetForm, handleSubmit, submitting } = this.props;

    return (
      <Container id='body'>
    <Grid>
      <Row>
        <Col sm={12} collapseRight>
        <PanelContainer noOverflow controlStyles='bg-green fg-white'>
          <Panel>
            <Form onSubmit={handleSubmit(this.onFormSubmit)}>
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
                      <Label>Skills</Label> {this.props.data.skills.map((item,idx) =>
                      <Checkbox onChange={(e)=> this.skillChange(e,idx)} value={item} name='checkbox-options'>{item}
                      </Checkbox>)}
                      <hr/>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor='password' control>Education</Label>
                        <div className={`form-group ${eduChange.touched && eduChange.invalid ? 'has-danger' : ''}`}>
                      <Input className='form-control' {...eduChange} onChange={this.eduChange} autoFocus type='text' placeholder='Degree(s)' />
                        <div className='text-help'>{eduChange.touched ? eduChange.error : ''}
                        </div>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor='dropdownselect'>Would you require visa sponsorship?</Label>
                      <Select onChange={this.visaChange} id='dropdownselect' defaultValue='2'>
                                  <option value='1'>Yes</option>
                                  <option value='2'>No</option>
                                </Select>
                    </FormGroup>

                    <FormGroup>
                      <div className={`form-group ${aboutChange.touched && aboutChange.invalid ? 'has-danger' : ''}`}>
                      <Label htmlFor='textarea'>Why are you the top candidate?</Label>
                      <Textarea className='form-control' {...aboutChange} id='textarea' rows='3' placeholder='Sell yourself!' onChange={this.aboutChange} />
                        <div className='text-help'>{aboutChange.touched ? aboutChange.error : ''}
                        </div>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor='fileinput'>Upload Cover Letter </Label>
                      <Input onChange={this.setCoverletter} id='fileinput' type='file' name='coverletter' accept='application/msword,text/plain, application/pdf' />
                      <HelpBlock>PDF,docx,doc files only.</HelpBlock>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor='fileinput'>Upload Resume</Label>
                      <Input onChange={this.setResume} id='fileinput' type='file' name='resume' accept='application/msword,text/plain, application/pdf' />
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
