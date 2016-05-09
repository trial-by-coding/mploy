import classNames from 'classnames';
import JobCard from 'routes/components/jobCard';
import JobModal from 'routes/components/jobModal';
import { connect } from 'react-redux';
import actions from 'redux/actions';
import { FormControl, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';

// const PureRenderMixin = require('react/addons').addons.PureRenderMixin;
import PureRenderMixin from 'react-addons-pure-render-mixin';

@connect(state => state)
export default class JobsContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      input:''
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  filterData(event) {
    event.preventDefault();
    const regex = new RegExp(event.target.value, 'i');
    this.setState({
      input: regex
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
      'text-align': 'center'
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
          <Col md={3}>
            <form>
              <FormGroup>
                <InputGroup>
                  <FormControl type="text" />
                  <DropdownButton
                    componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                    title="Action"
                  >
                    <MenuItem key="1">Item</MenuItem>
                  </DropdownButton>
                </InputGroup>
              </FormGroup>
            </form>
            <div>
               <input
                  type="text"
                  className="form-control"
                  onChange={ this.filterData.bind(this) }
                  placeholder="Search by Job Title" />
            </div>

          </Col>
        </Row>
        <Row>
          <div>
          { jobList.filter(item => item.job_title.search(this.state.input) > -1)
            .map(job => <JobCard data={job}
                                 openModal={this.openModal}
                                 dispatch={dispatch} />)}
          </div>
        </Row>
      </Container>
		);
	}
}
