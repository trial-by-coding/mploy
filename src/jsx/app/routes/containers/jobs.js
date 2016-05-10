import classNames from 'classnames';
import JobCard from 'routes/components/jobCard';
import JobModal from 'routes/components/jobModal';
import { connect } from 'react-redux';
import actions from 'redux/actions';
import { FormGroup, InputGroup, FormControl, DropdownButton} from 'react-bootstrap';

// const PureRenderMixin = require('react/addons').addons.PureRenderMixin;
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
    console.log('filter', filter);
    this.setState({
      filter: filter
    });
  };


	render() {

    const { dispatch } = this.props;
    const { filteredData } = this.state;
		console.log('container props', this);
    console.log('jobcontainer state', this.state);
    console.log('filteredData', filteredData);
		let jobList = this.props.jobList.items;

		const styles = {
      margin: '12.5px 0',
      borderBottom: '1px dotted #999',
      paddingBottom: 12.5,
      'textAlign': 'center'
    };
    const textStyle = {
      textDecoration: this.props.completed ? 'line-through' : '',
    };
    const buttonStyle = {
      height: 25,
      color: 'red',
      fontSize: 20,
      lineHeight: 0,
      marginTop: -3,
      border: 'none',
      background: 'none',
    };

    const panelStyle = {
    	'maxWidth': '400px'
    };

    if(!jobList) {
    	return <div> Loading... </div>;
    }

		return (


      <Container id='body' className='social'>
        <Row>
          <div>
            <Col xs={3} collapseRight>
              <InputGroup>
                <Input  type="text"
                        className="form-control"
                        onChange={ this.filterData.bind(this, 'jobtitle') }
                        placeholder="Search by Job Title" />
                <InputGroupButton>
                </InputGroupButton>
              </InputGroup>
            </Col>
             <Col xs={3} collapseRight>
              <InputGroup>
                <Input  type="text"
                        className="form-control"
                        onChange={ this.filterData.bind(this, 'company') }
                        placeholder="Search by Company" />
                <InputGroupButton>
                </InputGroupButton>
              </InputGroup>
               <Col xs={3} collapseRight>
              <InputGroup>
                <Input  type="text"
                        className="form-control"
                        onChange={ this.filterData.bind(this, 'location') }
                        placeholder="Search by Location" />
                <InputGroupButton>
                </InputGroupButton>
              </InputGroup>
            </Col>
             <Col xs={3} collapseRight>
              <InputGroup>
                <Input  type="text"
                        className="form-control"
                        onChange={ this.filterData.bind(this, 'jobtype') }
                        placeholder="Search by Job Type" />
                <InputGroupButton>
                </InputGroupButton>
              </InputGroup>
            </Col>
            </Col>
          </div>
        </Row>
        <Row>
          <div>
          { jobList.filter((item) =>  item.job_title.search(this.state.jobtitle) > -1 
                                  &&  item.company_name.search(this.state.company) > -1
                                  &&  item.location.search(this.state.location) > -1
                                  &&  item.employment_type.search(this.state.jobtype) > -1)
            .map(job => <JobCard data={job}
                                 openModal={this.openModal}
                                 dispatch={dispatch} />)}
          </div>
        </Row>
      </Container>
		);
	}
}
