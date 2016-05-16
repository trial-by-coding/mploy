import classNames from 'classnames';
import JobCard from 'routes/components/jobCard';
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
      input: ''
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  // Function that filters
  filterData(type, event) {
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
    if(type === 'input') {
      this.setState({
        input: regex
      })
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
        <Col sm={3}>
          <PanelContainer noControls>
            <Panel>
              <PanelBody style={{padding: 0}}>
                <Grid>
                  <Row>
                    <Col xs={12}> {/*filter by jobtitle*/}
                    <InputGroup>
                      <Input type="text" className="form-control" onChange={ this.filterData.bind(this, 'input') } placeholder="Search" style={{border: 'none'}}
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
        { jobList.filter((item) => item.job_title.search(this.state.input) > -1 || item.company_name.search(this.state.input)
        > -1 || item.location.search(this.state.input) > -1 || item.employment_type.search(this.state.input) >
        -1) .map(job =>
        <JobCard data={job} openModal={this.openModal} dispatch={dispatch} />)}
  </Container>
    );
  }
}
