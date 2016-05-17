import classNames from 'classnames';
import { connect } from 'react-redux';
import actions from 'redux/actions';
import { Link } from 'react-router';
import request from 'superagent';
import { PropTypes } from 'react';


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
eduChange(e) {
  this.setState({
    formVal: {...this.state.formVal,
      education: e.target.value
    }
  }, function () {});
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
  let coverLetter = new FormData();
  coverLetter.append("coverletter", e.target.files[0], e.target.files[0].name);
  let that = this;
  request.post('/user/applicant/uploadcoverletter')
    .send(coverLetter)
    .end(function (err, response) {
      that.setState({
        formVal: {...that.state.formVal,
          cover_letter: response.text
        }
      }, function () {});
    });
}

setResume(e) {
  let resume = new FormData();
  resume.append("resume", e.target.files[0], e.target.files[0].name);
  let that = this;
  request.post('/user/applicant/uploadresume')
    .send(resume)
    .end(function (err, response) {
      that.setState({
        formVal: {...that.state.formVal,
          resume: response.text
        }
      }, function () {});
    });

}
onFormSubmit(e) {
  e.preventDefault();
  this.props.dispatch(actions.applyToJob(this.state.formVal));
}
  //end helper funcs

  render() {
    const floatRight = {
      'float': 'right'
    };
    const floatLeft = {
      'float': 'left'
    };
    const wallppr = {
      'backgroundColor': 'white'
    };
    const title = {
      'textAlign': 'center'
    };

    return (
    <Container id='body' style={wallppr}>
    <ModalBody>
    <Grid>
      <Row>
        <Col sm={12}>
            <Form onSubmit={this.onFormSubmit}>
                <Grid>
                  <Row>
                    <Col xs={12}>
                    <h4 style={title}>Submit Application for {this.props.data.job_title} at {this.props.data.company_name}</h4>
                    </Col>
                  </Row>
                </Grid>
                <hr/>
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
                      <Input onChange={this.eduChange} autoFocus type='text' placeholder='Degree(s)' />
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
                      <Textarea id='textarea' rows='3' placeholder='Sell yourself!' onChange={this.aboutChange} />
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
                <hr />
                <Grid>
                  <Row>
                    <Col xs={12}>
                      <Button outlined bsStyle='lightred' onClick={ModalManager.remove} onTouchEnd={ModalManager.remove}>cancel</Button>
                      <Button type="submit" onClick={ModalManager.remove} outlined bsStyle='lightgreen' style={floatRight}>submit</Button>
                  </Col>
                </Row>
              </Grid>
            </Form>
        </Col>
      </Row>
    </Grid>
  </ModalBody>
</Container>
    );
  }
}
