import classNames from 'classnames';
import { connect } from 'react-redux';
import actions from 'redux/actions';

import Header from '../components/header';
import Sidebar from '../components/applicant_sidebar';
import Footer from '../components/footer';
// import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';
// import ReactStyle from 'global/jsx/react-styles/src/ReactStyle';

@connect(state => state)
export default class NewJob extends React.Component {
  constructor(props){
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.jobTitle = this.jobTitle.bind(this);
    this.companyName = this.companyName.bind(this);
    this.jobDesc = this.jobDesc.bind(this);
    this.eduChange = this.eduChange.bind(this);
    this.visaChange = this.visaChange.bind(this);
    this.minSalary = this.minSalary.bind(this);
    this.maxSalary = this.maxSalary.bind(this);
    this.skillChange = this.skillChange.bind(this);
    this.addSkill = this.addSkill.bind(this)

    this.state = {
      formVal: {
        skillName:'',
        company_name: null,
        job_title: null,
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

  // componentWillMount() {
  //   ReactStyle.addRules(ReactStyle.create({
  //     '#ex1Slider .slider-selection': {
  //       background: '#55C9A6'
  //     }
  //   }));

  //   ReactStyle.addRules(ReactStyle.create({
  //     '#RGB': {
  //       maxWidth: '220px',
  //       height: '100px',
  //       background: 'rgb(128, 200, 128)'
  //     },
  //     '#RC .slider-selection': {
  //       background: '#FF8282'
  //     },
  //     '#RC .slider-handle': {
  //       background: 'red'
  //     },
  //     '#GC .slider-selection': {
  //       background: '#428041'
  //     },
  //     '#GC .slider-handle': {
  //       background: 'green'
  //     },
  //     '#BC .slider-selection': {
  //       background: '#8283FF'
  //     },
  //     '#BC .slider-handle': {
  //       borderBottomColor: 'blue'
  //     },
  //     '#R, #G, #B': {
  //       width: '300px'
  //     }
  //   }));
  // }

  // componentDidMount(){
  //   $('#ex2').slider({});

  //   $('#example_2').ionRangeSlider({
  //     min: 1000,
  //     max: 100000,
  //     from: 30000,
  //     to: 90000,
  //     type: 'double',
  //     step: 500,
  //     postfix: ' €',
  //     hasGrid: true,
  //     gridMargin: 15
  //   });
  // }

  jobTitle(e){

    this.setState({ formVal: { ...this.state.formVal, job_title: e.target.value }},function(){
    console.log("after state_extend:", this.state);
    });
  }
  


  companyName(e){

    this.setState({ formVal: { ...this.state.formVal, company_name: e.target.value }},function(){
    console.log("after state_extend:", this.state);
    });
  }

  jobDesc(e){

    this.setState({ formVal: { ...this.state.formVal, job_description: e.target.value }},function(){
    console.log("after state_extend:", this.state);
    });
  }

  eduChange(e){

    this.setState({ formVal: { ...this.state.formVal, desired_education: e.target.value }},function(){
    console.log("after state_extend:", this.state);
    });
  }


  visaChange(e){
    let visaBool = e.target.value;
    visaBool === '1' ? (visaBool = true) : (visaBool = false);

    this.setState({ formVal: { ...this.state.formVal, visa_required:visaBool }},function(){
    console.log("after state_extend:", this.state);
    });
  }

  minSalary(e){

    this.setState({ formVal: { ...this.state.formVal, min_salary: e.target.value }},function(){
    console.log("after state_extend:", this.state);
    });
  }

  maxSalary(e){

    this.setState({ formVal: { ...this.state.formVal, max_salary: e.target.value }},function(){
    console.log("after state_extend:", this.state);
    });
  }

  skillChange(e){
    let skill = e.target.value;

    // skills.push(e.target.value),
    // console.log('skills after idx is:', skills);

    this.setState({ formVal: { ...this.state.formVal, skillName: skill }},function(){
    console.log("after state_extend:", this.state);
    });

  }

  addSkill(){
    let skill = this.state.formVal.skillName;

    let skills = this.state.formVal.skills.slice()

    skills.push(skill);

    this.setState({ formVal: { ...this.state.formVal, skills: skills, skillName:'' }},function(){
    console.log("after state_extend:", this.state);
    });

  }

  onFormSubmit(e){
    e.preventDefault();

    // this.props.dispatch(actions.applyToJob(this.state.formVal));

    console.log('app form is:', this.state.formVal);

  }

  render() {
   const align = {
    margin:"auto",
    'maxWidth':'700px'
    };

    console.log('skills be:', this.state.formVal.skills)


    return (
      <Container id="body">
        <Grid>
          <Row style={align}>
            <Col sm={12}  collapseRight>
              <PanelContainer noOverflow controlStyles='bg-green fg-white'>
                <Panel>
                <Form onSubmit={this.onFormSubmit}>
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
                              <Label htmlFor='password' control>Job Title</Label>
                                <Input
                                onChange={this.jobTitle}
                                autoFocus type='text'  placeholder='Awesome Title here' />
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor='password' control>Company Name</Label>
                                <Input
                                onChange={this.companyName}
                                autoFocus type='text'  placeholder='Mploy' />
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor='textarea'>Job description:</Label>
                              <Textarea id='textarea' rows='5'
                                        placeholder='Position details'
                                        onChange={this.jobDesc} />
                            </FormGroup>

                            <FormGroup>
                              <Label htmlFor='textarea'>What skills are needed for this position?</Label>
                                <InputGroup>
                                  <Input type='text' id='searchbtnicon' placeholder='Enter skills here ...' 
                                                                        onChange={this.skillChange}
                                                                        value={this.state.formVal.skillName} />
                                  <InputGroupAddon className='plain'>
                                    <Button onClick={this.addSkill}>
                                      <span> add </span>
                                      <Icon bundle='fontello' glyph='plus' />
                                    </Button>
                                  </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                                
                            <Row>
                              {this.state.formVal.skills.map(function(item){
                                   return <Col xs={1}>
                                            <BLabel>{item}</BLabel>{' '}
                                          </Col>
                                          
                              })} 
                            </Row>

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
                              <Label htmlFor='password' control>Desired Education</Label>
                                <Input
                                onChange={this.eduChange}
                                autoFocus type='text'  placeholder='Education level' />
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


  // <FormGroup>
  //   <Label htmlFor='password' control>Min Salary</Label>
  //   <Row>
  //     <Col sm={12}>
  //       <div>Filter by price interval: <b>$ 10</b> <Input id='ex2' ref='ex2' type='text' className='span2' value='' data-slider-min='10' data-slider-max='1000' data-slider-step='5' data-slider-value='[250,450]'/> <b>$ 1000</b></div>
  //     </Col>
  //   </Row>
  // </FormGroup>
