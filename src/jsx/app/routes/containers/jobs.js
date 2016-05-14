import classNames from 'classnames';
import JobCard from 'routes/components/jobCard';
import JobModal from 'routes/components/jobModal';
import { connect } from 'react-redux';
import actions from 'redux/actions';
import { FormGroup, InputGroup, FormControl, DropdownButton} from 'react-bootstrap';
import PureRenderMixin from 'react-addons-pure-render-mixin';

@connect(state => state)
export default class JobsContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      jobtitle:'',
      company: '',
      location: '',
      jobtype: ''
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  filterData(type, event) {
    console.log('event', event);
    console.log('type', type);
    event.preventDefault();
    const regex = new RegExp(event.target.value, 'i');
    if(type === 'jobtitle' ) {
      this.setState({ jobtitle: regex });
    }
    if(type === 'company') {
      this.setState({ company: regex });
    }
    if(type === 'location') {
      this.setState({ location: regex });
    }
    if(type === 'jobtype') {
      this.setState({ jobtype: regex });
    }
  };

  setFilter(filter) {
    this.setState({
      filter
    });
  };

	render() {
    const { dispatch } = this.props;
    const { filteredData } = this.state;
		let jobList = this.props.jobList.items;

    if(!jobList) {
    	return <div> Loading... </div>;
    }

		return (
    <Container id='body'>

    <Grid style={{paddingBottom: 10}}>
      <Row>
        <Col sm={3} smCollapseRight>
          <PanelContainer>
            <Panel>
              <PanelBody style={{padding: 0}}>
                <Grid>
                  <Row>
                    <Col xs={12}> {/*filter by jobtitle*/}
                    <InputGroup>
                      <Input type="text" className="form-control" onChange={ this.filterData.bind(this, 'jobtitle') } placeholder="Job Title" style={{border: 'none'}}
                      />
                    </InputGroup>
                    </Col>
                  </Row>
                </Grid>
              </PanelBody>
            </Panel>
          </PanelContainer>
          </Col>
          <Col sm={3} smCollapseRight>
          <PanelContainer>
            <Panel>
              <PanelBody style={{padding: 0}}>
                <Grid>
                  <Row>
                    <Col xs={12}> {/*filter by company*/}
                    <InputGroup>
                      <Input type="text" className="form-control" onChange={ this.filterData.bind(this, 'company') } placeholder="Company" style={{border: 'none'}}
                      />
                    </InputGroup>
                    </Col>
                  </Row>
                </Grid>
              </PanelBody>
            </Panel>
          </PanelContainer>
          </Col>
          <Col sm={3} smCollapseRight>
          <PanelContainer>
            <Panel>
              <PanelBody style={{padding: 0}}>
                <Grid>
                  <Row>
                    <Col xs={12}> {/*filter by location*/}
                    <InputGroup>
                      <Input type="text" className="form-control" onChange={ this.filterData.bind(this, 'location') } placeholder="Location" style={{border: 'none'}}
                      />
                    </InputGroup>
                    </Col>
                  </Row>
                </Grid>
              </PanelBody>
            </Panel>
          </PanelContainer>
          </Col>
          <Col sm={3} smCollapseRight>
          <PanelContainer>
            <Panel>
              <PanelBody style={{padding: 0}}>
                <Grid>
                  <Row>
                    <Col xs={12}> {/*filter by jobtype*/}
                    <InputGroup>
                      <Input type="text" className="form-control" onChange={ this.filterData.bind(this, 'jobtype') } placeholder="Job Type" style={{border: 'none'}}
                      />
                    </InputGroup>
                    </Col>
                  </Row>
                </Grid>
              </PanelBody>
            </Panel>
          </PanelContainer>
          </Col>
          {/*end all filters*/}
        </Row>
      </Grid>
      {/*jobcards*/}
    <Row>
      <Grid>
        { jobList.filter((item) => item.job_title.search(this.state.jobtitle) > -1 && item.company_name.search(this.state.company)
        > -1 && item.location.search(this.state.location) > -1 && item.employment_type.search(this.state.jobtype) >
        -1) .map(job =>
        <JobCard data={job} openModal={this.openModal} dispatch={dispatch} />)}
      </Grid>
    </Row>
    {/*end jobcards*/}

    </Container>
    );
  }
}
